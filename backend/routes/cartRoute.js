const express = require("express")
const cartRouter = express.Router()
const {addCart, updateCart, getCart, removeCart, addAddress} = require("../controller/cartController")

cartRouter.post("/addCart", addCart)
cartRouter.post("/updateCart", updateCart)
cartRouter.get("/getCart", getCart)
cartRouter.post("/removeCart", removeCart )


module.exports = cartRouter