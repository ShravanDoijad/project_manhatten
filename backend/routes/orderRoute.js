const express = require("express");
const orderRouter = express.Router();
const {placeOrder, stripePayment, verifyStripe, razorpayPayment, verifyRazorpay, getAllOrders, getuserOrders, statusChange} = require("../controller/orderController")

orderRouter.post("/placeOrder", placeOrder)
orderRouter.post("/stripePayment", stripePayment)
orderRouter.post("/verifyPayment", verifyStripe)
orderRouter.post("/razorpayPayment", razorpayPayment)
orderRouter.post("/verifyRazorpay", verifyRazorpay)
orderRouter.get("/getOrders", getAllOrders)
orderRouter.get("/userOrders", getuserOrders)
orderRouter.post("/changeStatus" , statusChange)


module.exports = orderRouter