import React from "react";
import Text from "../components/Text";
import { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
export const MyOrders = () => {
  const { products, backendUrl } = useContext(ShopContext);
  const [orders, setorders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await fetch(`${backendUrl}order/userOrders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setorders(data.userOrders);
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="w-full relative min-h-screen overflow-hidden px-10 bg-[#F5E5D6] pt-22">
        <Text text1={"MY"} text2={"ORDERS"} />  
        <button className=" absolute top-20 right-20 text-green-800 bg-green-300 px-2 p-2 rounded-[6px] shadow-2xl hover:bg-green-800 hover:text-white" >TRACK ORDERS</button>
      <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <thead className="bg-[#f5f5f5] text-gray-700">
          <tr className="text-center text-sm uppercase tracking-wider">
            <th className="py-4 px-2">Order</th>
            <th className="py-4 px-2">Product Name</th>
            <th className="py-4 px-2">Price</th>
            <th className="py-4 px-2">Quantity</th>
            <th className="py-4 px-2">Status</th>
            <th className="py-4 px-2">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order, index) =>
            order.items.map((product, num) => (
              <tr
                key={`${index}-${num}`}
                className="text-center text-sm hover:bg-gray-50 transition"
              >
                <td className="py-3 px-2 flex justify-center">
                  <img
                    src={product.images[0]}
                    alt=""
                    className="w-18 h-18 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-2 text-amber-800 ">{product.name}</td>
                <td className="py-3 px-2">₹{product.discountPrice}</td>
                <td className="py-3 px-2">{product.quantity}</td>
                <td className="py-3 px-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold 
              ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : order.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }
            `}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-2">
                  {new Date(order.date).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
