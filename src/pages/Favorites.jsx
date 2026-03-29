import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../context/CoinContext";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
export default function Favorites() {
  const { allCoins, currency } = useContext(CoinContext);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("fav")) || [];
    setFavorites(fav);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((item) => item !== id);
    setFavorites(updated);
    localStorage.setItem("fav", JSON.stringify(updated));
  };

  const favCoins = allCoins.filter((coin) =>
    favorites.includes(coin.id)
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-4 sm:px-6 py-10">


      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          <FaHeart className="inline-block mr-2 text-red-500" />
          Your Favorite Coins
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Track and manage your saved cryptocurrencies
        </p>
      </div>


      {favCoins.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <p className="text-gray-400 text-lg">No favorites added yet</p>
          <p className="text-gray-500 text-sm mt-2">
            Go to Home and add coins <FaHeart className="inline text-red-400" />
          </p>
        </div>
      ) : (


        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {favCoins.map((coin) => (
            <div
              key={coin.id}
              onClick={() => navigate(`/coin/${coin.id}`)}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 cursor-pointer hover:scale-[1.02] hover:bg-white/10 transition duration-300 shadow-lg"
            >


              <div className="flex justify-between items-center mb-4">

                <div className="flex items-center gap-3">
                  <img src={coin.image} className="w-10 h-10" />
                  <div>
                    <p className="font-semibold text-lg">
                      {coin.name}
                    </p>
                    <p className="text-xs text-gray-400 uppercase">
                      {coin.symbol}
                    </p>
                  </div>
                </div>


                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(coin.id);
                  }}
                  className="text-red-400 hover:text-red-500 text-lg"
                >
                  ✖
                </button>
              </div>

              <div className="flex justify-between items-center">

                <p className="text-xl font-semibold">
                  {currency.symbol}
                  {coin.current_price.toLocaleString()}
                </p>

                <p
                  className={`text-sm font-semibold ${coin.price_change_percentage_24h > 0
                    ? "text-green-400"
                    : "text-red-400"
                    }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </p>

              </div>


              <div className="mt-3 text-sm text-gray-400">
                Market Cap: {currency.symbol}
                {coin.market_cap.toLocaleString()}
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}