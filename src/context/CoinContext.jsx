import React, { createContext, useState, useEffect } from "react";

export const CoinContext = createContext();

export const CoinContextProvider = ({ children }) => {
  const [allCoins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currency, setCurrency] = useState(() => {
    const savedCurrency = localStorage.getItem("currency");
    return savedCurrency
      ? JSON.parse(savedCurrency)
      : { name: "usd", symbol: "$" };
  });

  const fetchAllCoins = async () => {
    try {
      setLoading(true);
      setError("");

      // ✅ CACHE FIRST
      const cachedData = localStorage.getItem(`coins_${currency.name}`);
      if (cachedData) {
        setCoins(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      // ✅ USE PROXY (IMPORTANT FIX)
      const response = await fetch(
        `/api/coingecko/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`
      );

      if (!response.ok) {
        throw new Error("API Error");
      }

      const data = await response.json();

      setCoins(data);

      // ✅ SAVE CACHE
      localStorage.setItem(`coins_${currency.name}`, JSON.stringify(data));

    } catch (err) {
      console.error(err);
      setError("Failed to load coins 🚫");
    } finally {
      setLoading(false);
    }
  };

  // ✅ PREVENT MULTIPLE REQUESTS
  useEffect(() => {
    if (allCoins.length === 0) {
      fetchAllCoins();
    }
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
    error,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {children}
    </CoinContext.Provider>
  );
};