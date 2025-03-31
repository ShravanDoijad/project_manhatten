import React, { useState } from "react";
import { Mail, User, Lock } from "lucide-react";
import { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
const UserRegister = () => {

    const {backendUrl} = useContext(ShopContext)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async(e) => {
    e.preventDefault();
    try {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
          }
   
        const response = await fetch(`${backendUrl}api/register`, {
         method:"POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({username, email, password}),
         credentials: "include"
        })
        if (response.ok) {
          const data= await response.json()
          console.log("logindata", data);
          
        }
      } catch (error) {
          console.log(error.msg);
          
      }

    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 to-purple-200">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Create Your Account</h2>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="flex items-center mb-1 text-gray-600">
              <User className="mr-2 text-purple-700" size={20} /> Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="flex items-center mb-1 text-gray-600">
              <Mail className="mr-2 text-purple-700" size={20} /> Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="flex items-center mb-1 text-gray-600">
              <Lock className="mr-2 text-purple-700" size={20} /> Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Create a password"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirm-password" className="flex items-center mb-1 text-gray-600">
              <Lock className="mr-2 text-purple-700" size={20} /> Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-md transition hover:bg-purple-800"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/userLogin" className="text-purple-700 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
