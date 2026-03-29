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

      // ✅ CACHE (3 MIN)
      if (cache && Date.now() - cache.time < 3 * 60 * 1000) {
        setCoins(cache.data);
        setLoading(false);
        return;
      }

      const res = await fetch(
        `/api/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`
      );

      // 🚨 RATE LIMIT HANDLE
      if (res.status === 429) {
        if (cache) setCoins(cache.data);
        setLoading(false);
        return;
      }

      const data = await res.json();

      localStorage.setItem(
        "coinsCache",
        JSON.stringify({
          data,
          time: Date.now(),
        })
      );

      setCoins(data);

    } catch (error) {
      console.error("Coin Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchAllCoins, 800);
    return () => clearTimeout(timer);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem("currency", JSON.stringify(currency));
  }, [currency]);

  return (
    <CoinContext.Provider value={{ allCoins, currency, setCurrency, loading }}>
      {children}
    </CoinContext.Provider>
  );
};