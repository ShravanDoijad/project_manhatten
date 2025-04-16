import React from "react";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import uploadImg from "../assets/Images/upload_area.png";
import Text from "../components/Text";
const AddProduct = () => {
  const [image1, setimage1] = useState("");
  const [image2, setimage2] = useState("");
  const [image3, setimage3] = useState("");
  const [image4, setimage4] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    tags: "",
    price: "",
    discountPrice: "",
    sellerName: "",
    availabilityStatus: true,
    shippingCost: "",
    returnPolicy: "",
    avgRating: "",
  });

  const formdata = new FormData();
  formdata.append("image1", image1);
  formdata.append("image2", image2);
  formdata.append("image3", image3);
  formdata.append("image4", image4);
  formdata.append("name", formData.name);
  formdata.append("description", formData.description);
  formdata.append("category", formData.category);
  formdata.append("tags", formData.tags);
  formdata.append("price", formData.price);
  formdata.append("discountPrice", formData.discountPrice);
  formdata.append("availabilityStatus", formData.availabilityStatus);
  formdata.append("sellerName", formData.sellerName);
  formdata.append("shippingCost", formData.shippingCost);
  formdata.append("returnPolicy", formData.returnPolicy);
  formdata.append("avgRating", formData.avgRating);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/products/addProduct",
        {
          method: "POST",

          body: formdata,
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Product added successfully");
        toast.success(data.msg);
        console.log("data", data);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Product not added");
    }
  };

  const generateDescription = async () => {
    const apiKey = import.meta.env.VITE_OPENAI_KEY;
  
    if (!formData.name || !formData.category) {
      toast.error("Enter product name and category first");
      return;
    }
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
              role: "user",
              content: `Write a detailed product description for a handicraft item named "${formData.name}" in category "${formData.category}".`,
            },
          ],
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenAI Error:", errorData);
        toast.error("Failed to generate description");
        return;
      }
  
      const data = await response.json();
  
      const generatedDescription = data.choices?.[0]?.message?.content;
      if (generatedDescription) {
        setFormData((prev) => ({ ...prev, description: generatedDescription }));
        toast.success("AI Description Generated!");
      } else {
        toast.error("Failed to parse description");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error while calling OpenAI API");
    }
  };
  
  
  
  
  const navigate = useNavigate();
  const token = Cookies.get("artistToken");
  useEffect(() => {
    if (!token) {
      toast.error("Need to login");
      navigate("/sellerLogin");
    }
  }, []);

  return (
    <div className="w-full h-screen ">
      <Text text1={"ADD"} text2={"PRODUCT"} />
      <div className="w-full h-full ">
        <form onSubmit={handleSubmit} className="w-full h-[75%]  flex">
          <div className="flex flex-col items-center w-1/5 h-fulljustify-between  border-r-[1px] border-gray-400">
            <p className=" montserrat">upload images</p>
            <div className="flex flex-col justify-between  gap-3">
              <label htmlFor="image1">
                <img
                  src={!image1 ? uploadImg : URL.createObjectURL(image1)}
                  className="object-cover overflow-hidden w-24 h-28"
                  alt=""
                />
                <input
                  type="file"
                  onChange={(e) => setimage1(e.target.files[0])}
                  id="image1"
                  className="hidden"
                />
              </label>
              <label htmlFor="image2">
                <img
                  src={!image2 ? uploadImg : URL.createObjectURL(image2)}
                  className="object-cover overflow-hidden w-24 h-28"
                  alt=""
                />
                <input
                  type="file"
                  onChange={(e) => setimage2(e.target.files[0])}
                  id="image2"
                  className="hidden"
                />
              </label>
              <label htmlFor="image3">
                <img
                  src={!image3 ? uploadImg : URL.createObjectURL(image3)}
                  className="object-cover overflow-hidden w-24 h-28"
                  alt=""
                />
                <input
                  type="file"
                  onChange={(e) => setimage3(e.target.files[0])}
                  id="image3"
                  className="hidden"
                />
              </label>
              <label htmlFor="image4">
                <img
                  src={!image4 ? uploadImg : URL.createObjectURL(image4)}
                  className="object-cover overflow-hidden w-24 h-28"
                  alt=""
                />
                <input
                  type="file"
                  onChange={(e) => setimage4(e.target.files[0])}
                  id="image4"
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-3  mx-auto w-3/5 px-10 h-full">
            <input
              name="name"
              placeholder="Product Name"
              onChange={handleChange}
              className="border-[1px] border-gray-800 p-2 rounded w-full"
              required
            />
            <input
              name="description"
              placeholder="Description"
              onChange={handleChange}
              className="border-[1px] border-gray-800 p-2 rounded w-full"
              required
            />
            <button
              type="button"
              onClick={generateDescription}
              className="bg-blue-500 text-white p-1 rounded text-sm w-40"
            >
              Generate Description
            </button>

            <input
              name="category"
              placeholder="Category"
              onChange={handleChange}
              className="border-[1px] border-gray-800 p-2 rounded w-full"
              required
            />
            <input
              name="tags"
              placeholder="Tags (comma-separated)"
              onChange={handleChange}
              className="border-[1px] border-gray-800 p-2 rounded w-full"
            />
            <div className="flex gap-4 w-full">
              <input
                name="price"
                type="number"
                placeholder="Price"
                onChange={handleChange}
                className="border-[1px] border-gray-800 p-2 rounded w-full"
                required
              />
              <input
                name="discountPrice"
                type="number"
                placeholder="Discount Price"
                onChange={handleChange}
                className="border-[1px] border-gray-800 p-2 rounded w-full"
              />
            </div>
            <input
              name="sellerName"
              placeholder="Seller Name"
              onChange={handleChange}
              className="border-[1px] border-gray-800 p-2 rounded w-full"
              required
            />
            <div className="flex gap-4 w-full">
              <input
                name="shippingCost"
                type="number"
                placeholder="Shipping Cost"
                onChange={handleChange}
                className="border-[1px] border-gray-800 p-2 rounded w-full"
              />
              <input
                name="avgRating"
                type="number"
                placeholder="Average Rating (0-5)"
                onChange={handleChange}
                className="border-[1px] border-gray-800 p-2 rounded w-full"
              />
            </div>
            <input
              name="returnPolicy"
              placeholder="Return Policy"
              onChange={handleChange}
              className="border-[1px] border-gray-800 p-2 rounded w-full"
            />
            <button
              type="submit"
              className=" border-gray-800 hover:shadow-xl p-1 w-50 mx-auto rounded bg-amber-800 text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
