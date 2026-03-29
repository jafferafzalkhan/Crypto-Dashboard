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

  // 🚀 MAIN FETCH FUNCTION
  const fetchAllCoins = async () => {
    try {
      setLoading(true);

      // 🟢 TRY COINCAP FIRST
      const res = await fetch("https://api.coincap.io/v2/assets");

      if (!res.ok) {
        throw new Error("CoinCap failed");
      }

      const result = await res.json();

      const formattedData = result.data.slice(0, 50).map((coin) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        current_price: Number(coin.priceUsd),
        market_cap: Number(coin.marketCapUsd),
        price_change_percentage_24h: Number(coin.changePercent24Hr),

        // 💎 Logo workaround
        image: `https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`
      }));

      setCoins(formattedData);

    } catch (error) {

      console.warn("CoinCap failed, switching to CoinGecko:", error);

      // 🔴 FALLBACK TO COINGECKO (via proxy)
      try {
        const res = await fetch(
          `/api/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`
        );

        const data = await res.json();
        setCoins(data);

      } catch (err) {
        console.error("Both APIs failed:", err);
      }

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
    loading
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {children}
    </CoinContext.Provider>
  );
};