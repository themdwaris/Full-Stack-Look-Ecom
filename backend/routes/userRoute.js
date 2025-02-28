import express from "express"
import { adminLogin, userLogin, userRegister } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/login",userLogin)
userRouter.post("/register",userRegister)
userRouter.post("/admin",adminLogin)

export default userRouter