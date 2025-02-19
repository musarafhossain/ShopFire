import React from "react";

const LoadingSpinner = ({className}) => (
    <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
    </div>
);

export default LoadingSpinner;