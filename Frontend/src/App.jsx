import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  Home,
  Collection,
  Contact,
  Product,
  Cart,
  Login,
  PlaceOrder,
  Orders,
  About,
} from "./pages";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import Verify from "./pages/Verify";

const App = () => {
  const location = useLocation();

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer position="bottom-right" autoClose={1000} />
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Navbar />
      )}
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
