const express = require('express');
const dotenv = require("dotenv")
dotenv.config()
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const cookieParser = require("cookie-parser")
const connectToDb = require("./db/db")
const userRouter = require("./routes/userRoute")
const sellerRouter = require("./routes/sellerRoute")
const productRouter = require("./routes/productRoute")

app.use(cookieParser())
connectToDb()

app.use("/api", userRouter, sellerRouter)
app.use("/products", productRouter)

app.listen(3000, () => { console.log('Server is running on port http://localhost:3000') });

