import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import Home from './pages/Home'
import { Navbar } from './components/Navbar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Routes>
    
      <Route path='/' element= {<Home/>} />
      <Route path='/userLogin' element={ <UserLogin /> } />
      <Route path='/userRegister' element = {<UserRegister/>} />
    </Routes>
    </>
  )
}

export default App
