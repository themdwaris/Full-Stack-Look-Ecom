import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div>
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-[3fr,1fr,1fr] my-10 mt-28 text-base px-3">
        <div className="mb-5 sm:mb-0">
          <div className="flex gap-3 items-center mb-6">
            <img src={assets.look2} alt="logo" className="w-[50px]" />
            <p className="text-gray-800 font-medium">LOOK</p>
          </div>
          <p className="w-full md:w-2/3 text-gray-700">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam quisquam quia tenetur eveniet, eligendi impedit, velit libero voluptatem ducimus cumque aperiam dignissimos deserunt architecto excepturi autem aspernatur non odit nostrum.</p>
        </div>
        
        <div className="flex flex-col gap-1 mb-5 sm:mb-0">
          <h1 className="text-xl font-medium text-gray-800 mb-2">COMPANY</h1>
          <Link to={"/"}>Home</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/"}>Delivery</Link>
          <Link to={"/"}>Privacy & Policy</Link>
        </div>
        <div>
          <h1 className="text-xl font-medium text-gray-800 mb-4">
            GET IN TOUCH
          </h1>
          <p>91+ 1020202020</p>
          <p className="flex gap-2 text-2xl mt-2">
            <span className="transition transform active:scale-90 cursor-pointer hover:text-blue-600">
              <ion-icon name="logo-youtube"></ion-icon>
            </span>
            <span className="transition transform active:scale-90 cursor-pointer hover:text-blue-600">
              <ion-icon name="logo-linkedin"></ion-icon>
            </span>
            <span className="transition transform active:scale-90 cursor-pointer hover:text-blue-600">
              <ion-icon name="logo-twitter"></ion-icon>
            </span>
            <span className="transition transform active:scale-90 cursor-pointer hover:text-blue-600">
              <ion-icon name="logo-github"></ion-icon>
            </span>
          </p>
        </div>
      </div>
      <div className="border-t text-center text-sm font-medium py-8 text-gray-800">
        Copyright {year} @Look.com - All right reserved.
      </div>
    </div>
  );
};

export default Footer;
