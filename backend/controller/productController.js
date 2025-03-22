const Product = require("../model/productModel")


const getAllProduct = async (req, res) => {
    try {
        const { name, description, category, tags, images, price, discountPrice, availabilityStatus, shippingCost, returnPolicy, avgRating } = req.body;
                

        
    } catch (error) {
        console.log("can not get products", error);
        res.status(401).json({msg: "Can't get all product"})
        
    }
}

module.exports = getAllProduct;