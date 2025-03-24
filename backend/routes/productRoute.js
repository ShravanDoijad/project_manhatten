const express = require("express")
const productRouter = express.Router()
const {addProducts} = require("../controller/productController")
const upload = require("../middleware/multer")
productRouter.post("/addProduct",upload.fields([
    {name:"image1", maxCount:1},
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 }, 
    { name: "image4", maxCount: 1 }, ]),  addProducts)

module.exports =  productRouter