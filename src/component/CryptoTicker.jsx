import React, { useContext } from "react";
import { CoinContext } from "../context/CoinContext";
import { useNavigate } from "react-router-dom";

export default function CryptoTicker({ coins = [] }) {
  const { currency } = useContext(CoinContext);
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-hidden h-30 flex bg-black/40 border-y border-purple-500 py-3">

      <div className="flex gap-4 animate-scroll whitespace-nowrap">

        {[...coins, ...coins].map((coin, index) => (
          <div
            key={`${coin.id}-${index}`} // ✅ FIXED (UNIQUE KEY)
            onClick={() => navigate(`/coin/${coin.id}`)}
            className="flex items-center gap-3 bg-black/60 border border-purple-500 px-4 py-2 rounded-xl min-w-45 cursor-pointer hover:scale-105 transition-all"
          >
            <img src={coin.image} className="w-6 h-6" />

            <div>
              <p className="text-sm font-semibold text-white">
                {coin.symbol?.toUpperCase()}
              </p>
              <p className="text-xs text-gray-400">
                {currency.symbol}
                {coin.current_price?.toLocaleString()}
              </p>
            </div>

            <div className="w-16 h-6">
              <svg viewBox="0 0 100 30" className="w-full h-full">
                <polyline
                  fill="none"
                  stroke={
                    coin.price_change_percentage_24h > 0
                      ? "#22c55e"
                      : "#ef4444"
                  }
                  strokeWidth="2"
                  points="0,20 20,10 40,15 60,5 80,12 100,3"
                />
              </svg>
            </div>
          </div>
        ))}

      </div>

      {/*  SCROLL ANIMATION */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 25s linear infinite;
          }
        `}
      </style>
    </div>
  );
}