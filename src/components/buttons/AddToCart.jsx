import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../context/ThemeContext';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { increaseQuantity, decreaseQuantity, removeFromCart } from '@/redux/cartSlice';

const AddToCart = ({ product }) => {
    const { isDarkMode } = useTheme();
    const dispatch = useDispatch();
    const cartItem = useSelector(state => state.cart.items.find(item => item.id === product.id));

    if (!cartItem) return null;

    return (
        <div className="flex items-center space-x-4">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (cartItem.quantity > 1) {
                        dispatch(decreaseQuantity(product.id));
                    } else {
                        dispatch(removeFromCart(product.id));
                    }
                }}
                className={`w-8 h-8 text-2xl flex justify-center items-center ${isDarkMode ? 'text-gray-200 bg-gray-700 hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} rounded-full cursor-pointer `}
            >
                <FaMinus size={15} />
            </button>

            <span className="text-lg font-medium">{cartItem.quantity}</span>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    dispatch(increaseQuantity(product.id))
                }}
                className={`w-8 h-8 text-2xl flex justify-center items-center ${isDarkMode ? 'text-gray-200 bg-gray-700 hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} rounded-full cursor-pointer `}
            >
                <FaPlus size={15} />
            </button>
        </div>
    );
};

export default AddToCart;
