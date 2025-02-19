import React from 'react'
import { BsStar, BsStarFill } from "react-icons/bs";
import { useTheme } from '../context/ThemeContext';

const Rating = ({ rating = 0 }) => {
    const { isDarkMode } = useTheme();
    // Star rating logic
    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => {
            const fill = rating - index;
            let fillPercentage = 0;

            if (fill >= 1) {
                fillPercentage = 100;
            } else if (fill > 0) {
                fillPercentage = fill * 100;
            }

            return (
                <div key={index} className="relative w-4 h-4 md:w-5 md:h-5">
                    {/* Outline star */}
                    <BsStar
                        className={`absolute top-0 left-0 w-full h-full ${isDarkMode ? 'text-gray-400' : 'text-gray-300'
                            }`}
                    />

                    {/* Filled portion */}
                    <div
                        className="absolute top-0 left-0 h-full overflow-hidden"
                        style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}
                    >
                        <BsStarFill className="w-full h-full text-yellow-400" />
                    </div>
                </div>

            );
        });
    };
    return (
        <div className="flex items-center gap-1">
            {renderStars(rating)}
            <span className={`ml-1 text-md ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {rating.toFixed(1)}
            </span>
        </div>
    )
}

export default Rating