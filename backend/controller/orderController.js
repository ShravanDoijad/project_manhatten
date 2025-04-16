const Order = require("../model/orderModel")
const jwt = require("jsonwebtoken");
const {User} = require("../model/authModel")
const Stripe = require("stripe")
const Razorpay = require("razorpay");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpayInstance = new Razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET
})
const currency ="inr"
const shippingCost = 40

const placeOrder = async (req, res) => {
    try {
        const { items, address, amount } = req.body;
        if(!items || !address || !amount) {
            return res.status(400).json({ message: "Please provide all the required fields" });
        }
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded._id;
        const order = await Order.create({
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            status: "order placed",
            date: Date.now()
        });
        const user = await User.findByIdAndUpdate(userId, {cartData: {}})
        res.status(200).json({ message: "Order placed successfully", order });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "add order failed" });
    }
}

const stripePayment = async(req, res) => {
  try {
    const { items, address, amount } = req.body;
    const {origin} = req.headers
        if(!items || !address || !amount) {
            return res.status(400).json({ message: "Please provide all the required fields" });
        }
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded._id;
        const order = await Order.create({
            userId,
            items,
            address,
            amount,
            paymentMethod: "stripe",
            payment: false,
            status: "order placed",
            date: Date.now()
        });

        const line_items = items.map((item)=>{
            return(
                {
                    price_data:{
                        currency,
                        product_data:{
                            name: item.name,
                        },
                        unit_amount: item.price * 100,
                    },
                    quantity: item.quantity,
                }
            )
        })

        line_items.push({
            price_data:{
                currency,
                product_data: {
                    name: "Shipping Cost"
                },
                unit_amount: shippingCost * 100,
            },
            quantity: 1,
  })

  const session = await stripe.checkout.sessions.create({
        success_url: `${origin}/verify?success=true&orderId=${order._id}`,
        cancel_url: `${origin}/verify?canceled=true&orderId=${order._id}`,
        mode: "payment",
        line_items
  })

  res.status(200).json({url: session.url})

  } catch (error) {
    console.log("stripe payment error", error);
    res.status(501).json({error: error})
  }
}

const verifyStripe = async (req, res) => {
  try {
    const { success, orderId } = req.body;
    console.log("success", success);
    console.log("orderId", orderId);

    if(success) {
       const orderData= await Order.findByIdAndUpdate(orderId, {payment:true})
        await User.findByIdAndUpdate(orderData.userId, {cartData: {}})
        return res.status(200).json({message: "payment successfull"})
    }
    
  } catch (error) {
    console.log("verification unsuccessfull", error);
        res.status(500).json({error: error})
  }
}

const razorpayPayment = async (req, res) => {
    try {
        const { items, address, amount } = req.body;
   
        if(!items || !address || !amount) {
            return res.status(400).json({ message: "Please provide all the required fields" });
        }
        const token = req.cookies.token;
        
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded._id;
        const newOrder = await Order.create({
            userId,
            items,
            address,
            amount,
            paymentMethod: "stripe",
            payment: false,
            status: "order placed",
            date: Date.now()
        });
        
        const options = {
            amount: amount*100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id,

        }
        
        await razorpayInstance.orders.create(options, (err, order)=>{
            if(err){
                console.log("razorpay error", err)
                return res.status(400).json({error: err})
            }
            res.status(200).json({order})
        })

    } catch (error) {
        console.log("razorpay error", error)
    }
}

const verifyRazorpay = async (req, res) => {
    try {
        const {razorpay_order_id, order, userId} = req.body
        const payment = await razorpayInstance.orders.fetch(razorpay_order_id)
        console.log("payment", payment)
        if(payment.status==="paid"){
            await Order.findByIdAndUpdate(order.receipt, {payment: true})
            await User.findByIdAndUpdate(userId, {cartData: {}})
            res.status(200).json({msg: "payment successfull"})
        }
        else{
            res.status(400).json({msg: "payment unsuccessfull"})
        }
    } catch (error) {
        console.log("razorpay verification error", error)
        res.status(500).json({error: error})
    }
}

const getAllOrders = async (req, res )=>{
    try {
        const orders =  await Order.find({})
        if(!orders) return res.status(400).json({msg: "No orders found"})
        res.status(200).json({orders})
    } catch (error) {
        console.log("get orders error", error)
        res.status(500).json({error: error})
    }
}

const getuserOrders = async (req, res)=>{
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded._id;
        const userOrders = await Order.find({userId: userId})
        if(!userOrders) return res.status(400).json({msg: "No orders found"})
            console.log("user orders", userOrders);
            
        res.status(200).json({userOrders})
    } catch (error) {
        console.log("get user orders error", error)
        res.status(500).json({error: error})
    }
}

const statusChange = async (req, res) => {
  try {
    const {orderId, status} = req.body;
    const order = await Order.findByIdAndUpdate(orderId, {status:status})
    res.status(200).json({msg: "status updated"})
  } catch (error) {
    console.log(error)
   res.status(401).json({msg: "Internel server error"}) 
  }
}


module.exports = {placeOrder, stripePayment,statusChange, verifyStripe,getuserOrders, getAllOrders, razorpayPayment, verifyRazorpay}