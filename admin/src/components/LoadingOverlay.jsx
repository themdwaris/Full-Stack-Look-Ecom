import React from "react";

const LoadingOverlay = ({ children }) => {
  return (
    <div className="w-full fixed inset-0 flex justify-center items-center min-h-[100vh] backdrop-blur-sm z-50">
      {children}
    </div>
  );
};

export default LoadingOverlay;
