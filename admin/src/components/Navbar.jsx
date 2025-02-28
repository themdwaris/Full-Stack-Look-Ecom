import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({setToken}) => {
  return (
    <div className="w-full py-3 px-5 sm:px-20 flex items-center justify-between border-b bg-white sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <img src={assets.look2} alt="logo" className="w-[40px]" />
        <span className="text-[16px] font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Admin Panel</span>
      </div>
      <button className="py-2 px-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-sm font-medium cursor-pointer text-white transition transform active:scale-90" onClick={()=>setToken("")}>Logout</button>
    </div>
  );
};

export default Navbar;
