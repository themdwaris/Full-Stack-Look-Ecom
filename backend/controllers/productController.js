import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

//add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (img) => img !== undefined
    );

    const imagesUrl = await Promise.all(
      images.map(async (img) => {
        let result = await cloudinary.uploader.upload(img.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestSeller: bestSeller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      images: imagesUrl,
      date: Date.now(),
    };
    const product = new productModel(productData);
    await product.save();

    res.json({ message: "Product added", success: true });
  } catch (error) {
    console.log("failed to add product:", error);
    res.json({ message: error.message, success: false });
  }
};

//get products
const getProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ products, success: true });
  } catch (error) {
    console.log("failed to get products:", error);
    res.json({ message: error.message, success: false });
  }
};

//get single product
const getSingleProduct = async (req, res) => {
    try {
        const {productId}=req.body
        const product = await productModel.findById(productId)
        res.json({product,success:true})
    } catch (error) {
        console.log("failed to get single product:",error);
        res.json({message:error.message,success:false})
        
    }
};

//remove product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({message:"Product deleted",success:true})
    } catch (error) {
        console.log("failed to delete:",error);
        res.json({message:error.message,success:false})
        
    }
};

export { addProduct, getProducts, getSingleProduct, removeProduct };
