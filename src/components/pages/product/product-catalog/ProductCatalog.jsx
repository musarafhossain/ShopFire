import React, { useState, useEffect } from 'react'
import LazyImage from '../../../LazyImage'
import { FaAnglesRight } from "react-icons/fa6";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import { useTheme } from '../../../../context/ThemeContext';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/features/cart/cartSlice';
import AddToCart from '@/components/buttons/AddToCart';
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";
import { useAuth } from "@/auth/AuthContext";

const ProductCatalog = ({ product }) => {
    const { isDarkMode } = useTheme();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const cartItem = cartItems.find(item => item.id === product.id);
    const [wishlistLoading, setWishlistLoading] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const { user, updateUser } = useAuth();
    const imgs = product?.images || [];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wishlist, setWishList] = useState([]);

    useEffect(() => {
        if (user?.wishlist) {
            setWishList(user?.wishlist);
            setIsInWishlist(user?.wishlist?.includes(product.id));
        } else {
            setIsInWishlist(false);
        }
    }, [user, product.id]);

    // Handle wishlist update
    const handleWishlist = async () => {
        if (!user) {
            toast.error("You need to log in to manage your wishlist.");
            return;
        }

        setWishlistLoading(true);
        try {
            const updatedWishlist = isInWishlist
                ? wishlist.filter((id) => id !== product.id)
                : [...wishlist, product.id];

            const res = await updateUser({ wishlist: updatedWishlist });
            if (res.success) {
                setIsInWishlist(!isInWishlist);
                toast.success(isInWishlist ? "Item removed from wishlist" : "Item added to wishlist!");
            } else {
                toast.error("Failed to update wishlist.");
            }
        } catch (error) {
            console.error("Error updating wishlist:", error);
            toast.error("Failed to update wishlist.");
        } finally {
            setWishlistLoading(false);
        }
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === imgs.length - 1 ? prevIndex : prevIndex + 1));
    };

    React.useEffect(() => {
        const selectedImage = document.querySelector('.selected-image');
        if (selectedImage) {
            selectedImage.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
    }, [currentIndex]);

    return (
        <div className='md:w-[50%] py-4 px-4 lg:px-2'>
            <div className='flex flex-col-reverse sm:flex-row gap-3'>
                <div className='w-full sm:w-fit flex gap-2 sm:flex-col items-center relative rounded-lg py-2'>
                    <button onClick={handlePrev} className={`custom-prev hover:scale-105 duration-300 absolute rounded-lg ${isDarkMode ? ' bg-gray-700/30 ' : ' bg-gray-400/30 '} -translate-x-[30%] sm:static left-0 top-[50%] sm:top-0 hidden sm:block -translate-y-[50%] sm:translate-0 p-1 sm:w-full cursor-pointer`}>
                        <span className='block sm:hidden'>
                            <FiArrowLeftCircle size={30} />
                        </span>
                        <span className='hidden sm:block'>▲</span>
                    </button>
                    <div className='h-[80px] sm:h-[380px] sm:w-[80px] overflow-auto flex sm:flex-col gap-2 scrollbar-hide'>
                        {imgs.map((img, index) => (
                            <LazyImage
                                key={index}
                                src={img}
                                alt={`Image ${index}`}
                                className={`rounded-lg w-full object-contain aspect-square ${index === currentIndex ? 'border-2 border-indigo-600 selected-image' : ''}`}
                                style={{ scrollSnapAlign: 'start' }}
                                onClick={() => setCurrentIndex(index)}
                            />
                        ))}
                    </div>
                    <button onClick={handleNext} className={`custom-next hover:scale-105 duration-300 rounded-lg ${isDarkMode ? ' bg-gray-700/30 ' : ' bg-gray-400/30 '} absolute right-0 top-[50%] translate-x-[30%] -translate-y-[50%] hidden sm:block sm:static p-1 sm:w-full cursor-pointer sm:translate-0`}>
                        <span className='block sm:hidden'>
                            <FiArrowRightCircle size={30} />
                        </span>
                        <span className='hidden sm:block'>▼</span>
                    </button>
                </div>
                <div className={`w-full relative border ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '} rounded-xl overflow-hidden`}>
                    <LazyImage
                        src={imgs[currentIndex]}
                        alt="Main Image"
                        className="h-[350px] sm:h-[500px] object-contain border-none"
                    />
                    {/* Favorite Button */}
                    <button
                        className={`absolute bg-red-500 cursor-pointer top-4 right-4 p-2 rounded-full shadow-md transition-colors
                                         ${isDarkMode ? 'bg-white/80 hover:bg-white' : 'bg-white/80 hover:bg-white'}`}
                        onClick={(e) => {
                            e.preventDefault();
                            handleWishlist();
                        }}
                        disabled={wishlistLoading} // Disable button while loading
                    >
                        {wishlistLoading ? (
                            <ImSpinner2 className="w-7 h-7 text-red-500 animate-spin" />
                        ) : (
                            <FiHeart className={`w-7 h-7 ${isInWishlist ? 'text-red-500 fill-red-500' : 'text-red-500'}`} />
                        )}
                    </button>
                </div>
            </div>
            <div className='flex justify-end items-center mt-3 sm:mt-10 w-full'>
                <button
                    className={`w-[50%] py-3 h-15 sm:py-4 border ${isDarkMode ? 'border-gray-300 text-gray-300' : 'border-indigo-600 text-indigo-600'} text-lg cursor-pointer flex justify-center items-center font-semibold transform `}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (cartItem)
                            return;
                        dispatch(addToCart(product));
                        toast.success(`${product.name} added to cart`);
                    }}
                >
                    <div className='flex items-center justify-center gap-2'>
                        {cartItem ? (
                            <>
                                <AddToCart product={product} />
                            </>
                        ) : (
                            <>
                                <FiShoppingCart size={20} />
                                <span>Add to Cart</span>
                            </>
                        )}

                    </div>
                </button>
                <button className={`w-[50%] h-15 py-3 sm:py-4 border ${isDarkMode ? 'bg-gray-300 border-gray-300 text-black' : 'bg-indigo-600 border-indigo-600 text-white'} font-semibold text-lg cursor-pointer flex justify-center items-center gap-3 transform`}>
                    <FaAnglesRight size={20} />
                    <span>Buy Now</span>
                </button>
            </div >
        </div >
    );
}

export default ProductCatalog;
