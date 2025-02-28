import React from "react";
import {Link} from "react-router-dom"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-300">
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10  sm:py-0">
        <div className="text-[#414141]">
          <div className="flex gap-3 items-center">
            <p className="w-11 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLER</p>
          </div>
          <h1 className="text-4xl sm:py-3 lg:text-6xl py-1 leading-relaxed prata-regular">
            Latest Arrivals
          </h1>
          <div className="flex gap-3 items-center">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-11 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500"></p>
          </div>
        </div>
      </div>
      <div className="relative w-full sm:w-1/2">
        
        <Carousel
          showThumbs={false}
          showArrows={false}
          autoPlay={true}
          infiniteLoop={true}
          showIndicators={false}
          showStatus={false}
          
        >
          <div>
            <img src={assets.heroBanner} className="w-full object-cover" />
            <Link to="/collection" className="px-5 sm:px-8 text-xs py-2 sm:py-3 bg-white text-black font-medium cursor-pointer absolute left-0 bottom-0 sm:bottom-10 z-40">SHOW NOW</Link>
          </div>
          <div>
            <img src={assets.model1} className="w-full object-cover" />
            <Link to="/collection" className="px-5 sm:px-8 text-xs py-2 sm:py-3 bg-white text-black font-medium cursor-pointer absolute left-0 bottom-0 sm:bottom-10 z-40">SHOW NOW</Link>
          </div>
          <div>
            <img src={assets.model2} className="w-full object-cover" />
            <Link to="/collection" className="px-5 sm:px-8 text-xs py-2 sm:py-3 bg-white text-black font-medium cursor-pointer absolute left-0 bottom-0 sm:bottom-10 z-40">SHOW NOW</Link>
          </div>
          <div>
            <img src={assets.model3} className="w-full object-cover" />
            <Link to="/collection" className="px-5 sm:px-8 text-xs py-2 sm:py-3 bg-white text-black font-medium cursor-pointer absolute left-0 bottom-0 sm:bottom-10 z-40">SHOW NOW</Link>
          </div>
          <div>
            <img src={assets.model4} className="w-full object-cover" />
            <Link to="/collection" className="px-5 sm:px-8 text-xs py-2 sm:py-3 bg-white text-black font-medium cursor-pointer absolute left-0 bottom-0 sm:bottom-10 z-40">SHOW NOW</Link>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Hero;
