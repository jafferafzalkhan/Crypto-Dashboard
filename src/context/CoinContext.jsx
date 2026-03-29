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

  // 🚀 FETCH FROM COINPAPRIKA
  const fetchAllCoins = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://api.coinpaprika.com/v1/tickers");

      if (!res.ok) throw new Error("API error");

      const data = await res.json();

      // ✅ Format data for your UI
      const formattedData = data.slice(0, 50).map((coin) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        current_price: coin.quotes.USD.price,
        market_cap: coin.quotes.USD.market_cap,
        price_change_percentage_24h: coin.quotes.USD.percent_change_24h,

        // 🔥 Logo (external API)
        image: `https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`
      }));

      setCoins(formattedData);

    } catch (error) {
      console.error("CoinPaprika Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Fetch once
  useEffect(() => {
    fetchAllCoins();
  }, []);

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