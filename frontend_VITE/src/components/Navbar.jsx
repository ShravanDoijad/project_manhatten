import React from 'react'
import webicon1 from '../assets/Images/webicon1.jpg'
export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light z-10 absolute w-[80%] flex">
    <div className="container-fluid flex justify-between w-full">
      <a className="navbar-brand flex" href="#">
        <img src={webicon1} alt="Site Icon" className="img-fluid" />
        <span className="brand-text">ArtisanHaven</span>
      </a>
    
      <div className="navDiv " id="navbarNav mr-20">
        <ul className="navbar-nav flex gap-3">
          <li className="nav-item text-[1.2rem] text-gray-600 font-medium "><a className="nav-link" href="#products">Products</a></li>
          <li className="nav-item text-[1.2rem] text-gray-600 font-medium "><a className="nav-link" href="#about">About Us</a></li>
          <li className="nav-item text-[1.2rem] text-gray-600 font-medium "><a className="nav-link" href="/">Home</a></li>
          <li className="nav-item dropdown text-[1.2rem]  font-medium w-20 h-10 rounded-2xl flex justify-center text-amber-100 items-center border ml-10 my-auto bg-amber-700 ">
            <a className="nav-link dropdown-toggle " href="#" id="loginDropdown" role="button" data-bs-toggle="dropdown">Login</a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item text-[1.2rem] text-gray-600 font-medium" href="/userLogin">Customer</a></li>
              <li><a className="dropdown-item text-[1.2rem] text-gray-600 font-medium" href="/sellerLogin">Artisan</a></li>
              <li><a className="dropdown-item text-[1.2rem] text-gray-600 font-medium" href="/adminLogin">Admin</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}
