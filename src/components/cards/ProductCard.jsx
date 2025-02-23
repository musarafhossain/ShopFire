import React from 'react';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import Rating from '../Rating';
import LazyImage from '../LazyImage';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import AddToCart from '@/components/buttons/AddToCart';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
    const { isDarkMode } = useTheme();
    const dispatch = useDispatch();

    // Get cart items from Redux
    const cartItems = useSelector(state => state.cart.items);

    // Check if product is in cart
    const cartItem = cartItems.find(item => item.id === product.id);

    return (
        <div className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group
        ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'}
        h-full`}>

            {/* Image Section */}
            <div className={`relative overflow-hidden rounded-b-3xl ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}>
                <div className="relative">
                    <LazyImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-gray-800/60' : 'from-black/30'} to-transparent`} />
                    {/* Favorite Button */}
                    <button className={`absolute cursor-pointer top-3 right-3 p-2 rounded-full shadow-md transition-colors
                     ${isDarkMode ? 'bg-white/80 hover:bg-white' : 'bg-white/80 hover:bg-white'}`}>
                        <FiHeart className="w-5 h-5 text-red-500" />
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col gap-2">
                <h2 className={`text-xl font-thin text-left truncate ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    {product.name}
                </h2>
                <div className="flex flex-col">
                    <div className="flex items-center justify-between gap-2">
                        <span className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                            Rs. {product.price}
                        </span>
                        <span className={`text-sm line-through ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Rs. {product.mrp}
                        </span>
                    </div>
                </div>

                {/* Rating and Discount */}
                <div className="flex flex-wrap justify-between items-center gap-2">
                    <Rating rating={product.rating} />
                    <span className="text-lg font-medium text-red-500">
                        {Math.round(100 - (product.price / product.mrp) * 100)}% OFF
                    </span>
                </div>

                {/* Category and Add to Cart */}
                <div className="flex flex-wrap justify-between items-center gap-2 pt-3 md:pt-4 border-t border-gray-200">
                    <div className="flex flex-col">
                        <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Category
                        </span>
                        <span className={`text-sm font-semibold truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            {product.category}
                        </span>
                    </div>

                    {/* If product is in cart, show quantity controls, else show Add button */}
                    {cartItem ? (
                        <AddToCart product={product} />
                    ) : (
                        <button
                            className={`flex items-center cursor-pointer gap-1.5 px-3 py-2 rounded-lg transition-all 
                            ${isDarkMode ? 'bg-gray-500 hover:bg-gray-400 text-white' : 'bg-gray-300 hover:bg-gray-100 text-black'}
                            hover:scale-105 hover:shadow-md`}
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault(); 
                                dispatch(addToCart(product));
                                toast.success(`${product.name} added to cart`, {
                                    position: "top-center",
                                    style: {
                                        background: isDarkMode ? "#4CAF50" : "#E6F4EA",
                                        color: isDarkMode ? "#fff" : "#333",
                                    },
                                });
                            }}
                        >
                            <FiShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="text-sm md:text-base">Add</span>
                        </button>

                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
