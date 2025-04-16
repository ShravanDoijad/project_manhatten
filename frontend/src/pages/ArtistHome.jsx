import React from 'react'
import seller from "../assets/Images/seller.png"
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { GiProfit } from "react-icons/gi";
import { HandCoins } from 'lucide-react';
export const ArtistHome = () => {
  return (
    <div className="w-full h-[88vh] flex bg-[#eee] overflow-hidden relative">
     
      <div className="absolute right-0 bottom-0 h-full w-2/5 flex justify-end items-end">
        <img 
          src={seller} 
          alt="Artisan" 
          className="h-full z-10 object-cover object-bottom"
        />
      </div>
      <div className="w-3/5 px-10 py-5 flex flex-col  z-10">
        <h1 className="text-5xl font-bold text-gray-800 leading-tight ">
          India’s handmade talent, <br /> one click away.
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Empowering artisans to showcase their creativity and reach the world with ease.
        </p>
      </div>
        <div className='w-full h-70 flex gap-2 rounded-xl p-4 absolute bottom-0 px-10 bg-[#d2cfcf] shadow-xl' >
            <div className='flex flex-col p-4 bg-[#eee] shadow-xl w-1/5 gap-y-4 items-center rounded-[6px]' >
            <VscWorkspaceTrusted className='' size={120} />
            <span className='text-2xl text-gray-700 font-bold' >Trust & Policy</span>
            </div>
            <div className='flex flex-col p-4 bg-[#eee] shadow-xl w-1/5 gap-y-4 items-center rounded-[6px]' >
            <GiProfit  className='' size={120} />
            <span className='text-2xl text-gray-700 font-bold' >Value to Art</span>
            </div>
            
            <div className='flex flex-col p-4 bg-[#eee] shadow-xl w-1/5 gap-y-4 items-center rounded-[6px]' >
            <HandCoins  className='' size={120} />
            <span className='text-2xl text-gray-700 font-bold' >Secure Payment</span>
            </div>
        </div>
      
      
    </div>
  )
}
