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

  // 🚀 FETCH WITH CACHE + RETRY + RATE LIMIT HANDLING
  const fetchAllCoins = async () => {
    try {
      setLoading(true);

      const cache = JSON.parse(localStorage.getItem("coinsCache"));

      // ✅ Use cache (2 min)
      if (cache && Date.now() - cache.time < 2 * 60 * 1000) {
        setCoins(cache.data);
        setLoading(false);
        return;
      }

      let retryAfter = 0;

      while (true) {
        if (retryAfter > 0) {
          console.warn(`Retrying after ${retryAfter}s`);
          await new Promise((res) => setTimeout(res, retryAfter * 1000));
        }

        const res = await fetch(
          `/api/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`
        );

        // 🚨 Handle rate limit
        if (res.status === 429) {
          retryAfter = parseInt(res.headers.get("retry-after") || "10");
          continue;
        }

        if (!res.ok) {
          throw new Error("API error");
        }

        const data = await res.json();

        // 💾 Save cache
        localStorage.setItem(
          "coinsCache",
          JSON.stringify({
            data,
            time: Date.now(),
          })
        );

        setCoins(data);
        setLoading(false);
        break;
      }

    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    }
  };

  // 🔄 Fetch on currency change
  useEffect(() => {
    fetchAllCoins();
  }, [currency]);

  // 💾 Save currency
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