import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Text from "../components/Text";
import { toast } from "react-toastify";
import { PackageX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Checkout from "./Checkout";
const Cart = () => {
  const navigate = useNavigate();
  const { backendUrl, products } = useContext(ShopContext);

  const [cart, setcart] = useState([]);
  const [totalPrice, settotalPrice] = useState();
  const [discountPrice, setdiscountPrice] = useState(0);
  const handleNavigate = () => {
    navigate("/checkout", {
      state: {
        cart: cart,
        totalPrice: totalPrice,
        discountPrice: discountPrice,
      },
    });
  };
  const getCart = async () => {
    try {
      const res = await fetch(`${backendUrl}cart/getCart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);

        if (data) {
          const filtered = products
            .filter((item) => data.hasOwnProperty(item._id))
            .map((item) => ({
              ...item,
              quantity: data[item._id],
            }));

          setcart(filtered);
          settotalPrice(
            filtered.reduce((acc, item) => acc + item.price * item.quantity, 0)
          );
          setdiscountPrice(
            filtered.reduce(
              (acc, item) => acc + item.discountPrice * item.quantity,
              0
            )
          );
        }
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log("error", error);

      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${backendUrl}cart/removeCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productId: id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.msg);
        getCart();
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getCart();
  }, [products]);

  return (
    <div className="w-full min-h-screen bg-[#F5E5D6] flex flex-col pt-22 ">
      <div className="px-12 w-full ">
        <Text text1={"MY"} text2={"CART"} />
        <div className=" flex w-full ">
          <div className=" flex flex-col w-3/5  gap-3">
            {cart.map((item, idx) => {
              console.log(item);

              return (
                <div
                  key={idx}
                  className="flex flex-col bg-[#eee] shadow-xl rounded-[2px] p-2  w-full"
                >
                  <div className="flex gap-2.5">
                    <img src={item.images[0]} alt="" className="w-35 h-30" />
                    <div className="flex flex-col justify-between ">
                      <div className=" prata text-amber-800">{item.name}</div>
                      <div className=" flex gap-2 items-center">
                        <span>Rs.{item.discountPrice * item.quantity}</span>
                        <span className=" line line-through text-gray-500 text-sm">
                          Rs.{item.price * item.quantity}
                        </span>
                      </div>
                      <div className=" flex items-center justify-between w-full ">
                        <span className="text-gray-500">
                          Quantity: {item.quantity}
                        </span>
                        <span
                          onClick={() => {
                            handleDelete(item._id);
                          }}
                          className=" cursor-pointer flex gap-2 items-center"
                        >
                          <PackageX />
                          Delete
                        </span>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col w-2/6 h-[290px]   bg-[#eee] shadow-xl justify-between py-8 rounded-[2px] p-4 ml-8">
            <div className=" prata text-amber-800 text-xl mb-2">
              Order Details
            </div>
            <div className=" flex flex-col font-light  gap-y-2">
              <div className=" flex items-center gap-2  justify-between">
                <span>Total Price</span> Rs.{totalPrice}
              </div>
              <div className=" flex items-center gap-2 text-amber-700 text-[16px] justify-between">
                <span>DiscountPrice</span>{" "}
                <span>-Rs.{totalPrice - discountPrice}</span>
              </div>
              <div className="justify-between flex items-center text-gray-500">
                <span>Shipping Cost </span> Rs.40
              </div>
              <hr />
            </div>
            <div className="w-full flex items-center font-medium  justify-between">
              <span>Total Ammount</span>
              Rs.{discountPrice + 40}
            </div>
            <div>
              <button
                onClick={() => {
                  handleNavigate();
                }}
                className="w-full bg-amber-800 text-white py-2 rounded-md hover:bg-amber-800 transition-all duration-300"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
