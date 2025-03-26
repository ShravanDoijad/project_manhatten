const { cookie } = require("express-validator");
const jwt  = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
  try {
    const token = await req.cookies.adminToken
    const decoaded =  jwt.verify(token, process.env.JWT_SECRET)
    if(decoaded.email!==process.env.ADMIN_EMAIL || decoaded.password !== process.env.ADMIN_PASSWORD){
        return res.status(400).json({msg: "Unauthorized"})
    }
     
    next()
    
  } catch (error) {

    console.log("admin authetication error", error);
    res.status(500).json({msg: "internel server error"})
    
  }
}

module.exports = {adminAuth}