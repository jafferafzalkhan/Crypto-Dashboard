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

      const cacheKey = `coins_${currency.name}`;
      const cacheTimeKey = `${cacheKey}_time`;

      const cachedData = localStorage.getItem(cacheKey);
      const cacheTime = localStorage.getItem(cacheTimeKey);

      // ✅ CACHE (5 min expiry)
      if (
        cachedData &&
        cacheTime &&
        Date.now() - cacheTime < 5 * 60 * 1000
      ) {
        setCoins(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      // ✅ PROXY API CALL
      const response = await fetch(
        `/api/coingecko/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`
      );

      // ❌ HANDLE HTML / ERROR RESPONSE
      if (!response.ok) {
        const text = await response.text();
        console.error("Server returned:", text);
        throw new Error("API failed");
      }

      // ❌ HANDLE WRONG CONTENT TYPE
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Not JSON:", text);
        throw new Error("Invalid response");
      }

      const data = await response.json();

      setCoins(data);

      // ✅ SAVE CACHE
      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(cacheTimeKey, Date.now());

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