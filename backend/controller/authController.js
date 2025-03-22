const {User, Seller} = require('../model/authModel');

const {validationResult}= require("express-validator")

const registerUser = async(req, res) => {
  try {
       const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(401).json({errors: errors.array()})
        
    }
    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return res.status(400).json({message: "Please provide all the required fields"})
    else{
    let emailMatch =await User.findOne({email})
    if (emailMatch) return res.status(401).json({ message: "Email already exists" })
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
    
    res.status(400).json({message: error})
    
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
            res.cookie("token", token)   
            return res.status(200).json({msg:"user logged in", token}) 
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
  
      res.cookie("token", token)
      return res.status(200).json({msg: "registered succesfully", token})
  }
    } catch (error) {
      console.log(error);
      
      res.status(400).json({message: error})
      
    }
  }

module.exports = {registerUser, loginUser, loginSeller, registerSeller};

