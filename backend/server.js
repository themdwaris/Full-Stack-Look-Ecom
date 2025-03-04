import express from "express";
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config
const app = express()
const port = process.env.PORT || 8000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
const corsOptions = {
    origin: 'https://lookbymd.vercel.app', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};
app.use(cors(corsOptions))

//api endpoints
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    console.log("hello backend");
    res.json({message:"hello from backend"})
    
})

app.listen(port,()=>{
    console.log("Server started");
})

