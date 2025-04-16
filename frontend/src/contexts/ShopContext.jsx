import { createContext, useEffect } from "react";

export const ShopContext = createContext();
import Cookies from "js-cookie"
import { useState } from "react";
const ShopContextProvider = (props) => {
    let backendUrl = import.meta.env.VITE_BACKEND_URL
    const [products, setproducts] = useState([])
      const [name, setname] = useState("")
    
    const [loading, setloading] = useState(true)
    const token = Cookies.get("token");
      const artistToken = Cookies.get("artistToken")
    
    const getProfile = async()=>{
      try {
        const res = await fetch(`${backendUrl}api/userprofile`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        })
        const data = await res.json()
        if(res.ok){
          setname(data.name)
          
          
        }
        else{
          toast.error("User Profile not Available")
        }
      } catch (error) {
        toast.error("Internel server Error")
      } 
    }
    const getSellerProfile = async()=>{
      try {
        const res = await fetch(`${backendUrl}api/sellerProfile`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        })
        const data = await res.json()
        if(res.ok){
          if(data){
          setname(data.name)}
          
          
        }
        else{
          toast.error("seller Profile not Available")
        }
      } catch (error) {
        toast.error("Internel server Error")
      } 
    }
    useEffect(()=>{
      if(token){
      getProfile()
      }
      if(artistToken){
        getSellerProfile()
      }
    }, [token])


    const getProducts = async () => {
      try {
        const res = await fetch(`${backendUrl}products/allProducts`,{
          method: "GET",
          headers:{
            "Content-Type": "application/json"
          },
          credentials:"include"
        })
        const data = await res.json()
        if (res.ok) {
          setproducts(data)
          
        }
        else{
          console.log(data.msg)
        }
      } catch (error) {
        console.log(error);
        
      }
      finally{
        setloading(false)
      }
    }

    

    useEffect(()=>{
      getProducts()
      
    }, [])
   

  const value ={
    backendUrl,
    products,
    loading,
    artistToken,
    name,
    setproducts,
    
  }
  return(
    <ShopContext.Provider value= {value}>
        {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;

