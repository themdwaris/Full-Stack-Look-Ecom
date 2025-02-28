import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { backendUrl } from "../App";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!token) return null;
    try {
      const res = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (res?.data?.success) {
        setOrders(res?.data?.allOrders);
      } else {
        toast.error("Failed to load orders");
      }
    } catch (error) {
      console.log("failed to fetch:", error);
      toast.error(error.message);
    }
  };
  // console.log(orders);

  const changeStatusHandler = async (e, orderId) => {
    try {
      const res = await axios.post(`${backendUrl}/api/order/status`, {
        orderId,
        status: e.target.value,
      },{headers:{token}});
      if (res.data.success) {
        await fetchOrders();
      }
    } catch (error) {
      toast.error(error.message)
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="w-full">
      <p className="pb-4 text-xl ">Total Orders {orders?.length}</p>
      {orders &&
        orders?.length > 0 &&
        orders?.map((order, index) => (
          <div
            key={index}
            className="p-5 md:p-8 grid grid-cols-[1fr] sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[.5fr_2fr_1.5fr_1fr] border text-sm place-items-start gap-2 mb-5"
          >
            <img src={assets.parcel_icon} alt="order-icon" className="w-14" />

            <div className="flex flex-col gap-1 mt-3">
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return (
                    <p key={index} className="text-sm">
                      {item.name} x {item.quantity} {item.size}
                    </p>
                  );
                } else {
                  return (
                    <p key={index} className="text-sm">
                      {item.name} x {item.quantity} {item.size},
                    </p>
                  );
                }
              })}

              <p className="mt-3 font-medium">
                {order.address.fname + " " + order.address.lname}
              </p>
              <p>{order.address.street},</p>
              <p>
                {`${order.address.city},${order.address.state},${order.address.country},${order.address.zipcode}`}{" "}
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-3">
              <div>
                <p className="font-medium mb-1 mt-3 md:mb-3 md:mt-0">
                  Items: {order.items.length}
                </p>
                <p>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(order.date).toDateString()}</p>
              </div>
              <p className="text-[16px]">
                &#x20B9;
                {order.amount}
              </p>
            </div>
            <div>
              <select
                
                value={order.status}
                onChange={(e)=>changeStatusHandler(e,order._id)}
                className="px-4 py-2 border border-gray-300 outline-blue-400 font-medium"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivey</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Orders;
