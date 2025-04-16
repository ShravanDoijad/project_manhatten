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

const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.ADMINPANEL_URL
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


app.options('*', cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

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
        origin: [`${frontendUrl}`],
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

