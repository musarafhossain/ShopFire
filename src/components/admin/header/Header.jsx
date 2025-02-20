//import react libraries
import React from 'react'

//import icons
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoMoonOutline } from "react-icons/io5";
import { FiSun } from "react-icons/fi";

//import theme context
import { useTheme } from '../../../context/ThemeContext';

const Header = ({ setIsSidebarOpen }) => {
    const { isDarkMode, toggleTheme } = useTheme();
    return (
        <header
            className={`[box-shadow:rgba(60,_64,_67,_0.3)_0px_1px_2px_0px,_rgba(60,_64,_67,_0.15)_0px_1px_3px_1px] fixed top-0 right-0 left-0 h-16 flex items-center px-4 z-40
                        ${isDarkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-white border-b border-gray-200'}`}
        >
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
            >
                <HiMiniBars3BottomRight className="h-6 w-6" />
            </button>

            <div className="flex-1" />

            <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg cursor-pointer`}
            >
                {isDarkMode ? (
                    <FiSun className="h-6 w-6" />
                ) : (
                    <IoMoonOutline className="h-6 w-6" />
                )}
            </button>
        </header>
    )
}

export default Header