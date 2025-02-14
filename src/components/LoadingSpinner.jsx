import React from "react";

const LoadingSpinner = () => (
    <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
    </div>
);

export default LoadingSpinner;