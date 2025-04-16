const {User, Seller} = require('../model/authModel');
const jwt  = require("jsonwebtoken")
const {validationResult, cookie}= require("express-validator")

const registerUser = async(req, res) => {
  try {
       const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log("errors", errors)
        return res.status(400).json({errors: errors.array()})
        
    }
    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return res.status(400).json({msg: "Please provide all the required fields"})
    else{
    let emailMatch =await User.findOne({email})
    if (emailMatch) return res.status(401).json({ msg: "Email already exists" })
    const hashedPassword=  await User.hashPassword(password);
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })    
    const token = await user.generateAuthToken();

    res.cookie("token", token)
    return res.status(200).json({msg: "registered succesfully", token})
}
  } catch (error) {
    console.log(error);
    
    res.status(400).json({msg: error})
    
  }
}

const loginUser = async(req, res)=>{
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(401).json({errors: errors.array()})
            
        }
        const {  email, password } = req.body;
        if ( !email || !password)
            return res.status(400).json({message: "Please provide all the required fields"})
        else
        {
            const logUser = await User.findOne({email}).select("+password")
            const isMatch = await logUser.comparePassword(password);
            if (!logUser || !isMatch) {
                return res.status(401).json({msg:"invalid email or password"})
            }
            const token = await logUser.generateAuthToken()
            res.cookie("token", token)   
            return res.status(200).json({msg:"user logged in", token}) 
        }
    } catch (error) {
        console.log(error);
    
    res.status(400).json({message: error})
    }
}


const loginSeller =  async(req, res)=>{
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(401).json({errors: errors.array()})
            
        }
        const {  email, password } = req.body;
        if ( !email || !password)
            return res.status(400).json({message: "Please provide all the required fields"})
        else
        {
            const logUser = await Seller.findOne({email}).select("+password")
            const isMatch = await logUser.comparePassword(password);
            if (!logUser || !isMatch) {
                return res.status(401).json({msg:"invalid email or password"})
            }
            const token = await logUser.generateAuthToken()
            res.cookie("artistToken", token)   
            return res.status(200).json({msg:"seller logged in", token}) 
        }
    } catch (error) {
        console.log(error);
    
    res.status(400).json({message: error})
    }
}

const registerSeller =async(req, res) => {
    try {
         const errors = validationResult(req)
      if (!errors.isEmpty()) {
          return res.status(401).json({errors: errors.array()})
          
      }
      const { name, email, password } = req.body;
  
      if (!name || !email || !password)
          return res.status(400).json({message: "Please provide all the required fields"})
      else{
      let emailMatch =await Seller.findOne({email})
      if (emailMatch) return res.status(401).json({ message: "Email already exists" })
      const hashedPassword=  await Seller.hashPassword(password)
      const user = await Seller.create({
          name,
          email,
          password: hashedPassword
      })    
      const token = await user.generateAuthToken();
  
      res.cookie("artistToken", token)
      return res.status(200).json({msg: "registered succesfully", token})
  }
    } catch (error) {
      console.log(error);
      
      res.status(400).json({message: error})
      
    }
  }

  const logoutUser = async(req, res) => {
    try {
       res.clearCookie("token")
       console.log("yes");
       res.status(200).json({ msg: "Logged out successfully" });
       
    } catch (error) {
        res.status(500).json({msg: error})
    }
  }

  const logoutSeller = async (req, res) => {
    try {
        res.clearCookie("artistToken")
        res.status(200).json({msg:"Logut seccessfully"})
    } catch (error) {
        res.status(500).json({msg:"can't logout"})
    }
    
  }

  const userProfile = async (req, res) => {
    try {
        const token = req.cookies.token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        
        
        const userId = decoded._id
        const user = await User.findById(userId)
        return res.status(200).json(user)
     
    } catch (error) {
        console.log(error);
        
        res.status(500).json({msg:"unable to fetch profile"})
    }
  }
  
  
  const sellerProfile = async (req, res) => {
    try {
        const token = req.cookies.artistToken
        
        const decoaded = await jwt.verify(token, process.env.JWT_SECRET)
        const sellerId = decoaded._id
        const seller = await Seller.findById(sellerId)
        return res.status(200).json(seller)
     
    } catch (error) {
        console.log(error);
        
        res.status(500).json({msg:"unable to fetch profile"})
    }
  }

  const adminLogin = async (req, res) => {
    try {
        const {email , password} = req.body;
        if(!email|| !password){
            return res.status(400).json({msg: "all fields are required"})
        }

        if(email!==process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.status(400).json({msg:"invalid creds"})
        }



        const token =  jwt.sign({
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD
    }, process.env.JWT_SECRET, {expiresIn: "1d"})
         await res.cookie("adminToken", token)
        return res.status(200).json({msg: "admin loggedIn successfully"})
        
    } catch (error) {
        console.log("adminLogin error", error);
        
        res.status(500).json({msg:"internel server error"})
    }
  }

  const logoutAdmin = async (req, res) => {
    try {
        res.clearCookie("adminToken")
        res.status(200).json({msg:"admin logged out successfully"})
    } catch (error) {
        console.log("adminLogout error", error);
        
        res.status(500).json({msg:"internel server error"})
    }
  }

  const allSellers = async (req, res) => {
    try {
        const sellers = await Seller.find()
        return res.status(200).json(sellers)
    } catch (error) {
        console.log("allSellers error", error);
        
        res.status(500).json({msg:"internel server error"})
    }
  }
  
  
  

module.exports = {registerUser,logoutAdmin, allSellers ,adminLogin, userProfile, sellerProfile ,logoutSeller, loginUser, loginSeller, registerSeller, logoutUser};

