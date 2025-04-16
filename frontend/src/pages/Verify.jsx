import { toast } from 'react-toastify'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../contexts/ShopContext'
import {useNavigate} from "react-router-dom"
import {useSearchParams } from "react-router-dom"
const Verify = () => {
    const {backendUrl} =useContext(ShopContext)
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const verify = async ()=>{
        try {
            const response =  await fetch(`${backendUrl}order/verifyPayment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                credentials: 'include',
                body: JSON.stringify({orderId, success})

            })
            const data = await response.json()
            if(response.ok){
                toast.success(data.message)
                navigate("/myOrders")
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("something went wrong")
        }
    }
    useEffect(()=>{
        verify()
    }, [])
  return (
    <div></div>
  )
}

export default Verify