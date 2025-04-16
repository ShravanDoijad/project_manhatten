const mongoose = require("mongoose");
const { User } = require("./authModel");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    images: { type: Array, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: null },
    sellerId:{ type: String, required: true},
    sellerName: {type: String, required: true},
    availabilityStatus: { type: Boolean, default: true },
    status:{
        type:String,
        enum:["pending" ,"approved", "rejected"],
        default:"pending"
    },
    shippingCost: { type: Number, default: 0 },
    returnPolicy: { type: String, default: "No returns" },
    avgRating: { type: Number, default: 0, min: 0, max: 5 },
    review: {
        type:Array,
        default:[] 
        

    },
    date:{type: Date, default: Date.now(), required:true}
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
