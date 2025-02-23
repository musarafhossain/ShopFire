import React from "react";
import { useTheme } from "@/context/ThemeContext";

const Loader = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`flex justify-center items-center h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
            <div className="relative w-16 h-16">
                <div className="absolute w-full h-full border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            </div>
        </div>
    );
};

export default Loader;
