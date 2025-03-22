const express = require('express');
const dotenv = require("dotenv")
dotenv.config()
const app = express();
app.use(express.json())
const cookieParser = require("cookie-parser")
const connectToDb = require("./db/db")
const userRouter = require("./routes/userRoute")
const sellerRouter = require("./routes/sellerRoute")
app.use(cookieParser())
connectToDb()

app.use("/api", userRouter, sellerRouter)

app.listen(3000, () => { console.log('Server is running on port http://localhost:3000') });

