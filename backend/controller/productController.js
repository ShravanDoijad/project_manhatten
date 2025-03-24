const Product = require("../model/productModel")

const cloudinary = require("../cloudinary")
const addProducts = async (req, res) => {
    
    
    try {
        const { name, description, category, sellerId, sellerName , tags, price, discountPrice, availabilityStatus, shippingCost, returnPolicy, avgRating } = req.body;

        
        if (!name || !description || !category || !tags || !price || !discountPrice || !availabilityStatus || !shippingCost || !returnPolicy || !avgRating) {
            return res.status(400).json({ msg: "All fields are required" });
        }
        const image1 = req.files?.image1?.[0]
        const image2 = req.files?.image2?.[0]
        const image3 = req.files?.image3?.[0]
        const image4 = req.files?.image4?.[0]
        
        
        const images = [image1, image2, image3, image4].filter((item)=>item)
        console.log("images",images);
        
        
        let imageUrl = (images.length >0)?
        await Promise.all(images.map(async(item)=>{
                console.log("item", item);
                
            let result = await cloudinary.uploader.upload(item.path, {resource_type: "image"})
            return result.secure_url
        })):[]

        
        
        
        const product = await Product.create({
            name, description, category, tags, price,sellerId, sellerName, discountPrice, availabilityStatus, shippingCost, returnPolicy, avgRating , image:imageUrl
        })
        console.log("product", product );
        return res.status(200).json(product)

    } catch (error) {
        console.log("can not get products", error);
        res.status(401).json({msg: "Can't get all product"})
        
    }
}

module.exports = {addProducts};