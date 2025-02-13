import React from 'react'
import { useTheme } from '../context/ThemeContext';

const Heading = ({ heading, subheading }) => {
    const { isDarkMode } = useTheme();
    return (
        <div className="max-w-7xl mx-auto px-4 mb-12">
            <h2 className={`text-3xl md:text-5xl font-extrabold text-center pb-2 md:pb-4 bg-gradient-to-r ${isDarkMode ? 'from-blue-400 to-indigo-500' : 'from-blue-600 to-indigo-700'} bg-clip-text text-transparent`}>
                {heading}
            </h2>
            <p className={`text-lg text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {subheading}
            </p>
        </div>
    )
}

export default Heading