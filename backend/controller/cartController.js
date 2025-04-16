const {User} = require("../model/authModel")
const jwt = require("jsonwebtoken");
const { removeProduct } = require("./productController");

const addCart = async (req, res) => {
  try {
    const { productId} = req.body
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });}
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded._id;
    const userData = await User.findById(userId)
    let cartData = await userData.cartData || {}

    
    console.log('userData', userData);
    

    
        if(cartData[productId]){
        cartData[productId] = cartData[productId]+1}
        else{
            cartData[productId] = 1
        }
    
   
        
        
     await User.findByIdAndUpdate(userId, {$set: { cartData}})

    
    return res.status(200).json({message:"Product added to cart"})
    

  } catch (error) {
    console.log("add to cart error", error);
    
    return res.status(500).json({message: "add to cart failed"})
  }
}
const updateCart = async (req, res) => {
  try {
    const { productId, quantity}= req.body
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });}
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded._id;
    const userData = await User.findById(userId)
    let cartData = await userData.cartData || {}

        if(cartData[productId]){
        cartData[productId] = quantity}
        
        await User.findByIdAndUpdate(userId, {$set: { cartData}})
        return res.status(200).json({msg: "CartDat updated successfully"})
    
  } catch (error) {
    console.log("add to cart error", error);
    
    return res.status(500).json({message: "update cart failed", error})
  }
}

const getCart = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });}
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded._id;
    
    const user = await User.findById(userId)
    
    res.status(200).json(user.cartData)
    
    
  } catch (error) {
    console.log("remove product error", error);
    res.status(200).json({msg: "can't remove the product"})
  }
}

const removeCart = async (req, res)=>{
  try {
    const {productId} = req.body;
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });}
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded._id;
      const userData = await User.findById(userId);
      const cartData = userData.cartData
     if(!cartData[productId]) return res.status(200).json({msg: "Product already removed from cart"})
      delete cartData[productId]
     await User.findByIdAndUpdate(userId, {$set: { cartData}})
      res.status(200).json(cartData)
  } catch (error) {
    console.log(error);
    
    res.status(501).json({msg: "can't remove the product"})
  }
}

const addAddress =  async(req, res) => {
  try {
    const {address} = req.body
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });}
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded._id;
    const userData = await User.findById(userId)
    const addressData = userData.address || {}
    await userData.save()
      res.status(200).json(addressData)
  } catch (error) {
    res.status(501).json({msg: "can't add address"})
  }
}


module.exports = { addCart, addAddress, updateCart, getCart, removeCart}