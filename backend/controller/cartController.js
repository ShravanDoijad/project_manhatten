const {User} = require("../model/authModel")
const addCart = async (req, res) => {
  try {
    const {userId, productId} = req.body
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
    const {userId, productId, quantity}= req.body
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
    const {userId}=  req.body;
    const user = await User.findById(userId)
    console.log(user.cartData);
    res.status(200).json(user.cartData)
    
    
  } catch (error) {
    console.log("remove product error", error);
    res.status(200).json({msg: "can't remove the product"})
  }
}


module.exports = { addCart, updateCart, getCart}