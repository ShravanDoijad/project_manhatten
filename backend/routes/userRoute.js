const express = require("express")
const userRouter =  express.Router()
const {body} = require("express-validator")
const {registerUser, loginUser} = require("../controller/authController")

userRouter.post("/register",
[body('name').isLength({min: 2}).withMessage("Name must be at least 2 characters long"),
 body('email').isLength({min:6}).withMessage("Email must be at least 6 characters long"),
 body('password').isLength({min:3}).withMessage("password must be at least 3 characters long")  

], registerUser)

userRouter.post("/login",
    [
     body('email').isLength({min:6}).withMessage("Email must be at least 6 characters long"),
     body('password').isLength({min:3}).withMessage("password must be at least 3 characters long")  
    
    ], loginUser)

 module.exports = userRouter   