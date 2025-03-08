import React, { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import LazyImage from "../LazyImage";
import { useAuth } from "@/auth/AuthContext";
import Rating from "../Rating";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

const WishlistProductCard = ({ product }) => {
    const { isDarkMode } = useTheme();
    const { user, updateUser } = useAuth();
    const [wishlistLoading, setWishlistLoading] = useState(false);

    const handleRemoveFromWishlist = async () => {
        if (!user) {
            toast.error("You need to log in to manage your wishlist.");
            return;
        }
        setWishlistLoading(true);
        try {
            const updatedWishlist = user.wishlist.filter((id) => id !== product.id);
            const res = await updateUser({ wishlist: updatedWishlist });

            if (res.success) {
                toast.success("Item removed from wishlist.");
            } else {
                toast.error("Failed to update wishlist.");
            }
        } catch (error) {
            console.error("Error removing from wishlist:", error);
            toast.error("Failed to remove item.");
        } finally {
            setWishlistLoading(false);
        }
    };

    return (
        <div
            className={` w-full items-center h-fit rounded-xl overflow-hidden transition-all 
                flex flex-row md:flex-col 
                aspect-auto md:aspect-[3/4] border
                ${isDarkMode ? "  border-[#2f2f2f]" : " border-[#dcdada] "} 
                hover:shadow-xl`}
        >
            {/* Image Section */}
            <div className="relative max-h-30 md:max-h-full min-w-[35%] sm:w-40 md:w-full sm:h-auto overflow-hidden md:rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none md:rounded-xl">
                <LazyImage
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? "from-gray-800/60" : "from-black/30"} to-transparent`} />

                {/* Remove from Wishlist Button */}
                <button
                    className="absolute top-2 left-2 cursor-pointer bg-red-500/50 p-2 rounded-full text-white shadow-md hover:bg-red-600 transition-all"
                    onClick={handleRemoveFromWishlist}
                >
                    {wishlistLoading ? (
                        <ImSpinner2 className="w-5 h-5 text-white animate-spin" />
                    ) : (
                        <FiTrash className="w-4 h-4" />
                    )}
                </button>
            </div>

            {/* Product Details */}
            <div className="px-4 py-1 md:py-4 flex flex-col min-w-[65%] md:w-full justify-between">
                {/* Product Name */}
                <h2 className={`text-md font-thin truncate ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>
                    {product.name}
                </h2>

                {/* Pricing */}
                <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-500">Rs. {product.price}</span>
                    <span className="text-sm line-through text-gray-500">Rs. {product.mrp}</span>
                </div>

                {/* Rating & Discount */}
                <div className="flex items-center justify-between flex-wrap">
                    <Rating rating={product.rating} />
                    <span className="text-sm font-medium text-red-500 hidden md:block">
                        {Math.round(100 - (product.price / product.mrp) * 100)}% OFF
                    </span>
                </div>

                {/* Category */}
                <div className="mt-1 flex gap-2 items-baseline">
                    <span className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Category:
                    </span>
                    <span className={`text-xs font-semibold truncate ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                        {product.category}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default WishlistProductCard;
