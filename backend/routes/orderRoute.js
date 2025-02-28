import express from "express";
import {
  placeOrderCOD,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateOrderStatus,
  verifyStripe,
} from "../controllers/orderController.js";
import isAdminAuth from "../middleware/adminAuth.js";
import userAuth from "../middleware/auth.js";

const orderRouter = express.Router()

//For Admin Only
orderRouter.post("/list",isAdminAuth,allOrders)
orderRouter.post("/status",isAdminAuth,updateOrderStatus)

//Payment method
orderRouter.post("/placecod",userAuth,placeOrderCOD)
orderRouter.post("/stripe",userAuth,placeOrderStripe)
orderRouter.post("/razorpay",userAuth,placeOrderRazorpay)

//For User Only
orderRouter.post("/userorders",userAuth,userOrders)

//verify payment
orderRouter.post("/verifystripe",userAuth,verifyStripe)

export default orderRouter
