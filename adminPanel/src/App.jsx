import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Cookie from 'js-cookie'
function App() {
  
  

  return (
    <>
      <div className=' w-full h-screen '>
        {
          
        }
        <Routes>
        <Route  path='/login' element={<Login/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
