import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import ListProduct from "./pages/ListProduct";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";

export const backendUrl = import.meta.env.VITE_BACKEND_URL
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} loading={loading} setLoading={setLoading} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] py-8 text-gray-600 text-base">
            <ScrollToTop/>
              <Routes>
                <Route path="/" element={<AddProduct token={token} loading={loading} setLoading={setLoading}/>} />
                <Route path="/add" element={<AddProduct token={token} loading={loading} setLoading={setLoading}/>} />
                <Route path="/list" element={<ListProduct token={token} loading={loading} setLoading={setLoading}/>} />
                <Route path="/orders" element={<Orders token={token} loading={loading} setLoading={setLoading}/>} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
