import React, { useEffect } from "react";
import { useShopContext } from "../context/ShopContext";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Heading from "../components/Heading";

const Verify = () => {
  const { token, backendUrl, setCartItems, navigate } = useShopContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyStripePayment = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/order/verifystripe`,
        { orderId, success },
        { headers: { token } }
      );
      if (res.data.success) {
        setCartItems({});
        navigate("/orders");
        toast.success("Payment successful");
      } else {
        navigate("/cart");
        toast.error("Payment failed try again");
      }
    } catch (error) {
      console.log("Payment failed:", error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    verifyStripePayment();
  }, [token]);

  return (
    <div className="w-full text-center py-10 pt-24 text-4xl">
      <Heading text1={"Payment"} text2={"Verification Page"} />
    </div>
  );
};

export default Verify;
