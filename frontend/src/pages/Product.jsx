import { React } from "react";
import { data, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Key, Undo2, SendHorizontal } from "lucide-react";
import { Autoplay, A11y } from "swiper/modules";
import Text from "../components/Text";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Cookies from "js-cookie";
import "swiper/css/autoplay";
import "swiper/css/controller";
import { toast } from "react-toastify";



const Product = () => {
  const { productId } = useParams();
  const [similarProducts, setsimilarProducts] = useState([]);
  const [review, setreview] = useState([])
  const [message, setmessage] = useState("");
  const { products, backendUrl } = useContext(ShopContext);
  const token = Cookies.get("token");

  if (!products) {
    return <div>Loading...</div>;
  }
  const [mainImg, setmainImg] = useState(null);
  
  const product = products.find((item) => item._id === productId);

  useEffect(() => {
    if (product) {
      setmainImg(product.images[0]);
      const simProducts = products.filter(
        (item) => item.category === product.category
      );
      setsimilarProducts(simProducts);
    }
  }, [product, products]);



  const handleCart = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        toast.error("Please Login First");
        navigate("/userLogin");
        return;

      }
      const res = await fetch(`${backendUrl}cart/addCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
        credentials: "include",
      })
      const data = await res.json();
      if (res.ok) {
        toast.success("Product added to cart successfully");
      } else {
        toast.error(data.msg);
      }

    } catch (error) {
      toast.error("Something Went Wrong");
    }
  }
  
  const navigate = useNavigate();
  if (!product) {
    return <div>Product not found</div>;
  }
  const addReviews = async () => {
    if (!token) {
      navigate("/userLogin");
    }
    try {
      const res = await fetch(`${backendUrl}products/addReview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, productId }),
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
       console.log("data", data);
        
        window.location.reload()
        toast.success("Review Added Successfully");
      } else {
        console.log(data.msg);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };
  
 
  

  console.log("review", review);
  
  

  return (
    <div className="w-full min-h-screen bg-[#F5E5D6] flex flex-col pt-22 ">
      <div className=" w-full px-10 h-160 flex  ">
        <div className=" flex flex-col w-1/7  h-full gap-y-6 justify-items-start">
          {product.images.map((image, idx) => (
            <img
              onClick={() => {
                setmainImg(image);
              }}
              key={idx}
              src={image}
              className=" h-2/9 object-cover "
            />
          ))}
        </div>
        <div className="w-3/7">
          <img
            src={mainImg}
            className="w-full h-full px-4 object-cover"
            alt=""
          />
        </div>
        <div className="flex flex-col w-3/8 h-full gap-y-4 justify-between">
          <div className=" prata font-bold text-amber-800">{product.name}</div>
          <div>{product.description}</div>
          <div>
            Rs.{product.discountPrice}{" "}
            <span className=" line-through text-gray-500">
              Rs.{product.price}
            </span>
          </div>
          <div className=" flex justify-center items-center gap-2 bg-green-600 rounded-[4px] w-16">
            {product.avgRating}{" "}
            <span>
              <FaStar style={{ color: "gold" }} />
            </span>
          </div>
          <div className="flex gap-2  items-center text-gray-500">
            <div className="text-[13px] poppins-medium font-bold">
              Shipping Cost:
            </div>
            <div className="text-[13px]">Rs.{product.shippingCost}</div>
          </div>

          <div className="flex group items-center gap-y-4 justify-center cursor-pointer flex-col w-40  ">
            <div className=" border-[1px] border-gray-500  px-2 flex justify-items-start w-full justify-center gap-1.5 h-10 items-center  font-bold">
              <Undo2 className=" text-[10px]" />
              <span className=""> Return Policy</span>
            </div>
            <div className="text-[13px] hidden group-hover:block">
              {product.returnPolicy}
            </div>
          </div>
          <div className=" flex justify-between w-40 gap-4 text-gray-800 font-bold">
            Seller
            <div className="text-amber-800 text-[20px] prata">
              {product.sellerName}
            </div>
          </div>
          <div className="  rounded-[4px]  w-96 border-gray-500  ">
            <p className="text-[18px] ">OUR TRUST</p>
            <hr />
            <div className="flex gap-2 flex-col ">
              <div className="poppins-medium text-[13px] text-gray-500">
                We ensure 100% handcrafted and authentic products directly from
                skilled artisans.
              </div>
              <div className=" poppins-medium text-[13px] text-gray-500">
                Your data and transactions are fully secured with end-to-end
                encryption and trusted payment gateways
              </div>
            </div>
          </div>
          <div className="flex  justify-center items-center gap-2 w-full mx-auto h-10 bg-amber-800 text-white font-bold text-md rounded-[4px] cursor-pointer">
            <button onClick={()=>{handleCart()}} className=" shadow-xl shadow-gray-500 hover:shadow-none transition-all duration-300 ease-in-out w-full h-full flex justify-center items-center">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <hr className="text-amber-800 mx-4 " />
      <div className="w-full  px-10 flex mt-34 h-170 items-start ">
        <div className="w-full h-full flex flex-col gap-y-4">
          <Text text1={"SIMILER"} text2={"PRODUCTS"} />
          {similarProducts.map((item, num) => (
            <div
              className=" flex w-full items-center gap-2"
              key={num}
              onClick={() => {
                navigate(`/product/${item._id}`);
              }}
            >
              <div>
                <img className="w-30 h-auto" src={item.images[0]} alt="" />
              </div>
              <div className="flex flex-col">
                <span className="prata text-[16px] text-amber-800">
                  {item.name}
                </span>
                <span className=" text-[14px] text-gray-500 ">
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="w-3/5   flex flex-col gap-4">
          <div className="flex w-full justify-between items-center px-4">
            <span className= 'text-amber-800 prata border-2 p-2'>CUSTOMER REVIEWS</span>
          </div>
          <div className="w-full p-4 ">
            <div className="w-full flex justify-between items-center px-6 p-2 mb-4 bg-[#eee] shadow-xl">
              <input
                type="text"
                name="message"
                onChange={(e) => {
                  setmessage(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addReviews();
                  }
                }}
                placeholder="Please add Reviews for the product"
                className=" w-full  placeholder:text-gray-500 focus: focus:border-b-[1px] border-transparent outline-none focus:border-gray-400 p-2"
              />
              <SendHorizontal onClick={()=>{
                addReviews();
              }} />
            </div>
                <div className=" flex flex-col gap-y-4" >
            { product.review.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className=" w-full flex flex-col gap-y-4 px-6 p-2 bg-[#eee] shadow-xl"
                >
                  <div className="  text-gray-600 poppins">
                    {item.message}
                  </div>
                  <div className="text-gray-600 text-[15px] flex w-full justify-between items-center " ><span>{item.userName}</span> <span>{new Date(item.date).toDateString()}</span></div>
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
