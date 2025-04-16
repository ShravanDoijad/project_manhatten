const { cookie } = require("express-validator");
const jwt  = require("jsonwebtoken");

const artistAuth = async (req, res, next) => {
  try {
    const token = await req.cookies.artistToken
    if(!token){
      return res.status(400).json({msg: "unAuthorized"})
    }
    
     
    next()
    
  } catch (error) {

    console.log("artist authetication error", error);
    res.status(500).json({msg: "Need to Login"})
    
  }
}

module.exports = {artistAuth}