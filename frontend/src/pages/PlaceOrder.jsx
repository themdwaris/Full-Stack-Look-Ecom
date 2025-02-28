import React, { useState } from "react";
import Heading from "../components/Heading";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    cartItems,
    setCartItems,
    getTotalPrice,
    delivery_fee,
    products,
    token,
  } = useShopContext();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHanlder = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            let productInfo = structuredClone(
              products.find((p) => p._id === items)
            );
            if (productInfo) {
              productInfo.size = item;
              productInfo.quantity = cartItems[items][item];
              orderItems.push(productInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getTotalPrice() + delivery_fee,
      };

      switch (paymentMethod) {
        case "cod":
          const res = await axios.post(
            `${backendUrl}/api/order/placecod`,
            orderData,
            { headers: { token } }
          );
          if (res.data.success) {
            navigate("/orders");
            setCartItems({});
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
          break;

        case "stripe":
          const stripeRes = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderData,
            { headers: { token } }
          );
          if (stripeRes?.data?.success) {
            const { session_url } = stripeRes?.data;
            setCartItems({})
            window.location.replace(session_url)
          } else {
            toast.error(stripeRes.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log("failed to place order:", error);
      // toast.error(error.message);
    }
  };

  return (
    <div className="w-full pt-10 sm:pt-24">
      <div className="text-xl sm:text-2xl py-3">
        <Heading text1={"DELIVERY"} text2={"INFORMATION"} />
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] gap-10">
        <form
          onSubmit={onSubmitHandler}
          className="w-full flex flex-col gap-4 max-w-[480px]"
        >
          <div className="flex gap-4">
            <input
              type="text"
              name="fname"
              value={formData.fname}
              onChange={onChangeHanlder}
              placeholder="First name"
              required
              className="w-full  py-2 px-3.5 rounded-md  outline-blue-400 border border-gray-300"
            />
            <input
              type="text"
              name="lname"
              value={formData.lname}
              onChange={onChangeHanlder}
              placeholder="Last name"
              required
              className="w-full py-2 px-3.5 rounded-md font-normal outline-blue-400 border border-gray-300"
            />
          </div>
          <div className=" flex flex-col gap-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChangeHanlder}
              placeholder="Email"
              required
              className="w-full py-2 px-3.5 rounded-md font-normal outline-blue-400 border border-gray-300"
            />
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={onChangeHanlder}
              placeholder="Street"
              className="w-full py-2 px-3.5 rounded-md font-normal outline-blue-400 border border-gray-300"
            />
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onChangeHanlder}
              placeholder="City"
              required
              className="w-full py-2 px-3.5 rounded-md  outline-blue-400 border border-gray-300"
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={onChangeHanlder}
              placeholder="State"
              required
              className="w-full py-2 px-3.5 rounded-md font-normal outline-blue-400 border border-gray-300"
            />
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              name="zipcode"
              value={formData.zipcode}
              onChange={onChangeHanlder}
              placeholder="Zipcode"
              required
              className="w-full py-2 px-3.5 rounded-md  outline-blue-400 border border-gray-300"
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={onChangeHanlder}
              placeholder="Country"
              required
              className="w-full py-2 px-3.5 rounded-md font-normal outline-blue-400 border border-gray-300"
            />
          </div>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={onChangeHanlder}
            placeholder="Phone"
            required
            className="w-full py-2 px-3.5 rounded-md outline-blue-400 border border-gray-300"
          />
        </form>
        <div className="my-5 w-full flex flex-col justify-end">
          <div className="w-full sm:w-[450px]">
            <div className="text-2xl">
              <Heading text1={"CART"} text2={"TOTALS"} />
            </div>
            <CartTotal />
            <div className="mt-12">
              <Heading text1={"PAYMENT"} text2={"METHOD"} />
              {/* PAYMET METHOD SELECTION */}
              <div className="flex flex-col gap-3 lg:flex-row">
                <div
                  className="flex items-center cursor-pointer px-3 p-3 border"
                  onClick={() => setPaymentMethod("stripe")}
                >
                  <p
                    className={`min-w-3.5 h-3.5 border rounded-full ${
                      paymentMethod === "stripe" ? "bg-green-400" : ""
                    }`}
                  ></p>
                  <img
                    className="h-5 sm:h-4 mx-4"
                    src={assets.stripe_logo}
                    alt="stripe-logo"
                  />
                </div>
                <div
                  className="flex items-center cursor-pointer px-3 p-3 border"
                  onClick={() => setPaymentMethod("razorpay")}
                >
                  <p
                    className={`min-w-3.5 h-3.5 border rounded-full ${
                      paymentMethod === "razorpay" ? "bg-green-400" : ""
                    }`}
                  ></p>
                  <img
                    className="h-5 sm:h-4 mx-4"
                    src={assets.razorpay_logo}
                    alt="stripe-logo"
                  />
                </div>
                <div
                  className="flex items-center cursor-pointer px-3 p-3 border gap-4 "
                  onClick={() => setPaymentMethod("cod")}
                >
                  <p
                    className={`min-w-3.5 h-3.5 border rounded-full ${
                      paymentMethod === "cod" ? "bg-green-400" : ""
                    }`}
                  ></p>
                  <span className="text-sm sm:text-xs font-medium text-gray-500">
                    CASH ON DELIVERY
                  </span>
                </div>
              </div>
            </div>
            <div className="text-end pt-5">
              <button
                type="submit"
                onClick={onSubmitHandler}
                className="py-3 px-4 sm:px-5 bg-black text-white text-sm cursor-pointer transition transform active:scale-90"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
