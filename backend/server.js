const express = require('express');
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()
const app = express();
app.use(express.urlencoded({ extended: true }));
const cookieParser = require("cookie-parser")
const connectToDb = require("./db/db")
const userRouter = require("./routes/userRoute")
const sellerRouter = require("./routes/sellerRoute")
const productRouter = require("./routes/productRoute")

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials:true
}
    
))
app.use(express.json())
app.use(cookieParser())

connectToDb()

app.use("/api", userRouter, sellerRouter)
app.use("/products", productRouter)

app.listen(3000, () => { console.log('Server is running on port http://localhost:3000') });

