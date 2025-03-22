const mongoose  = require('mongoose')

const connectToDb = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Connection Error:", err.message));
    

  } catch (error) {
   
    
    console.log("mongodb is not connected");
    
  }
}


module.exports = connectToDb

