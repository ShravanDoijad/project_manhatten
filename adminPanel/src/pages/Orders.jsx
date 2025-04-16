import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setorders] = useState([]);
  const [status, setstatus] = useState("")
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const getOrders = async () => {
    try {
      const response = await fetch(`${backendUrl}/order/getOrders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });
      const data = await response.json();
      if (response.ok) {
        setorders(data.orders);
      } else {
        console.log(data.msg);
      }
    } catch (error) {
      toast.error("Internal server Error");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const statusChange = async(orderId, status ) => {
     
    try {
      const response = await fetch(`${backendUrl}/order/changeStatus`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({orderId, status})
      })
      const data = await response.json()
      if(response.ok){
        console.log(data.msg)
      }
      else{
        console.log(data.msg)

      }
    } catch (error) {
      console.log(error)
      toast.error("something went wrong")
    }
  }
  
  return (
    <div className="w-full min-h-screen p-4 flex flex-col gap-6">
      {orders.map((order, index) => (
        <div
          key={index}
          className="bg-[#eee] rounded-[4px] shadow-md  p-4 group transition duration-300 ease-in-out hover:shadow-xl"
        >
          <div className="flex items-center justify-between  gap-6 text-md text-gray-800">
            <div  className='flex gap-8' >
            <p className='text-gray-800 font-bold text-[16px]' >{order.address.userName} {order.address.lastName}</p>
            <div className='' >
            <p>{order.address.city}, {order.address.street}</p>
            <p>{order.address.pinCode}, {order.address.state}</p>
            <p>{order.address.phone}</p>
            </div>
            </div>
            <div>
            < p className=' text-gray-500 font-bold' > ₹{order.amount}</p>
            <p className='text-blue-500'>Payment: {`${order.payment}` } </p>
            </div>
            <p><span className="font-semibold">Quantity:</span> {order.items.length}</p>
            <select className='bg-red-200 text-red-700 rounded-2xl px-2 flex items-center justify-center text-center ' value={order.status} name="" onChange={(e)=>{statusChange(order._id, e.target.value)}} id="">
              
              <option value="order placed">order placed</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Returned">Returned</option>
            </select>
            <p><span className="font-semibold">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
          </div>

          
          <div className=" left-0 top-full mt-2 w-full hidden group-hover:flex flex-wrap gap-2 bg-white p-3 rounded-xl shadow-md z-10">
            {order.items.map((item, idx) => (
              <span
                key={idx}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700"
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
