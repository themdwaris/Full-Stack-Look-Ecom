import React from "react";

const Heading = ({ text1, text2 }) => {
  return (
    <div className="inline-flex items-center mb-3 gap-2">
      <p className="text-gray-500">
        {text1} <span className="text-gray-700 font-medium">{text2}</span>
      </p>
      <p className="w-8 h-[1px] sm:w-12 sm:h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500"></p>
    </div>
  );
};

export default Heading;
