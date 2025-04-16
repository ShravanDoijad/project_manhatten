import React, { useEffect } from "react";

import { useContext, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import img from "../assets/Images/img3.jpeg";
import { toast } from "react-toastify";
import Text from "../components/Text";
import { Link } from "react-router-dom";
import "../assets/css/SearchBar.css";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { AudioLines, Search } from "lucide-react";

const Collection = () => {
  const { products, setproducts, loading, backendUrl } =
    useContext(ShopContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setsortType] = useState("");
  const [category, setcategory] = useState([]);
  const [sortProduct, setsortProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Voice input:", transcript);
      setSearchQuery(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error: ", event);
      const errorMsg = event.error ? event.error : "Unknown error occurred";
      toast.error("Voice recognition error: " + errorMsg);
    };
    window.startVoiceSearch = () => recognition.start();
  }, []);
  useEffect(() => {
    setAllProducts(products);
  }, [products]);

  useEffect(() => {
    if (category.length === 0) {
      setAllProducts(products);
    } else {
      const filtered = allProducts.filter((item) =>
        category.includes(item.category.trim())
      );
      setAllProducts(filtered);
    }
  }, [category]);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setcategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSort = (e) => {
    if (sortType === "low to high") {
      const sortedProducts = [...allProducts].sort(
        (a, b) => a.discountPrice - b.discountPrice
      );
      setAllProducts(sortedProducts);
    } else if (sortType === "high to low") {
      const sortedProducts = [...allProducts].sort(
        (a, b) => b.discountPrice - a.discountPrice
      );
      setAllProducts(sortedProducts);
    } else {
      setAllProducts(products);
    }
  };
  useEffect(() => {
    handleSort();
  }, [sortType]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${backendUrl}products/search`, {
        params: { category: searchQuery.trim(), tags: searchQuery.trim() },
      });
      console.log("res data", res.data);
      const data = await res.data;

      setproducts(data);
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("No products found ");
      }
      console.error("Error searching products:", error.response?.data);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      document
        .querySelector(".search-form")
        .dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
    }
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen overflow-hidden px-10 bg-[#F5E5D6] pt-22">
      <form
        className="search-form absolute flex top-5 rounded-2xl z-10 left-80 w-120 bg-[#eee] p-2 px-4 gap-2 shadow-xl"
        onSubmit={handleSearch}
      >
        <input
          className="w-full border-0 px-4 bg-[#eee]"
          type="search"
          placeholder="Search by category or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-btn" type="submit">
          <Search />
        </button>
        <div
          
          className="   flex items-center justify-center cursor-pointer text-blue-800 w-6 h-6 "
          onClick={() => window.startVoiceSearch()}
        >
          <AudioLines width={20} />
        </div>
      </form>
      <Text text1={"OUR"} text2={"COLLECTION"} />
      <div className="flex w-full h-full">
        <div className="w-1/5 h-[80%] flex flex-col gap-y-6 border-r px-10 ">
          <div className=" w-100 h-100 px-4 p-2  bg-[#eee] shadow-xl">
            <form className="flex flex-col gap-y-3 text-[16px] ">
              <div className="flex justify-between w-full">
                <span>Home Decor</span>
                <input
                  value={"Home Decor"}
                  type="checkbox"
                  onChange={toggleCategory}
                />
              </div>

              <div className="flex justify-between w-full">
                <span>Accesories</span>
                <input
                  type="checkbox"
                  onChange={toggleCategory}
                  value={"accessories"}
                />
              </div>

              <div className="flex justify-between w-full">
                <span>Toys & Kids</span>
                <input
                  onChange={toggleCategory}
                  type="checkbox"
                  value={"toys"}
                />
              </div>
              <div className="flex justify-between w-full">
                <span>Art & Paintings</span>
                <input
                  onChange={toggleCategory}
                  type="checkbox"
                  value={"art"}
                />
              </div>
            </form>
          </div>
          <div className=" w-100 h-30 px-4 p-2  bg-[#eee] shadow-xl">
            <span className="text-[16px] mb-3 text-amber-800">
              Sort by Price
            </span>
            <select
              className="w-full"
              value=""
              onChange={(e) => {
                setsortType(e.target.value);
              }}
            >
              <option value={"Relevent"} name="" id="">
                Relevent
              </option>
              <option name="" value={"low to high"} id="">
                Low To High
              </option>
              <option name="" value={"high to low"} id="">
                {" "}
                High To Low{" "}
              </option>
            </select>
          </div>
        </div>
        <div className=" px-10 grid gap-12 grid-cols-4">
          {allProducts.map((item, num) => {
            return (
              <Link
                to={`/product/${item._id}`}
                key={num}
                className=" w-60 h-84 flex flex-col justify-between "
              >
                <img
                  src={item.images[0]}
                  className=" w-full h-60 object-cover object-center "
                  alt="Product 1"
                />

                <div className=" text-center flex flex-col justify-center items-center">
                  <div className="">{item.name}</div>
                  <div className=" prata text-sm text-amber-800 ">
                    {item.sellerName}
                  </div>
                  <div className="flex w-full justify-between">
                    <div className=" flex justify-center items-center gap-2 bg-green-700 text-white rounded-[4px] w-16">
                      {item.avgRating}{" "}
                      <span>
                        <FaStar style={{ color: "gold" }} />
                      </span>
                    </div>
                    <div className=" ">
                      Rs.{item.discountPrice}{" "}
                      <span className="line-through text-sm text-gray-600">
                        Rs.{item.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collection;
