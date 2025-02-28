import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { useShopContext } from "../context/ShopContext";
import axios from "axios";

const Orders = () => {
  const { currency, backendUrl, token, user } = useShopContext();
  const [orderData, setOrderData] = useState([]);

  const fetchOrderData = async () => {
    try {
      if (!token) return null;
      const res = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      if (res?.data?.success) {
        let allOrdersData = [];
        res.data.userOrders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["method"] = order.paymentMethod;
            item["date"] = order.date;
            item["fullname"] = `${order.address.fname} ${order.address.lname}`;
            item["email"] = `${order.address.email}`;
            allOrdersData.push(item);
          });
        });
        setOrderData(allOrdersData.reverse());
      }
    } catch (error) {
      console.log("failed to load order data:", error);
    }
  };
  // console.log(user);

  useEffect(() => {
    fetchOrderData();
  }, [token]);

  return (
    <div className="pt-8">
      <div className="text-2xl mb-4">
        <Heading text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        <p className="text-gray-600">Total orders: {orderData.length}</p>
        {!user ? null : (
          <p className="py-3 text-sm text-gray-600">
            {user?.fullname} &gt; {user?.email}
          </p>
        )}
        {orderData?.length > 0 &&
          orderData?.map((p, index) => (
            <div
              key={index}
              className="py-4 border-y grid grid-cols-1 sm:grid-cols-[4fr_2fr_0.5fr] text-gray-700 items-center gap-4"
            >
              <div className="flex items-center gap-4 sm:gap-6">
                <img
                  src={p?.images[0]}
                  alt="product-image"
                  className="w-16 sm:w-24 flex-shrink-0 self-start"
                />

                <div className="w-full">
                  <p className="break-words text-[13px] sm:text-lg font-medium mb-2 ">
                    {p?.name}
                  </p>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <span className="text-gray-700 ">
                        {currency}
                        {p?.price}
                      </span>
                      <span className="text-gray-700 ">
                        Quantity: {p.quantity}
                      </span>
                      <span className="text-gray-700">Size: {p.size}</span>
                    </div>
                    <p className="text-sm">
                      Date:{" "}
                      <span className="text-gray-500">
                        {new Date(p.date).toDateString()}
                      </span>
                    </p>
                    <p className="text-sm">
                      Payment: <span className="text-gray-500">{p.method}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center ">
                <p className="flex items-center gap-3">
                  <span className="min-w-2.5 h-2.5 rounded-full bg-green-400"></span>
                  <span>{p.status}</span>
                </p>
                <p
                  onClick={fetchOrderData}
                  className="px-3 py-2 border border-gray-300 text-sm cursor-pointer transition transform active:scale-75"
                >
                  Track order
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;
