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

      const res = await fetch("https://api.coinpaprika.com/v1/tickers");

      if (!res.ok) throw new Error("API failed");

      const data = await res.json();

      // ✅ SAFE FILTER + FORMAT
      const formattedData = data
        .filter((coin) => coin.quotes && coin.quotes.USD) // 🔥 important fix
        .slice(0, 50)
        .map((coin) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          current_price: coin.quotes.USD.price || 0,
          market_cap: coin.quotes.USD.market_cap || 0,
          price_change_percentage_24h:
            coin.quotes.USD.percent_change_24h || 0,

          // 🔥 safer logo fallback
          image: `https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`
        }));

      setCoins(formattedData);

    } catch (error) {
      console.error("CoinPaprika Error:", error);
    } finally {
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
    loading,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {children}
    </CoinContext.Provider>
  );
};