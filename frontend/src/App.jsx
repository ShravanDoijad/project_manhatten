import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import './App.css'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import Home from './pages/Home'
import { Navbar } from './components/Navbar'
import Collection from './pages/Collection'
import Product from './pages/Product'
import SellerLogin from './pages/SellerLogin'
import SellerRegister from './pages/SellerRegister'
import Cart from './pages/Cart'
import Artist from './Artist'
import Checkout from './pages/Checkout'
import { MyOrders } from './pages/MyOrders'
import Verify from './pages/Verify'
import io from "socket.io-client"
import Footer from './components/Footer'

function App() {


 

  return (
    <div className='w-full min-h-screen relative bg-[#F5E5D6] roboto'>

    <ToastContainer/>
    <Navbar/>
    <Routes>
    
      <Route path='/' element= {<Home/>} />
      <Route path='/userLogin' element={ <UserLogin /> } />
      <Route path='/userRegister' element = {<UserRegister/>} />
      <Route path='sellerLogin' element= {<SellerLogin/>}/>
      <Route path='sellerRegister' element= {<SellerRegister/>}/>
      <Route path='/collections' element={<Collection/>} />
      <Route path='/product/:productId' element={<Product/>}  />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/checkout' element={<Checkout/>} />
      <Route path='/myOrders' element={<MyOrders/>} />
      <Route path='/verify' element={<Verify/>}/>
      
      <Route path='/artist/*' element={<Artist/>}/>
    </Routes>
    <Footer/>
    </div>
  )
}

export default App
