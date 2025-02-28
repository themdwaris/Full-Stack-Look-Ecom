import userModel from "../models/userModel.js";

// add to cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ message: "Added to cart", success: true });
  } catch (error) {
    console.log("Failed to add to cart:", error);
    res.json({ message: error.message, success: false });
  }
};

// get from cart
const getCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData=await userData.cartData
    res.json({cartData,success:true})
  } catch (error) {
    console.log("Failed to get cart data:", error);
    res.json({ message: error.message, success: false });
  }
};

// update to cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ message: "Updated cart", success: true });
  } catch (error) {
    console.log("Failed to update cart quantity:", error);
    res.json({ message: error.message, success: false });
  }
};

export { addToCart, getCart, updateCart };
