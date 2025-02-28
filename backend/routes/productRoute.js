import express from "express"
import { addProduct, getProducts, getSingleProduct, removeProduct } from "../controllers/productController.js"
import upload from "../middleware/multer.js"
import isAdminAuth from "../middleware/adminAuth.js"

const productRouter = express.Router()

productRouter.post("/addproduct",isAdminAuth,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addProduct)
productRouter.get("/getproducts",getProducts)
productRouter.post("/getsingleproduct",getSingleProduct)
productRouter.post("/delete",isAdminAuth,removeProduct)

export default productRouter