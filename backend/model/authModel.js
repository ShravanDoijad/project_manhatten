const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:[6, "Email must be at least 6 characters long"]
    }, 
    password:{type:String, required:true, minlength:[8,"Password must be atleast 8 characters long."] },
    cartData: ({type: Object, default: {}}),
})

const sellerSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:[6, "Email must be at least 6 characters long"]
    },
    password:{type:String, required:true, minlength:[8,"Password must be atleast 8 characters long."] },
})

const hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

userSchema.statics.hashPassword = hashPassword
sellerSchema.statics.hashPassword = hashPassword
    

 
const comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}
userSchema.methods.comparePassword=comparePassword
sellerSchema.methods.comparePassword=comparePassword

const generateAuthToken = async function() {
  return jwt.sign(
    {
        _id: this._id,
    },
    process.env.JWT_SECRET,
    {expiresIn: '24h'}

  )
}

userSchema.methods.generateAuthToken = generateAuthToken;
sellerSchema.methods.generateAuthToken = generateAuthToken;

const User = mongoose.model("user", userSchema);

const Seller = mongoose.model("seller", sellerSchema)
module.exports = {User, Seller}