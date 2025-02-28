import React from "react";

const NewsletterBox = () => {
  return (
    <div className="px-4 pt-8 pb-14 w-full text-center ">
      <p className="py-2 text-xl font-medium sm:text-2xl">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-700 text-sm sm:text-base">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, nam?
      </p>
      <form onSubmit={(e)=>e.preventDefault()} className="w-full max-w-xl mx-auto flex items-center justify-center mt-6">
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="w-full p-3 outline-none border"
        />
        <button type="submit" className="p-3 px-5 bg-gradient-to-l from-cyan-400 to-blue-500 cursor-pointer transition transform active:scale-90 border border-blue-400 font-medium text-white ">
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
