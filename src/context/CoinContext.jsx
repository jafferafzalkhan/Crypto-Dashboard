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

  // 🚀 CoinCap Fetch
  const fetchAllCoins = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://api.coincap.io/v2/assets");
      const result = await res.json();

      // ✅ Map CoinCap data → your format
      const formattedData = result.data.slice(0, 50).map((coin) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        current_price: parseFloat(coin.priceUsd),
        market_cap: parseFloat(coin.marketCapUsd),
        price_change_percentage_24h: parseFloat(coin.changePercent24Hr),

        // 🔥 Logo workaround
        image: `https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`
      }));

      setCoins(formattedData);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching CoinCap:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCoins();
  }, []);

  useEffect(() => {
    localStorage.setItem("currency", JSON.stringify(currency));
  }, [currency]);

  const contextValue = {
    allCoins,
    currency,
    setCurrency,
    loading
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {children}
    </CoinContext.Provider>
  );
};