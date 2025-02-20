import React from "react";
import { useTheme } from "../context/ThemeContext";

const LoadingSpinner = ({className}) => {
    const { isDarkMode } = useTheme(); 
    return (
    <div className={`flex items-center justify-center ${isDarkMode ? ' bg-gray-800 ': ' bg-gray-200 '} rounded-lg ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
    </div>
    )};

export default LoadingSpinner;