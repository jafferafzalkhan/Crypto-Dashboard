import React, { useContext, useState, useEffect, useMemo } from "react";
import { CoinContext } from "../context/CoinContext";
import { useNavigate } from "react-router-dom";
import home2 from "../assets/home2.png";
import CryptoTicker from "../component/CryptoTicker";
import CryptoInfo from "../component/CryptoInfo";
import { FaHeart } from "react-icons/fa";

export default function Home() {
  const [input, setInput] = useState("");
  const [text, setText] = useState("");
  const [favorites, setFavorites] = useState([]);

  const fullText = "Track Crypto Markets in ";

  const { allCoins = [], currency } = useContext(CoinContext);
  const navigate = useNavigate();

 
  const currentUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser"));
    } catch {
      return null;
    }
  }, []);

 
  useEffect(() => {
    if (!currentUser) return;

    const fav =
      JSON.parse(localStorage.getItem(`fav_${currentUser.email}`)) || [];
    setFavorites(fav);
  }, [currentUser]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, []);


  const toggleFavorite = (coinId) => {
    if (!currentUser) {
      alert("Login first to save favorites");
      navigate("/login");
      return;
    }

    let updatedFav;

    if (favorites.includes(coinId)) {
      updatedFav = favorites.filter((id) => id !== coinId);
    } else {
      updatedFav = [...favorites, coinId];
    }

    setFavorites(updatedFav);
    localStorage.setItem(
      `fav_${currentUser.email}`,
      JSON.stringify(updatedFav)
    );
  };

  const isFavorite = (coinId) => favorites.includes(coinId);

  
  const searchHandler = (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Please login first to search coins");
      navigate("/login");
      return;
    }

    if (!input.trim()) {
      alert("Please enter a coin name");
      return;
    }

    let coin = allCoins.find(
      (c) =>
        c.name.toLowerCase() === input.toLowerCase() ||
        c.symbol.toLowerCase() === input.toLowerCase()
    );

    if (!coin) {
      coin = allCoins.find(
        (c) =>
          c.name.toLowerCase().includes(input.toLowerCase()) ||
          c.symbol.toLowerCase().includes(input.toLowerCase())
      );
    }

    if (!coin) {
      alert("Coin not found");
      return;
    }

    navigate(`/coin/${coin.id}`);
    setInput("");
  };

  const Explore = () => {
    if (!currentUser) {
      alert("Login first to explore graphs");
      navigate("/login");
      return;
    }

    navigate("/coin/bitcoin");
  };

 
  const coinsToDisplay = (allCoins || []).slice(0, 10);

  return (
    <>
     
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 min-h-[90vh] w-full px-4 md:px-16 bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">

        <div className="w-full md:w-[55%] flex justify-center order-1 md:order-2 relative">
          <div className="absolute w-75 md:w-125 h-75 md:h-125 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

          <img
            src={home2}
            alt="crypto"
            className="relative w-65 sm:w-87.5 md:w-125 lg:w-162.5 xl:w-180 animate-float drop-shadow-[0_0_60px_rgba(168,85,247,0.9)]"
          />
        </div>

        
        <div className="w-full md:w-[48%] flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 text-white leading-tight">
            {text}
            <span className="text-purple-400">Real-Time</span>
            <span className="animate-pulse">|</span>
          </h1>

          <p className="text-gray-300 max-w-md md:max-w-lg lg:max-w-xl mb-6">
            Monitor live cryptocurrency prices and explore interactive charts.
          </p>

          <form
            onSubmit={searchHandler}
            className="w-full max-w-md mb-4 flex items-center gap-2"
          >
            <div className="flex w-full">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search crypto..."
                className="bg-black border border-white/20 h-11 w-full px-4 rounded-l-3xl text-white focus:outline-none"
              />

              <button
                disabled={!input.trim()}
                className="h-11 px-5 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-500 rounded-r-3xl text-white"
              >
                Search
              </button>
            </div>

            <img
              src={
                currentUser?.photo ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="user"
              className="w-10 h-10 rounded-full border-2 border-purple-400 object-cover"
            />
          </form>

          <button
            onClick={Explore}
            className="bg-purple-500 hover:bg-purple-600 px-5 py-2 rounded-lg text-white"
          >
            Explore Market Graph
          </button>
        </div>
      </div>

      <CryptoTicker coins={coinsToDisplay} />

      
      <div className="flex flex-col items-center text-center py-10 min-h-[86vh] w-full px-4 bg-linear-to-br from-purple-900 via-purple-900 to-slate-900">

        <div className="w-full max-w-3xl bg-purple-500 border-2 border-purple-800 shadow-2xl rounded-3xl p-3">

          <div className="overflow-x-auto">
            <table className="w-full min-w-150 text-white">

              <thead>
                <tr className="border-b border-white/30">
                  <th>#</th>
                  <th className="text-left">Coins</th>
                  <th>Price</th>
                  <th>24H</th>
                  <th>Market Cap</th>
                  <th>Fav</th>
                </tr>
              </thead>

              <tbody>
                {coinsToDisplay.map((coin, index) => {
                  const priceChange = coin.price_change_percentage_24h ?? 0;
                  const price = coin.current_price ?? 0;
                  const marketCap = coin.market_cap ?? 0;

                  return (
                    <tr
                      key={coin.id || index}
                      onClick={() => navigate(`/coin/${coin.id}`)}
                      className="border-b border-white/10 hover:bg-purple-800/40 cursor-pointer hover:scale-[1.02] transition-all duration-300"
                    >
                      <td>{index + 1}</td>

                      <td className="flex items-center gap-2 py-3">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          onError={(e) =>
                            (e.target.src = "https://via.placeholder.com/24")
                          }
                          className="w-6 h-6"
                        />
                        {coin.name || "Unknown"}
                      </td>

                      <td>
                        {currency?.symbol || "$"}
                        {price.toLocaleString()}
                      </td>

                      <td
                        className={
                          priceChange > 0
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        {priceChange.toFixed(2)}%
                      </td>

                      <td>
                        {currency?.symbol || "$"}
                        {marketCap.toLocaleString()}
                      </td>

                      <td>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(coin.id);
                          }}
                          className="text-xl hover:scale-125 transition-all"
                        >
                          {isFavorite(coin.id) ? (
                            <FaHeart className="text-red-500" />
                          ) : (
                            <FaHeart className="text-gray-300" />
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        </div>
      </div>

      <CryptoInfo />

      
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 20s ease-in-out infinite;
          }
        `}
      </style>
    </>
  );
}