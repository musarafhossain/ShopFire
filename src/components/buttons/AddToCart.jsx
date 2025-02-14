import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaPlus, FaMinus } from "react-icons/fa6";

const AddToCart = ({ className }) => {
    const { isDarkMode } = useTheme();
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    return (
        <div className={`flex items-center space-x-4 ${className}`}>
            <button
                onClick={decrementQuantity}
                className={`w-8 h-8 text-2xl flex justify-center items-center ${isDarkMode ? 'text-gray-200 bg-gray-700' : 'bg-gray-200 text-gray-700'} rounded-full cursor-pointer hover:bg-gray-300`}
            >
                <FaMinus size={15} />
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
                onClick={incrementQuantity}
                className={`w-8 h-8 text-2xl flex justify-center items-center ${isDarkMode ? 'text-gray-200 bg-gray-700' : 'bg-gray-200 text-gray-700'} rounded-full cursor-pointer hover:bg-gray-300`}
            >
                <FaPlus size={15} />
            </button>
        </div>
    );
};

export default AddToCart;
