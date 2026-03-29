import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import AuthLayout from "./AuthLayout";

import Home from "./pages/Home";
import CryptoGraph from "./pages/CryptoGraph";
import CryptoBlogg from "./pages/CryptoBlogg";
import Favorites from "./pages/Favorites";

import Loginpage from "./pages/Loginpage";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />


          <Route path="coin/:id" element={<CryptoGraph />} />


          <Route path="crypto-blog" element={<CryptoBlogg />} />


          <Route path="favorites" element={<Favorites />} />
        </Route>


        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}