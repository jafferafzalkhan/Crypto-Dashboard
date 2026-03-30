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

      // ✅ cache
      const cachedData = localStorage.getItem(`coins_${currency.name}`);
      if (cachedData) {
        setCoins(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      // ✅ DIRECT API (NO PROXY)
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`
      );

      if (!response.ok) {
        throw new Error("API Error");
      }

      const data = await response.json();

      setCoins(data);

      // ✅ cache save
      localStorage.setItem(`coins_${currency.name}`, JSON.stringify(data));

    } catch (err) {
      console.error(err);
      setError("Failed to load coins 🚫");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCoins();
  }, [currency]);

  useEffect(() => {
    localStorage.setItem("currency", JSON.stringify(currency));
  }, [currency]);

  return (
    <CoinContext.Provider
      value={{ allCoins, currency, setCurrency, loading, error }}
    >
      {children}
    </CoinContext.Provider>
  );
};