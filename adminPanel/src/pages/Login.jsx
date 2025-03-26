import React from 'react'
import { useState } from 'react'
import Cookie from 'js-cookie'
const Login = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')


  

//  const token  = Cookie.get("adminToken")
//   console.log(token);
  
  const submitForm = async (e) => {
    e.preventDefault()
    try {
      const res= await fetch("http://localhost:3000/api/adminlogin", {
        method: "POST",
        headers: {
          'Content-type': "application/json"
        },
        body: JSON.stringify({email, password}),
        credentials:"include",
      })
      if (res.ok) {
        const data = await res.json()
        console.log("data", data);
      }
      else{
        console.log('res', res.msg);
        
      }
    } catch (error) {
      console.log("error", error);
      
    }
  }
  return (
    <div className=' flex w-full h-screen items-center justify-center'>
    <div className=' w-100 h-130 bg-[#eee] shadow-2xl rounded-2xl p-4 py-8 text-black'>
        <form onSubmit={submitForm} className='p-4  my-8 flex flex-col'>
          <div className=' flex flex-col my-3 gap-2'>
          <h1 className='text-[18px] font-medium text-gray-500 '>Enter email address</h1>
          <input type="text" className='bg-white shadow-2xl rounded-xl py-2' onChange={(e)=>{setemail(e.target.value)}} value={email}  />
          </div>
          <div className=' flex flex-col my-3  gap-2'>
            <h1 className='text-[18px] font-medium text-gray-500 '>Enter password</h1>
            <input  className='bg-white shadow-2xl rounded-xl py-2' type="password" onChange={(e)=>{setpassword(e.target.value)}} value={password} />
          </div>
          <button type='submit' className=' w-full py-2 mt-5 m-auto text-green-400 '>Submit</button>
        </form>
    </div>
    </div>
  )
}

export default Login