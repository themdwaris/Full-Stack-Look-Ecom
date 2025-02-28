import express from "express"
import userAuth from "../middleware/auth.js"
import { addToCart, getCart, updateCart } from "../controllers/cartController.js"

const cartRouter = express.Router()

cartRouter.post("/add",userAuth,addToCart)
cartRouter.post("/get",userAuth,getCart)
cartRouter.post("/update",userAuth,updateCart)

export default cartRouter