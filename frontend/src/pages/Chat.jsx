import React, { useRef } from 'react'

import { useState, useEffect } from 'react'
import io from "socket.io-client"
import {SendHorizontal} from "lucide-react"
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../contexts/ShopContext'
const Chat = () => {
    const socket = useRef(null)
    const navigate = useNavigate()
    const [msg, setmsg] = useState("");
    const {artistToken, name, backendUrl}= useContext(ShopContext)
    const [chat, setchat] = useState([])
    
    useEffect(()=>{
        socket.current =  io(`${backendUrl}`)
        socket.current.on("chat", (payload)=>{
            console.log("payload", payload)
            setchat((chat)=>[...chat, payload])
        })
    },[])
    const sendMsg = async (e) => {
      e.preventDefault()
      socket.current.emit("chat", {msg, name})
      setmsg("")
    }


    console.log(" chat", chat)
    useEffect(()=>{
    if(!artistToken){
        return(<>
        navigate("/sellerLogin")
        toast.error("Need To Login")
        </>)
    }
}, [artistToken])
    
  return (
    <div className='w-full h-160 bg-gray-700 flex flex-col p-3 px-5 justify-baseline  '  >
        <div className='flex h-140 w-full flex-col gap-3' >
        {
            chat.map((item, idx)=>(
                <div className='flex w-full justify-between' >
                <div key={idx} className='w-fit px-4 justify-between p-2 bg-blue-500 text-white'>{item.msg}</div><span className='text-white'>{item.name}</span> </div>)
            )
        }
        </div>
        <form className='flex gap-2' onSubmit={sendMsg}>
            <input type="text" className='px-5 p-2 w-50' placeholder='Type your message here...' value={msg} onChange={(e)=>{setmsg(e.target.value)}} />
            <button type='submit' className='text-white'><SendHorizontal /></button>
        </form>
    </div>
  )
}

export default Chat