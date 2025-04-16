import React from "react";
import "../assets/styles.css"
import { toast } from "react-toastify";
import { useEffect , useState} from "react";
import { MdDelete } from "react-icons/md";

const ProductsPage = () => {
  const [products, setproducts] = useState([])
  const getAllProducts = async ()=>{
    try {
      const response = await fetch("http://localhost:3000/products/allProducts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const data = await response.json()
      if(response.ok){
       
        setproducts(data)
      }
      else{
        toast.error("Products not Available")
      }
      
    } catch (error) {
      console.log("error", error);
      toast.error("Error fetching products")
      
    }

  }
  
  useEffect(()=>{
    getAllProducts()
  }, [])

  const removeProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/products/remove`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId }),
        credentials: "include"
      })
      const data = await response.json()
      if(response.ok){
        toast.success("Product removed successfully")
        setproducts(products.filter(product => product._id !== productId))
      }
      else{
        toast.error("Error removing product")
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Error removing product")
    }
  }

  return (
    <div className="products-container">
      <h2 className="products-title">Products</h2>
      <p className="products-subtitle">Manage your products and view their sales performance.</p>
      <table className="products-table text-gray-500">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Price</th>
            <th>Seller Name</th>
            <th>Created at</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => (
            <tr className="text-center" key={idx}>
              <td className="product-info">
                <img src={product.images[0]} alt={product.name} className="product-img" />
                {product.name}
              </td>
              <td><span className="status active">Active</span></td>
              <td>{product.price}</td>
              <td  >{product.sellerName}</td>
              <td>{new Date(product.date).toDateString()}</td>
              <td onClick={()=>{removeProduct(product._id)}} className="text-xl ml-4" ><MdDelete /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};




export default ProductsPage;