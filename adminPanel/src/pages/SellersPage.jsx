import React from "react";
import { useContext } from "react";


import { useState, useEffect } from "react";

const SellersPage = () => {
  const [sellers, setSellers] = useState([]);
  const [products, setproducts] = useState([])
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const getProducts =  async () => {
    try {
      const response = await fetch(`${backendUrl}/products/pendingProduct`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const data = await response.json()
      if(response.ok){
        console.log(data)
      }
    } catch (error) {
      console.log("error", error)
    }
  }
  

  const getAllSellers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/sellers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",

        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setSellers(data);
      } else {
        console.error("Error fetching sellers:", data.message);
      }
    } catch (error) {
      console.error("Error fetching sellers:", error);
    }
  }

  useEffect(() => {
    getAllSellers();
    getProducts();
  },[])

  return (
    <div className="page">
      <h2 className=" text-2xl font-bold" >All Sellers</h2>
      <div className="card-grid text-gray-600">
        {sellers.map((seller, idx) => (
          <div className="card  " key={idx}>
            <div>
              <h3 className=" montserrat text-black font-medium" >{seller.name}</h3>
              <p> {seller.email}</p>
              
            </div>
            <button className="btn delete">Block</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellersPage;