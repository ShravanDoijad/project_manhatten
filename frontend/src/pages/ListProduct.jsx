import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { ShopContext } from '../contexts/ShopContext'
import {CheckCheckIcon, CircleX} from 'lucide-react'
import Text from '../components/Text'
import { toast } from 'react-toastify'
const ListProduct = () => {
    const { products } = useContext(ShopContext)
    const [sellerProduct, setsellerProduct] = useState([])
    const [editProduct, seteditProduct] = useState({
        price: "",
        discountPrice: "",
        shippingCost: "",
        availabilityStatus: true,
        returnPolicy: "",

    })

    const handleChange = (e) => {
        const { name, value, type , checked } = e.target
        seteditProduct({
            ...editProduct,
            
            [name]:type==="checkbox"? checked : value
        })
    }

    const editProductHandler = async(e, productId) => {
            e.preventDefault()
            
        try {
            const response = await fetch("http://localhost:3000/products/edit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({...editProduct, productId})

            })
            const data = await response.json()
            if(response.ok) {
                toast.success(data.msg)
            }
            else{
                toast.error(data.msg)
            }
        } catch (error) {
            toast.error("Something went wrong")

        }
    }

    const getsellerProduct = async () => {
        try {
            const response = await fetch("http://localhost:3000/products/list", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    
                },
                credentials: "include"
            })
            const data = await response.json()
            if (response.ok) {
                setsellerProduct(data.products)
            } else {
                toast.error(data.msg)
            }

            
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    const handleDelete = async (productId) => {

        try {
            const response = await fetch(`http://localhost:3000/products/remove`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ _id: productId })
            })
            const data = await response.json()
            if (response.ok) {
                toast.success(data.msg)
            
            } else {
                toast.error(data.msg)
            }
        } catch (error) {
            toast.error("Something went wrong")

        }
    }


    useEffect(()=>{
        
        getsellerProduct()

    },[])
  return (
    <div className='w-full min-h-screen  px-10 bg-[#F5E5D6] '>
        <Text text1={"MY"} text2={"COLLECTION"} />
        <div className='flex flex-col gap-2.5 w-full'>
            {
                sellerProduct.map((item, num) => {
                 
                   
                    
                    return(
                        <div className='w-full flex justify-between pr-4 items-center p-2 px-2 h-30 bg-[#eee] shadow-xl rounded-[3px]  ' key={num}>
                            <form className='flex justify-between w-[90%] items-center '>
                            <div className='flex  gap-3 items-center'> 
                            <div className='w-28 object-cover  h-28 flex  '>
                                <img className='rounded-[3px]' src={item.images[0]} alt="" />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div className=' text-[10px] text-amber-800 prata'>{item.name}</div>
                                <div className='text-gray-500' >{item.sellerName}</div>
                                <div className='flex  items-center'>
                                <input type="number" name='discountPrice' placeholder={`Rs.${item.discountPrice}`} className='w-15 placeholder:text-gray-900 placeholder:text-[15px]' onChange={handleChange} />
                                <input type="number" name='price' placeholder={`Rs.${item.price}`} className='w-15 placeholder:line-through placeholder:text-[12px]' onChange={handleChange} />
                                </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div className='text-gray-500 text-[14px]'>Shipping Cost</div>
                                <input type="number" name='shippingCost' placeholder={`Rs.${item.shippingCost}`} className='w-20 placeholder:text-gray-900 placeholder:text-[15px]' onChange={handleChange} />
                                <div className=' flex items-center gap-2' ><span className='text-[14px] text-gray-500 '>Availablity Status</span><span>{editProduct.availabilityStatus? "true": "false"}</span><input  type="checkbox"  name='availabilityStatus'  onChange={handleChange} /></div>

                            </div>
                            <div className='flex flex-col gap-1'>
                                
                                <input type="text" name='returnPolicy' placeholder={item.returnPolicy} className='w-30 placeholder:text-gray-900 placeholder:text-[14px]' onChange={handleChange} />
                             </div>
                             <button className='bg-green-600 text-white rounded-[3px] px-2 ' onClick={(e)=>{editProductHandler(e, item._id)}}>
                                Update    
                            </button>   
                            </form>
                            <span className='mr-4' onClick={()=>{handleDelete(item._id)}} ><CircleX /></span>

                        </div>
                    )})}
        </div>
    </div>)}


export default ListProduct