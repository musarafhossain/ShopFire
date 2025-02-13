import React from 'react'
import { CiStar } from "react-icons/ci";
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const ProductCard = ({product}) => {
    const { isDarkMode } = useTheme();
        const isFavorite = true;
    return (
        <div className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group
        ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'}
        h-full`}>
            {/* Image Section */}
            <div className={`relative overflow-hidden rounded-b-3xl ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}>
                <div className="relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-gray-800/60' : 'from-black/30'} to-transparent`} />

                    {/* Product Name */}
                    <div className={`absolute bottom-4 left-4 right-4 backdrop-blur-sm p-3 rounded-lg 
                    ${isDarkMode ? 'bg-gray-700/60' : 'bg-white/20'}`}>
                        <h2 className={`text-lg font-bold truncate ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                            {product.name}
                        </h2>
                    </div>

                    {/* Favorite Button */}
                    <button className={`absolute cursor-pointer top-3 right-3 p-2 rounded-full shadow-md transition-colors
                     ${isDarkMode ? 'bg-gray-600/80 hover:bg-gray-500' : 'bg-white/80 hover:bg-white'}`}>
                        <FiHeart className={`w-5 h-5 ${isFavorite ? 'text-red-500' : isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col gap-2">
                <div className="flex flex-col">
                    <div className="flex items-center justify-between gap-2">
                        <span className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                            Rs. {product.price}
                        </span>
                        <span className={`text-sm line-through ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Rs. {product.originalPrice}
                        </span>
                    </div>
                </div>

                {/* Rating and Discount */}
                <div className="flex flex-wrap justify-between items-center gap-2">
                    <div className="flex items-center gap-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <CiStar key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                        ))}
                        <span className={`ml-1 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {product.rating}
                        </span>
                    </div>
                    <span className="text-lg font-medium text-red-500">
                        {100 - parseInt((product.price / product.originalPrice) * 100)}% OFF
                    </span>
                </div>

                {/* Category and Add to Cart */}
                <div className="flex flex-wrap justify-between items-center gap-2 pt-3 md:pt-4 border-t 
             border-gray-200">
                    <div className="flex flex-col">
                        <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Category
                        </span>
                        <span className={`text-sm font-semibold truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            {product.category}
                        </span>
                    </div>

                    <button className={`flex items-center cursor-pointer gap-1.5 px-3 py-2 rounded-lg transition-all 
                   ${isDarkMode
                            ? 'bg-gray-500 hover:bg-gray-400 text-white'
                            : 'bg-gray-300 hover:bg-gray-100 text-black'}
                   hover:scale-105 hover:shadow-md`}>
                        <FiShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-sm md:text-base">Add</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard