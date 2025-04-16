import React, { useEffect } from "react";

import webicon1 from "../assets/Images/webicon1.jpg";
import "../assets/css/Home.css";
import "../assets/css/Navbar.css";
import { useState } from "react";

import { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import {  ShoppingBag, Tags, Folders, Briefcase } from "lucide-react";
import axios from "axios";

import { toast } from "react-toastify";

import { FaTimes, FaBoxOpen, FaShoppingCart, FaUser, FaSignOutAlt  } from "react-icons/fa";
import Cookies from "js-cookie";



export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = Cookies.get("token");
  const artistToken = Cookies.get("artistToken")
  const navigate = useNavigate()
  const [profile, setprofile] = useState(false)
  const {backendUrl, name} = useContext(ShopContext)
  const handleLogout = async () => {
    if(token){
    Cookies.remove("token")
     }
    else{
    Cookies.remove("artistToken")
      
    }

    navigate("/collections")
  }

  

  

  

  
  return (
    <nav className="navbar navbar-expand-lg navbar-light z-10 h-20  w-[95%] flex ">
      <div className="container-fluid flex justify-between w-full">
        <a className="navbar-brand flex" href="/">
          <img src={webicon1} alt="Site Icon" className="img-fluid" />
          <span className="brand-text text-amber-800">ArtisanHaven</span>
        </a>
        

        <div
          className="navDiv flex gap-22  justify-between items-center "
          id="navbarNav "
        >
          <li className="  text-blue-700 text-[17px] flex justify-center items-center font-extrabold gap-2 cursor-pointer border-amber-800 px-2 p-1 list-none">
            <ShoppingBag />
            <a href="/artist">Sell Your Art</a>
          </li>
          <ul className="navbar-nav flex gap-3">
            <li className="nav-item text-[1.2rem] text-gray-600 font-medium ">
              <a className="nav-link" href="/collections">
                Products
              </a>
            </li>
            <li className="nav-item text-[1.2rem] text-gray-600 font-medium ">
              <a className="nav-link" href="/#about">
                About Us
              </a>
            </li>
            <li className="nav-item text-[1.2rem] text-gray-600 font-medium ">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            {!token && !artistToken ? (
              <li className=" group relative text-[1.2rem]  font-medium w-20 h-10 rounded-[4px] flex justify-center items-center  ml-10 my-auto bg-amber-900 ">
                <button
                  className=" dropdown-toggle  text-white hover:text-xl"
                 
                
                >
                  Login
                </button>
                <ul className=" z-10 absolute top-10 right-0 hidden group-hover:flex flex-col justify-center items-center ">
                  <li>
                    <a
                      className=" text-[1.2rem] text-gray-600 font-medium"
                      href="/userLogin"
                    >
                      Customer
                    </a>
                  </li>
                  <li>
                    <a
                      className=" text-[1.2rem] text-gray-600 font-medium"
                      href="/sellerLogin"
                    >
                      Artisan
                    </a>
                  </li>
                  <li>
                    <a
                      className=" text-[1.2rem] text-gray-600 font-medium"
                      href="http://localhost:5174/login"
                    >
                      Admin
                    </a>
                  </li>
                </ul>
              </li>
            ) :(
              <div className="relative ml-6">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="text-white bg-amber-900 px-4 py-2 rounded-2xl text-[1.1rem] font-medium"
                >
                  Menu
                </button>
            
                <div
                  className={`absolute right-0 mt-2 w-48  bg-white rounded-md shadow-md z-100 p-3 transition-all duration-200 ${
                    menuOpen ? "block" : "hidden"
                  }`}
                >
                  <div
                    

                    className="flex items-center gap-2 text-gray-700 py-2 font-bold text-[20px] hover:text-blue-600"
                  >
                    <FaUser /> {name}
                    
                  </div>
                  {token?
                  <Link
                    to="/myOrders"
                    className="flex items-center gap-2 text-gray-700 py-2 hover:text-blue-600"
                  >
                    <Briefcase /> myOrders
                  </Link>:""
                  }
                  <Link
                    to="/cart"
                    className="flex items-center gap-2 text-gray-700 py-2 hover:text-blue-600"
                  >
                    <FaShoppingCart /> Cart
                  </Link>
                  <div
                    onClick={()=>{handleLogout()}}
                    className="flex items-center gap-2 text-gray-700 py-2 hover:text-blue-600"
                  >
                    <FaSignOutAlt  /> Logout
                  </div>

                </div>
              </div>
            ) }
          </ul>
        </div>
      </div>
      
    </nav>
  );
};
