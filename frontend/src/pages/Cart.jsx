import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { assets } from "../assets/assets";
import { useShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    getTotalPrice,
    navigate,
  } = useShopContext();

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [products, cartItems]);

  return (
    <div className="">
      <div className="pt-14 mb-3 text-2xl">
        <Heading text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartData?.map((item, index) => {
          const product = products?.find((p) => p._id === item._id);
          return (
            <div
              key={index}
              className="py-4 border-y grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] text-gray-700 items-center gap-4"
            >
              <div className="flex items-center gap-4 sm:gap-6">
                <Link to={`/product/${item._id}`}>
                  <img
                    src={product?.images[0]}
                    alt="product-image"
                    className="w-14 flex-shrink-0 self-start"
                  />
                </Link>
                <div className="w-full max-w-[180px] sm:max-w-full">
                  <p className="break-words text-[13px] sm:text-lg font-medium mb-4 ">
                    {product?.name}
                  </p>
                  <p>
                    <span className="text-gray-700 mr-4 font-medium">
                      {currency}
                      {product?.price}
                    </span>
                    <span className="px-2 sm:px-3 py-1 border bg-slate-50">
                      {item?.size}
                    </span>
                  </p>
                </div>
              </div>
              <div className="">
                <input
                  type="number"
                  className="max-w-10 sm:max-w-20 border outline-blue-400 bg-slate-50 px-1 sm:px-3 py-1 "
                  min={1}
                  defaultValue={item?.quantity}
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === 0
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                />
              </div>
              <div className="">
                <img
                  src={assets.bin_icon}
                  alt="delete"
                  className="w-5 cursor-pointer transition transform active:scale-90"
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="my-16 w-full flex justify-end">
        <div className="w-full sm:w-[450px]">
          <div className="text-2xl">
            <Heading text1={"CART"} text2={"TOTALS"} />
          </div>
          <CartTotal />
          <div className="text-end pt-5">
            <button
              onClick={() => {
                if (getTotalPrice() > 0) {
                  navigate("/place-order");
                } else return;
              }}
              className="py-3 px-4 sm:px-5 bg-black text-white text-sm cursor-pointer transition transform active:scale-90"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
