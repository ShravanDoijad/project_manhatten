import React from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import HelpAndSupport from "./pages/HelpAndSupport";
import Notification from "./pages/Notification";
import ListProduct from "./pages/ListProduct";
import {ArtistHome} from "./pages/ArtistHome"

const Artist = () => {
  return (
    <div className="w-full  overflow-hidden min-h-[80%] bg-[#F5E5D6] flex   pt-22 px-10">
      
      <div className="w-2/6 h-[80%]  flex flex-col gap-y-2 ">
        <Link
          className="border-[2px] flex justify-center items-center border-amber-800 rounded-[3px] hover:text-2xl text-xl mx-4"
          to={"/sellerRegister"}
        >
          CREATE ACCOUNT
        </Link>
        <Link
          className="border-[2px] flex justify-center items-center border-amber-800 rounded-[3px] hover:text-2xl text-xl mx-4"
          to={"/artist/addProduct"}
        >
          UPLOAD PRODUCT
        </Link>
        <Link
          className="border-[2px] flex justify-center items-center border-amber-800 rounded-[3px] hover:text-2xl text-xl mx-4"
          to={"/artist/listProduct"}
        >
          LIST PRODUCT
        </Link>
        <Link
          className="border-[2px] flex justify-center items-center border-amber-800 rounded-[3px] hover:text-2xl text-xl mx-4"
          to={"/artist/notification"}
        >
          NOTIFICATION
        </Link>
        <Link
          className="border-[2px] flex justify-center items-center border-amber-800 rounded-[3px] hover:text-2xl text-xl mx-4"
          to={"/artist/helpSupport"}
        >
          HELP AND SUPPORT
        </Link>
        {/* <Link to={"/artist/chat"} className="flex justify-center w-40 h-10 text-center mx-auto mt-100 bg-green-600 items-center rounded-2xl shadow-xl  text-white font-bold hover:text-xl" >
          Chat with Admin
        </Link> */}
      </div>
    
      <Routes className="w-3/5 h-screen bg-black z-10">
        <Route path="/" element={<ArtistHome/>} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/notification" element={<Notification/>} />
        <Route path="/listProduct" element={<ListProduct />} />
        <Route path="/helpSupport" element={<HelpAndSupport />} />
       
      </Routes>
    </div>
  );
};

export default Artist;
