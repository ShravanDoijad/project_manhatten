import React from 'react'
import { useState } from 'react'
import Cookie from 'js-cookie'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Login = ({token}) => {
  const navigate = useNavigate()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  
  const submitForm = async (e) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    e.preventDefault()
    try {
      const res= await fetch(`${backendUrl}/api/adminlogin`, {
        method: "POST",
        headers: {
          'Content-type': "application/json"
        },
        body: JSON.stringify({email, password}),
        credentials:"include",
      })
      const data = await res.json()
      if (res.ok) {
        window.location.reload()
        toast.success("Login successfull")
        
      }
      else{
        toast.error(data.msg);
        
      }
    } catch (error) {
      console.log("error", error);
      
    }
  }
  return (
    <div className=' flex w-full h-screen items-center justify-center'>
    <div className=' w-100 h-100 bg-[#eee] shadow-2xl rounded-[4px] p-4 py-8 text-black'>
      <div className=' text-amber-800 poppins font-bold text-center text-[20px] ' >Login To Your Admin Account</div>
        <form onSubmit={submitForm} className='p-4  my-8 flex flex-col'>
          <div className=' flex flex-col my-3 gap-2'>
          <span className='text-[16px] font-sans text-gray-500 montserrat'>Enter email address</span>
          <input type="text" className='bg-white shadow-2xl rounded-xl py-2' onChange={(e)=>{setemail(e.target.value)}} value={email}  />
          </div>
          <div className=' flex flex-col my-3  gap-2'>
            <span className='text-[16px] font-sans text-gray-500 montserrat '>Enter password</span>
            <input  className='bg-white shadow-2xl rounded-xl py-2' type="password" onChange={(e)=>{setpassword(e.target.value)}} value={password} />
          </div>
          <button type='submit' className=' w-full py-2 mt-5 m-auto rounded-[4px] shadow-xl text-white font-bold bg-amber-800'>Submit</button>
        </form>
    </div>
    </div>
  )
}

export default Login