import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useShopContext } from "../context/ShopContext";

const Navbar = () => {
  const {setSearch,calculateTotalQuantity,navigate,token,setToken,setCartItems,setUser}=useShopContext()

  const [mobileMenu, setMobileMenu] = useState(false);

    const logout = ()=>{
      navigate("/login")
      setToken('')
      setCartItems({})
      setUser({})
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      
    }

    useEffect(()=>{
      localStorage.setItem('token',token)
      calculateTotalQuantity()
    },[token])

  return (
    <div className="w-full py-3 sm:py-4 flex justify-between bg-white items-center border-b sticky top-0 z-50">
      <Link to={"/"}>
        <img src={assets.look2} alt="logo" className="w-[40px]" />
      </Link>
      <div className="hidden sm:flex items-center gap-6 font-medium text-gray-700 text-[15px]">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "bg-gradient-to-l from-cyan-400 to-blue-500 bg-clip-text text-transparent" : "")}
        >
          HOME
        </NavLink>
        <NavLink
          to="/collection"
          className={({ isActive }) => (isActive ? "bg-gradient-to-l from-cyan-400 to-blue-500 bg-clip-text text-transparent" : "")}
        >
          COLLECTION
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "bg-gradient-to-l from-cyan-400 to-blue-500 bg-clip-text text-transparent" : "")}
        >
          ABOUT
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "bg-gradient-to-l from-cyan-400 to-blue-500 bg-clip-text text-transparent" : "")}
        >
          CONTACT
        </NavLink>
      </div>
      <div className="flex items-center gap-5">
        <Link to={"/collection"} onClick={() => setSearch(true)}>
          <img
            src={assets.search_icon}
            alt="search-icon"
            className="w-5 cursor-pointer transition transform active:scale-75"
          />
        </Link>
        <div className="group relative">
          <img
            src={token!==""&&token.length>0?assets.user:assets.profile_icon}
            alt="user-avatar"
            className={`${token!==""&&token.length>0?"w-6":"w-5"} cursor-pointer transition transform active:scale-75`}
            onClick={()=>{
              if(token!==""&&token.length>0){
                return null;
              }
              if(token===""&&token.length===0){
                navigate("/login")
              }
            }}
          />
          {token&&<div className={`group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-30"`}>
            <div className="flex flex-col gap-2 w-36 bg-slate-100 text-gray-600 py-3 px-6">
              <span className="cursor-pointer hover:underline hover:text-gray-900">My profile</span>
              <span className="cursor-pointer hover:underline hover:text-gray-900" onClick={()=>navigate("/orders")}>Orders</span>
              <span className="cursor-pointer hover:underline hover:text-gray-900" onClick={logout}>Logout</span>
            </div>
          </div>}
        </div>
        <Link
          to="/cart"
          className="relative transition transform active:scale-75"
        >
          <img
            src={assets.cart_icon}
            alt="cart-icon"
            className="w-5 min-w-5 cursor-pointer "
          />
         {calculateTotalQuantity()>0&& <span
            className="w-4 h-4 rounded-full text-white absolute top-3 -right-2 bottom-0 text-[10px] font-medium flex items-center justify-center p-[1px] bg-gradient-to-r from-cyan-400 to-blue-500"
            
          >
            {calculateTotalQuantity()}
          </span>}
        </Link>
        <img
          src={assets.menu_icon}
          alt="menu-bar"
          className="w-5 cursor-pointer transition transform active:scale-75 sm:hidden"
          onClick={() => setMobileMenu(true)}
        />
      </div>

      {/* *******side-bar menu for mobile devices*********** */}
      <div
        className={`fixed bottom-0 right-0 left-0 top-0 overflow-hidden bg-white transition-all ${
          mobileMenu ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600 font-semibold">
          <div
            className="flex items-center gap-3 p-3"
            onClick={() => setMobileMenu(false)}
          >
            <img
              src={assets.dropdown_icon}
              alt="back-icon"
              className="w-2 rotate-180"
            />
            <p>Back</p>
          </div>

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "w-full border-b py-2 px-5 bg-black text-white"
                : "w-full border-b py-2 px-5"
            }
            onClick={() => setMobileMenu(false)}
          >
            HOME
          </NavLink>
          <NavLink
            to="/collection"
            className={({ isActive }) =>
              isActive
                ? "w-full border-b py-2 px-5 bg-black text-white"
                : "w-full border-b py-2 px-5"
            }
            onClick={() => setMobileMenu(false)}
          >
            COLLECTION
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "w-full border-b py-2 px-5 bg-black text-white"
                : "w-full border-b py-2 px-5"
            }
            onClick={() => setMobileMenu(false)}
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "w-full border-b py-2 px-5 bg-black text-white"
                : "w-full border-b py-2 px-5"
            }
            onClick={() => setMobileMenu(false)}
          >
            CONTACT
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive
                ? "w-full border-b py-2 px-5 bg-black text-white"
                : "w-full border-b py-2 px-5"
            }
            onClick={() => setMobileMenu(false)}
          >
            ADMIN PANEL
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
