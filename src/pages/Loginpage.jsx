import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Home from "./Home";
export default function Loginpage() {

  const [username, setUsername] = useState("");
  const [userPassword, setPassword] = useState("");
  const navigate = useNavigate();

  const OnHandleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.length === 0) {
      alert("No account found. Please Sign Up.");
      return;
    }

    const validUser = users.find(
      (user) =>
        user.email === username &&
        user.password === userPassword
    );

    if (validUser) {

      localStorage.setItem(
        "currentUser",
        JSON.stringify(validUser)
      );

      alert("Login Successful!");
      navigate("/");

    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-linear-to-br from-purple-900 via-black to-purple-950 overflow-hidden px-4">

      <div className="absolute w-48 sm:w-72 h-48 sm:h-72 bg-purple-600 rounded-full blur-3xl opacity-30 top-10 left-5 sm:left-10"></div>
      <div className="absolute w-48 sm:w-72 h-48 sm:h-72 bg-pink-600 rounded-full blur-3xl opacity-30 bottom-10 right-5 sm:right-10"></div>

      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-6 sm:p-8 text-white">

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          CryptoHub
        </h2>

        <p className="text-center text-sm text-gray-300 mb-6">
          Secure Login to your account
        </p>

        <form className="flex flex-col gap-5" onSubmit={OnHandleSubmit}>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your email"
              className="bg-white/20 border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-300 w-full"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              value={userPassword}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="bg-white/20 border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-300 w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 py-2 rounded-xl font-semibold bg-linear-to-r from-purple-500 to-pink-500 hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-700/40 w-full"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-400 hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}