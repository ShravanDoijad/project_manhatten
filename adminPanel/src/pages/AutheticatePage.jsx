import React from "react";
import  { useEffect, useState } from "react";


 
import {toast} from "react-toastify";
const AuthenticatePage = () => {
  const [pendingProducts, setpendingProducts] = useState([])
  const getPendingProducts = async ()=>{

  
      try {
        const response = await fetch("http://localhost:3000/products/pendingProduct", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        })
        const data = await response.json()
        if(response.ok){
         
          setpendingProducts(data)
        }
        else{
          toast.error("Products not Available")
        }
        
      } catch (error) {
        console.log("error", error);
        toast.error("Error fetching products")
        
      }
  
    }

    const handleApprove = async (productId) => {
      try {
        const res =  await fetch(`http://localhost:3000/products/approve`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ productId }),
          credentials: "include"

        })
        const data = await res.json()
        if(res.ok){
          toast.success("Product approved successfully")
          setpendingProducts(pendingProducts.filter(product => product._id !== productId))
        }

        else{
          toast.error("Error approving product")
        }
      } catch (error) {
        console.log("error", error);
        toast.error("Error approving product")
      }
    }

    const handleReject = async (productId) => {
      try {
        const res = await fetch(`http://localhost:3000/products/reject`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ productId }),
          credentials: "include"

        })
        const data = await res.json()
        if(res.ok){
          toast.success("Product rejected successfully")
          setpendingProducts(pendingProducts.filter(product => product._id !== productId))
        }
        else{
          toast.error("Error rejecting product")
        }
        
      } catch (error) {
        console.log("error", error);
        toast.error("Error rejecting product")
      }
    }
    
    useEffect(()=>{
      getPendingProducts()
    }, [])

    
    if(!pendingProducts || pendingProducts.length === 0){ 
      return <div className="text-center text-white font-medium text-[14px]">
        No Products Are Available for Validate
      </div>;
    }
  return (
    <div className="page">
      <h2>Authenticate Products</h2>
      <div className="card-grid text-gray-500 ">
        {pendingProducts.map((item, idx) => (
          <div className="card" key={idx}>
            <img src={item.images[0]}  className= " w-25 h-25 object-cover" alt="Item" />
            <div className="text-gray-600 flex-wrap w-2/5 flex font-medium text-[14px]">
              { item.description.slice(0, 100) + "..."}
            </div>
            <div>
              <h3>{item.name}</h3>
              <p>Rs.{item.price} | By: {item.sellerName}</p>
            </div>
            <div className="flex justify-between items-center gap-2 "> 
              <button onClick={()=>{handleApprove(item._id)}} className="btn bg-green-700">Approve</button>
              <button onClick={()=>{handleReject(item._id)}} className="btn delete">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthenticatePage;