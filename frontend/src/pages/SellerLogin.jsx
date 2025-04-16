import { useState } from 'react';
import { 
  Home, 
  Users, 
  HelpCircle, 
  Settings, 
  MessageCircle 
} from 'lucide-react';
import  {useContext}  from 'react';
import { useNavigate } from 'react-router-dom';
import  {ShopContext}  from '../contexts/ShopContext';
import { toast } from 'react-toastify';
const SellerLogin = () => {
  const navigate = useNavigate()
   const {backendUrl} = useContext(ShopContext)
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async(e) => {
      e.preventDefault();
      try {
        
     
      const response = await fetch(`${backendUrl}api/sellLogin`, {
       method:"POST",
       headers: {
          "Content-Type": "application/json"
       },
       body: JSON.stringify({email, password}),
       credentials: "include"
      })
      const data= await response.json() 
      if (response.ok) {
        toast.success(data.msg)
        navigate("/artist")
      }
      else{
        toast.error(data.msg)
        
      }
    } catch (error) {
        toast.error("Login unsuccessfull")
        
    }
    }
  
  
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-200 to-purple-200">
      {/* Navigation Menu Bar */}
    

      {/* Login Container */}
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">Login to Artist Account</h2>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 text-gray-600">email</label>
              <input 
                type="text" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your username"
                required
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 text-gray-600">Password</label>
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <button type="submit" className="self-center w-auto px-6 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-900 transition">Login</button>
          </form>
          
          <div className="text-center mt-4 text-gray-600">
            <p>Don't have an account? {' '}
              <a href="/sellerRegister" className="text-purple-800 hover:underline">Sign Up</a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white p-4 text-center text-gray-600">
        © 2025 MyApp. All rights reserved.
      </footer>
    </div>
  )
}

export default SellerLogin