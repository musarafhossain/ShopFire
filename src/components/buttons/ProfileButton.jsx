import React, { useState, useRef } from 'react'
import LazyImage from '@/components/LazyImage';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from "@/auth/AuthContext";
import { HiMiniPower } from "react-icons/hi2";
import { FaHeart, FaUserPlus } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";

const ProfileButton = () => {
    const { isDarkMode } = useTheme();
    const { user, logout } = useAuth();
    // Dropdown State
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const dropdownTimeout = useRef(null);

    const handleMouseEnter = () => {
        if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
        setIsUserMenuOpen(true);
    };

    const handleMouseLeave = () => {
        dropdownTimeout.current = setTimeout(() => {
            setIsUserMenuOpen(false);
        }, 200);
    };

    return (
        <div
            className="relative flex items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                type="button"
                className="right-icon cursor-pointer flex items-center justify-center"
            >
                <LazyImage src={user?.photoURL || "/mypic.png"} alt="User avatar" className={`w-10 h-10 rounded-full object-cover border ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '}`} />
            </button>
            {isUserMenuOpen && (
                <div
                    className={`absolute right-0 top-12 p-2 flex flex-col gap-2 w-48 shadow-md rounded border ${isDarkMode ? 'bg-[#002031] text-white border-gray-600' : 'bg-white text-black border-gray-200'
                        }`}
                >
                    {user ? (
                        <>
                            <Link to="/profile">
                                <button
                                    className={`cursor-pointer w-full rounded-md flex px-2 py-2 border gap-2 items-center text-left transition-transform transform hover:scale-105 ${isDarkMode ? 'border-[#2f2f2f] hover:bg-gray-700' : 'hover:bg-gray-100 border-[#dcdada]'
                                        }`}
                                >
                                    <LazyImage src={user?.photoURL || "/mypic.png"} alt="User avatar" className="w-10 h-10 object-cover rounded-full" />
                                    <div className="flex flex-col gap-1 w-full truncate">
                                        <span className="truncate text-md leading-[1]">{user.name}</span>
                                        <span className="text-xs text-gray-500">Your Profile</span>
                                    </div>
                                </button>
                            </Link>

                            <button
                                className={`w-full cursor-pointer rounded-md flex px-4 py-2 border gap-2 items-center text-left transition-transform transform hover:scale-105 ${isDarkMode ? 'border-[#2f2f2f] hover:bg-gray-700' : 'hover:bg-gray-100 border-[#dcdada]'
                                    } text-green-500`}
                            >
                                <FaHeart size={18} className="transition-colors text-green-500" />
                                My Wishlist (10)
                            </button>

                            {/* Logout Button */}
                            <button
                                className={`w-full cursor-pointer rounded-md flex px-4 py-2 border gap-2 items-center text-left transition-transform transform hover:scale-105 ${isDarkMode ? 'border-[#2f2f2f] hover:bg-gray-700' : 'hover:bg-gray-100 border-[#dcdada]'
                                    } text-red-500`}
                                onClick={logout}
                            >
                                <HiMiniPower size={18} className="transition-colors text-red-500" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button
                                    className={`w-full cursor-pointer rounded-md flex px-4 py-2 border gap-2 items-center text-left transition-transform transform hover:scale-105 ${isDarkMode ? 'border-[#2f2f2f] hover:bg-gray-700' : 'hover:bg-gray-100 border-[#dcdada]'
                                        } text-red-500`}
                                >
                                    <CiLogin size={18} className="transition-colors text-red-500" />
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup">
                                {/* Signup Button */}
                                <button
                                    className={`w-full cursor-pointer rounded-md flex px-4 py-2 border gap-2 items-center text-left transition-transform transform hover:scale-105 ${isDarkMode ? 'border-[#2f2f2f] hover:bg-gray-700' : 'hover:bg-gray-100 border-[#dcdada]'
                                        } text-green-500`}
                                >
                                    <FaUserPlus size={18} className="transition-colors text-green-500" />
                                    Signup
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default ProfileButton