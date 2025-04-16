import React from "react";
import home from "../assets/home.jpg"
const HomePage = () => (
  <div className="home">
    <h1 className=" text-amber-800 text-2xl prata mb-4" >Welcome to Admin Panel</h1>
    <img 
      src={home} 
      alt="Admin Panel Illustration" 
      className="home-img"
    />
  </div>
);

export default HomePage;