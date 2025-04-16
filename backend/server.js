const express = require('express');
const dotenv = require("dotenv")
const cors = require("cors")
const {Server} = require("socket.io")
dotenv.config()
const app = express();
app.use(express.urlencoded({ extended: true }));
const cookieParser = require("cookie-parser")
const connectToDb = require("./db/db")
const userRouter = require("./routes/userRoute")
const sellerRouter = require("./routes/sellerRoute")
const productRouter = require("./routes/productRoute");
const cartRouter = require('./routes/cartRoute');
const orderRouter = require('./routes/orderRoute');

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
app.use("/cart", cartRouter)
app.use("/order", orderRouter)
const server = require("http").createServer(app)

const io = new Server(server,{
    cors: {
        origin: ['http://localhost:5173', 'http://localhost:5174'],
        credentials: true
    }
})

io.on("connection", (socket)=>{
    console.log("soket", socket.id);
    socket.on("chat", (payload)=>{
        console.log("payload", payload)
        io.emit("chat", payload)
    })
    
})



server.listen(3000, () => { console.log('Server is running on port 3000') });

