import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie"
const Sidebar = () => {
  const token =  Cookies.get('adminToken')

  const handleLogout= () => {
    if(token){
      Cookies.remove("adminToken")
      window.location.reload()
    }
  }
  
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <nav>
        <Link to="/">🏠 Home</Link>
        <Link to="/products">📦 All Products</Link>
        <Link to="/sellers">👤 All Sellers</Link>
        <Link to="/authenticate">✔ Authenticate</Link>
        <Link to="/orders">📦 AllOrders </Link>
        
        <button onClick={()=>{handleLogout()}} >Logout</button>
      </nav>
    </div>
  );
};

export default Sidebar;