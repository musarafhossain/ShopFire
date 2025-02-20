import React from 'react'
import { IoMoonOutline } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import { useTheme } from '../../context/ThemeContext';

const ThemeToggleButton = ({className}) => {
    const { isDarkMode, toggleTheme } = useTheme();
    return (
        <button type='button' onClick={toggleTheme} className={`${className} cursor-pointer`}>
            {isDarkMode ? <FiSun size={25} /> : <IoMoonOutline size={25} />}
        </button>
    )
}

export default ThemeToggleButton