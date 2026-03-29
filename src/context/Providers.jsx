import React from "react";
import { CoinContextProvider } from "./CoinContext";
import { NewsProvider } from "./NewsContext";

const Providers = ({ children }) => {
  return (
    <CoinContextProvider>
      <NewsProvider>
        {children}
      </NewsProvider>
    </CoinContextProvider>
  );
};

export default Providers;