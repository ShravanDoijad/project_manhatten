import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import SellersPage from "./pages/SellersPage";
import {ToastContainer} from "react-toastify";
 import Login from "./pages/Login"
 import Cookies from "js-cookie";

import "./assets/styles.css";
import AuthenticatePage from "./pages/AutheticatePage";
import Orders from "./pages/Orders";


function App() {
  const token  = Cookies.get("adminToken")
  return (
    <>
      <ToastContainer />
      {!token ? <Login token={token}/> :
      <div className="main-layout roboto">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/sellers" element={<SellersPage />} />
            <Route path="/login" element={<Login/>}/>
            
            <Route path="/authenticate" element={<AuthenticatePage />} />
            <Route path="/orders" element={<Orders/>} />
          </Routes>
        </div>
      </div>
      }
      </>
  );
}

export default App;