import React, { createContext, useState, useEffect } from "react";

export const CoinContext = createContext();

export const CoinContextProvider = ({ children }) => {

  const [allCoins, setCoins] = useState([]);

  const [currency, setCurrency] = useState(() => {
    const savedCurrency = localStorage.getItem("currency");
    return savedCurrency
      ? JSON.parse(savedCurrency)
      : { name: "usd", symbol: "$" };
  });

  // ✅ OPTIMIZED FETCH (CORS FIX + CACHE + 429 FIX)
  const fetchAllCoins = async () => {
    try {
      const cache = JSON.parse(localStorage.getItem("coinsCache"));

      // ⏱️ Cache valid for 2 minutes
      if (cache && Date.now() - cache.time < 2 * 60 * 1000) {
        setCoins(cache.data);
        return;
      }

      const response = await fetch(
        `/api/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`
      );

      const data = await response.json();

      // 💾 Save to cache
      localStorage.setItem(
        "coinsCache",
        JSON.stringify({
          data,
          time: Date.now(),
        })
      );

      setCoins(data);

    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };

  // 🔄 Fetch with delay (prevents spam)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAllCoins();
    }, 1000);

    return () => clearTimeout(timer);
  }, [currency]);

  // 💾 Save currency
  useEffect(() => {
    localStorage.setItem("currency", JSON.stringify(currency));
  }, [currency]);

  const contextValue = {
    allCoins,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {children}
    </CoinContext.Provider>
  );
};