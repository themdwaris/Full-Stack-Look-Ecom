import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const currency = "inr";
const delivery_fee = 10;
//Stripe initilize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing order using COD
const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ message: "Order Placed", success: true });
  } catch (error) {
    console.log("Failed to order place:", error);
    res.json({ message: error.message, success: false });
  }
};
// Placing order using Stripe
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery charges",
        },
        unit_amount: delivery_fee * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ session_url: session.url, success: true });
  } catch (error) {
    console.log("Failed to process payment:", error);
    res.json({ success: false, message: "Payment processing failed." });
  }
};

// verify stripe payment
const verifyStripe = async (req, res) => {
  try {
    const { orderId, userId, success } = req.body;
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log("Failed to process payment:", error);
    res.json({ success: false, message: "Payment processing failed." });
  }
};
// Placing order using Razorpay
const placeOrderRazorpay = async (req, res) => {};

//All orders data for admin panel
const allOrders = async (req, res) => {
  try {
    const allOrders = await orderModel.find({});
    res.json({ allOrders, success: true });
  } catch (error) {
    console.log("failed to load all orders data:", error);
  }
};

//User orders data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const userOrders = await orderModel.find({ userId });
    res.json({ userOrders, success: true });
  } catch (error) {
    console.log("failed to fetch user order data:", error);
  }
};

//Update order status from admin panel
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ message: "Status updated", success: true });
  } catch (error) {
    console.log("failed to update status:", error);
    res.json({ message: error.message, success: false });
  }
};

export {
  placeOrderCOD,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateOrderStatus,
  verifyStripe
};
