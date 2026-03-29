import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">

      <Navbar />
      <main className="flex-1 pt-19">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;