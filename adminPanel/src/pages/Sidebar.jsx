import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <nav>
        <Link to="/">🏠 Home</Link>
        <Link to="/products">📦 All Products</Link>
        <Link to="/sellers">👤 All Sellers</Link>
        <Link to="/authenticate">✔ Authenticate</Link>
        <Link to="/orders">📦 AllOrders </Link>
      </nav>
    </div>
  );
};

export default Sidebar;