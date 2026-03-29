import React, { createContext, useState, useEffect } from "react";

export const CoinContext = createContext();

export const CoinContextProvider = ({ children }) => {

  const [allCoins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currency, setCurrency] = useState(() => {
    const savedCurrency = localStorage.getItem("currency");
    return savedCurrency
      ? JSON.parse(savedCurrency)
      : { name: "usd", symbol: "$" };
  });

  const fetchAllCoins = async () => {
    try {
      setLoading(true);

      const cache = JSON.parse(localStorage.getItem("coinsCache"));

      // ✅ USE CACHE (3 MINUTES)
      if (cache && Date.now() - cache.time < 3 * 60 * 1000) {
        console.log("Using cached data");
        setCoins(cache.data);
        setLoading(false);
        return;
      }

      const res = await fetch(
        `/api/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`
      );

      // 🚨 HANDLE RATE LIMIT (429)
      if (res.status === 429) {
        const retryAfter = res.headers.get("Retry-After");
        console.warn(`Rate limited. Retry after ${retryAfter}s`);

        // fallback to cache
        if (cache) {
          setCoins(cache.data);
        }

        setLoading(false);
        return;
      }

      if (!res.ok) throw new Error("API failed");

      const data = await res.json();

      // 💾 SAVE CACHE
      localStorage.setItem(
        "coinsCache",
        JSON.stringify({
          data,
          time: Date.now(),
        })
      );

      setCoins(data);

    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 DELAY TO PREVENT SPAM
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAllCoins();
    }, 800);

    return () => clearTimeout(timer);
  }, [currency]);

  // 💾 SAVE CURRENCY
  useEffect(() => {
    localStorage.setItem("currency", JSON.stringify(currency));
  }, [currency]);

  const contextValue = {
    allCoins,
    currency,
    setCurrency,
    loading,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {children}
    </CoinContext.Provider>
  );
};