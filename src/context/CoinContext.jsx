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

  const fetchAllCoins = async () => {
    try {

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`
      );

      const data = await response.json();

      setCoins(data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllCoins();
  }, [currency]);

  useEffect(() => {
    localStorage.setItem("currency", JSON.stringify(currency));
  }, [currency]);
  const contextValue = {
    allCoins,
    currency,
    setCurrency
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {children}
    </CoinContext.Provider>
  );
};