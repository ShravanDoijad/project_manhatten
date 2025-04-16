const mongoose = require("mongoose");
 

const orderSchema= new mongoose.Schema({
    userId:{type:String,required:true},

    items:{type:Array,required:true},
    address: {type: Object, required:true},
    amount:{type:Number,required:true},
    status:{type:String,
            enum:["delivered","order placed","cancelled","return requested","returned"] 
        ,required:true, default:"order placed"},
    paymentMethod:{type:String ,required:true, default: "COD"},
    payment:{type:Boolean, required:true, default:false},
    date:{type:Date, default: Date.now()}
})

const Order = mongoose.model("Order",orderSchema);

module.exports = Order;