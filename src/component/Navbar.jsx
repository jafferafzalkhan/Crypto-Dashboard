import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CoinContext } from "../context/CoinContext";
import { FaHeart } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [favCount, setFavCount] = useState(0);

  const navigate = useNavigate();
  const { setCurrency } = useContext(CoinContext);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("fav")) || [];
    setFavCount(fav.length);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handleCurrencyChange = (e) => {
    const value = e.target.value;

    if (value === "usd") setCurrency({ name: "usd", symbol: "$" });
    if (value === "inr") setCurrency({ name: "inr", symbol: "₹" });
    if (value === "eur") setCurrency({ name: "eur", symbol: "€" });
  };

  return (
    <nav className="bg-black/90 backdrop-blur-lg border-b border-white/10 text-white fixed w-full z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/">
          <h1 className="text-2xl font-bold bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            CryptoHub
          </h1>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">

          <Link to="/">Home</Link>
          <Link to="/crypto-blog">Blog</Link>

          <Link to="/favorites">
            <FaHeart className="inline text-red-500" /> Favorites
          </Link>

          <select
            onChange={handleCurrencyChange}
            className="bg-black border border-white/20 px-2 py-1 rounded-lg"
          >
            <option value="usd">USD $</option>
            <option value="inr">INR ₹</option>
            <option value="eur">EUR €</option>
          </select>

          {!currentUser ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center font-bold">
                {currentUser.email.charAt(0).toUpperCase()}
              </div>
              <button onClick={handleLogout} className="text-red-400">
                Logout
              </button>
            </div>
          )}
        </div>

        {/* MOBILE RIGHT SIDE */}
        <div className="flex items-center gap-3 md:hidden relative">

          {/* PROFILE ICON */}
          {currentUser && (
            <div className="relative">
              <div
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center font-bold cursor-pointer"
              >
                {currentUser.email.charAt(0).toUpperCase()}
              </div>

              {/* DROPDOWN */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-black border border-white/10 rounded-lg shadow-lg p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-400 hover:text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TOGGLE BUTTON */}
          <button
            className="text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-white/10 px-6 py-4 flex flex-col gap-4 text-center">

          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/crypto-blog" onClick={() => setIsOpen(false)}>Blog</Link>

          <Link to="/favorites" onClick={() => setIsOpen(false)}>
            <FaHeart className="inline text-red-400" /> Favorites
          </Link>

          <select
            onChange={handleCurrencyChange}
            className="bg-black border border-white/20 px-2 py-2 rounded-lg"
          >
            <option value="usd">USD $</option>
            <option value="inr">INR ₹</option>
            <option value="eur">EUR €</option>
          </select>

          {!currentUser && (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
            </>
          )}

        </div>
      )}
    </nav>
  );
}