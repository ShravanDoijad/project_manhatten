import React from "react";
import "../assets/css/Checkout.css";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import Text from "../components/Text";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Checkout = () => {
  const navigate = useNavigate();
  const [method, setmethod] = useState("COD");
  const { backendUrl } = useContext(ShopContext);
  const { state } = useLocation();
  const token = Cookies.get("token")
  const decoded = jwtDecode(token);
  const userId = decoded._id;
  const [formData, setformData] = useState({
    userName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };
 

  const initPay = async(order) => {
 
    const options ={
        key : import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount  : order.amount,
        currency : order.currency,
        name : "E-commerce",
        description : "Test Transaction",
        order_id: order.id,
 
        handler: async( response)=>{
        try {
            const razorpay_order_id = response.razorpay_order_id
        
        const res = await fetch(`${backendUrl}order/verifyRazorpay`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                razorpay_order_id,
                order,
                userId
            })
        })
        const data = await res.json()
        if(res.ok) {
            toast.success(data.msg)
            navigate("/myOrders")
        }
        else{
            toast.error(data.msg)
        }
    } catch (error) {
      console.log(error);
      
        toast.error("Something went wrong")
    }
    }
}
    const rzp=  new window.Razorpay(options)
    rzp.open()
    }

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      switch (method) {
        case "COD":
          const response = await fetch(`${backendUrl}order/placeOrder`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              address: formData,
              items: state.cart,

              amount: state.discountPrice,
            }),
          });
          const data = await response.json();
          if (response.ok) {
            toast.success(data.msg);
            navigate("/myOrders")
          } else {
            toast.error(data.msg);
          }
          break;
        case "stripe":
          const res = await fetch(`${backendUrl}order/stripePayment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              address: formData,
              items: state.cart,

              amount: state.discountPrice,
            }),
          });
          const stripeData = await res.json();
          if (res.ok) {
            window.location.replace(stripeData.url);
          } else {
            console.log(stripeData);
            
            toast.error("payment failed");
          }
          break;
        case "razorpay":
            const res1 = await fetch(`${backendUrl}order/razorpayPayment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    items: state.cart,
                    amount: state.discountPrice,
                    address: formData,
                }),
                credentials: "include"
            })
            const razorData = await res1.json()
            if(res1.ok){
              console.log(razorData)
                await initPay(razorData.order)
            }
            else{
                console.log(razorData)
                toast.error("payment failed")
            }

        default:
          break;
      }
    } catch (error) {
        console.log(error);
        
      toast.error("Something went wrong");
    }
  };
  console.log(method);

  return (
    <div className="w-full min-h-screen bg-[#F5E5D6] flex flex-col pt-22">
      <div className="container mt-10 ">
        <div className="row flex w-full h-[80%] items-center justify-between ">
          <div className="col-md-6 ">
            <Text text1={"DELIEVERY"} text2={"INFORMATION"} />
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
              <div className="row mb-2">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="userName"
                    onChange={handleChange}
                    value={formData.userName}
                    placeholder="First name"
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    onChange={handleChange}
                    value={formData.lastName}
                    placeholder="Last name"
                  />
                </div>
              </div>

              <input
                type="email"
                className="form-control mb-2"
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="Email address"
              />

              <input
                type="text"
                className="form-control mb-2"
                name="street"
                onChange={handleChange}
                value={formData.street}
                placeholder="Street"
              />

              <div className="row mb-2">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    onChange={handleChange}
                    value={formData.city}
                    placeholder="City"
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    onChange={handleChange}
                    value={formData.state}
                    placeholder="State"
                  />
                </div>
              </div>

              <div className="row mb-2">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="pinCode"
                    onChange={handleChange}
                    value={formData.pinCode}
                    placeholder="Pin Code"
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    onChange={handleChange}
                    value={formData.country}
                    placeholder="Country"
                  />
                </div>
              </div>

              <input
                type="number"
                className="form-control mb-3"
                name="phone"
                onChange={handleChange}
                value={formData.phone}
                placeholder="Phone"
              />

              <button
                type="submit"
                className="p-2 font-bold bg-amber-800 text-white"
              >
                Place Order
              </button>
            </form>
          </div>

          <div className="col-md-5 flex flex-col justify-between w-2/3  ">
            <div className="flex flex-col  h-[300px]   bg-[#eee] shadow-xl justify-between  py-8 rounded-[2px] p-4 ">
              <div className=" prata text-amber-800 text-xl mb-2">
                Order Details
              </div>
              <div className=" flex flex-col font-light  gap-y-2">
                <div className=" flex items-center gap-2  justify-between">
                  <span>Total Price</span> Rs.{state.totalPrice}
                </div>
                <div className=" flex items-center gap-2 text-amber-700 text-[16px] justify-between">
                  <span>DiscountPrice</span>{" "}
                  <span>-Rs.{state.totalPrice - state.discountPrice}</span>
                </div>
                <div className="justify-between flex items-center text-gray-500">
                  <span>Shipping Cost </span> Rs.40
                </div>
                <hr />
              </div>
              <div className="w-full flex items-center font-medium  justify-between">
                <span>Total Ammount</span>
                Rs.{state.discountPrice + 40}
              </div>
            </div>
            <div>
              <span className=" text-amber-800 text-2xl  ">PAYMENT METHOD</span>
              <div className="d-flex gap-2 mt-2">
                <button
                  onClick={() => setmethod("stripe")}
                  className={`btn ${
                    method === "stripe" ? "btn-primary" : "btn-outline-primary"
                  }`}
                >
                  stripe
                </button>
                <button
                  onClick={() => setmethod("razorpay")}
                  className={`btn ${method === "razorpay" ? "btn-primary" : "btn-outline-primary"}`}
                >
                  Razorpay
                </button>
                <button
                  onClick={() => {
                    setmethod("COD");
                  }}
                  className={`btn ${method === "COD" ? "btn-primary" : "btn-outline-primary"}`}
                >
                  Cash on delivery
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
