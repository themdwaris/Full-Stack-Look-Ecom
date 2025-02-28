import React from "react";
import { assets } from "../assets/assets";
import Heading from "./Heading";

const OurPolicy = () => {
  return (
    <div>
      <div className="text-center py-8 text-3xl">
        <Heading text1={"OUR"} text2={"POLICY"} />
        <p className="text-gray-500 text-base">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis
          cumque consequuntur doloribus.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-around text-center py-10 text-base gap-12 sm:gap-3">
        <div className="border px-6 py-5 cursor-pointer transition ease-in-out hover:scale-110">
          <img
            src={assets.exchange_icon}
            alt="policy-icon"
            className="w-12 m-auto mb-5"
          />
          <p className="font-medium text-xl">Easy exchange policy</p>
          <p className="text-gray-700 text-sm">We offer hassle exchange policy</p>
        </div>
        <div className="border px-6 py-5 cursor-pointer transition ease-in-out hover:scale-110">
          <img
            src={assets.quality_icon}
            alt="policy-icon"
            className="w-12 m-auto mb-5"
          />
          <p className="font-medium text-xl">7 Days return policy</p>
          <p className="text-gray-700 text-sm">We provide 7 days return policy</p>
        </div>
        <div className="border px-6 py-5 cursor-pointer transition ease-in-out hover:scale-110">
          <img
            src={assets.support_img}
            alt="policy-icon"
            className="w-12 m-auto mb-5"
          />
          <p className="font-medium text-xl">Best customer support</p>
          <p className="text-gray-700 text-sm">We offer 24/7 customer support</p>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
