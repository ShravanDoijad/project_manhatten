const express = require("express")
const productRouter = express.Router()
const {addProducts, listProducts, removeProduct, editProduct} = require("../controller/productController")
const upload = require("../middleware/multer")
const { adminAuth } = require("../middleware/adminAuth")
productRouter.post("/addProduct",upload.fields([
    {name:"image1", maxCount:1},
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 }, 
    { name: "image4", maxCount: 1 }, ]),  addProducts)

productRouter.get("/list",adminAuth, listProducts)    

productRouter.post("/remove", removeProduct)

productRouter.post("/edit",adminAuth ,editProduct)

module.exports =  productRouter