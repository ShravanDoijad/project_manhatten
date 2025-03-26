const express = require("express")
const sellerRouter =  express.Router()
const {body} = require("express-validator")
const {registerSeller, loginSeller, logoutSeller, sellerProfile } = require("../controller/authController")

sellerRouter.post("/sellRegister",
[body('name').isLength({min: 2}).withMessage("Name must be at least 2 characters long"),
 body('email').isLength({min:6}).withMessage("Email must be at least 6 characters long"),
 body('password').isLength({min:3}).withMessage("password must be at least 3 characters long")  

], registerSeller)

sellerRouter.post("/sellLogin",
    [
     body('email').isLength({min:6}).withMessage("Email must be at least 6 characters long"),
     body('password').isLength({min:3}).withMessage("password must be at least 3 characters long")  
    
    ], loginSeller)

 sellerRouter.post("/logoutseller",
    logoutSeller
 )
 
 sellerRouter.get("/sellerProfile", sellerProfile)

 module.exports = sellerRouter   