import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./Layout";
import AuthLayout from "./AuthLayout";

import Home from "./pages/Home";
import CryptoGraph from "./pages/CryptoGraph";
import CryptoBlogg from "./pages/CryptoBlogg";
import Favorites from "./pages/Favorites";

import Loginpage from "./pages/Loginpage";
import SignUp from "./pages/SignUp";

const ProtectedRoute = ({ children }) => {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("currentUser"));
  } catch {
    user = null;
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />

          <Route
            path="coin/:id"
            element={
              <ProtectedRoute>
                <CryptoGraph />
              </ProtectedRoute>
            }
          />

         
          <Route path="crypto-blog" element={<CryptoBlogg />} />

         
          <Route
            path="favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />

          
          <Route path="*" element={<div className="text-white text-center mt-20 text-xl">404 - Page Not Found 🚫</div>} />

        </Route>

      
        <Route element={<AuthLayout />}>

          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<SignUp />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}