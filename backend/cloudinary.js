const  cloudinary=  require('cloudinary')
const dotenv = require("dotenv")
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
})

module.exports = cloudinary
