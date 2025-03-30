const express = require("express")
const cartRouter = express.Router()
const {addCart, updateCart, getCart} = require("../controller/cartController")

cartRouter.post("/addCart", addCart)
cartRouter.post("/updateCart", updateCart)
cartRouter.get("/getCart", getCart)

module.exports = cartRouter