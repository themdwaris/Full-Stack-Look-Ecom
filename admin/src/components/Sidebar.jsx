import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[16%] sm:w-[18%] h-screen sticky top-16 border-r">
      <div className="pt-6 flex flex-col items-end gap-4 text-[15px] pl-[15%]">
        <NavLink
          to="/add"
          className={"sm:w-3/4 flex items-center gap-3 py-2 px-3 border border-gray-300 border-r-0 rounded-l"
          }
        >
          <img
            src={assets.add_icon}
            alt="add-icon"
            className="w-5 h-5 shrink-0"
          />
          <span className="hidden md:block">Add item</span>
        </NavLink>
        <NavLink
          to="/list"
          className={ "sm:w-3/4 flex items-center gap-3 py-2 px-3 border border-gray-300 border-r-0 rounded-l"
          }
        >
          <img
            src={assets.order_icon}
            alt="add-icon"
            className="w-5 h-5 shrink-0"
          />
          <span className="hidden md:block">List item</span>
        </NavLink>
        <NavLink
          to="/orders"
          className={"sm:w-3/4 flex items-center gap-3 py-2 px-3 border border-gray-300 border-r-0 rounded-l"
          }
        >
          <img
            src={assets.order_icon}
            alt="add-icon"
            className="w-5 h-5 shrink-0"
          />
          <span className="hidden md:block overflow-hidden">Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
