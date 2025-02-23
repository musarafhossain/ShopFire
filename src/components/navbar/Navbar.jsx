//import react libraries
import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

//import react icons
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoHomeOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { FiShoppingBag } from "react-icons/fi";
import { BsTruck } from "react-icons/bs";
import { FaUserCircle, FaHeart, FaSignOutAlt, FaSearch, FaUserPlus } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { HiMiniPower } from "react-icons/hi2";

//import context
import { useTheme } from '../../context/ThemeContext';

import ThemeToggleButton from '../buttons/ThemeToggleButton';
import Logo from '../Logo';

//import other libraries
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const { isDarkMode } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isSidebarOpen]);

  // Refs for elements to animate
  const logoRef = useRef(null);
  const navbarRef = useRef(null);

  // State to handle sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    ScrollTrigger.create({
      onUpdate: (self) => {
        const direction = self.direction;
        if (direction === 1) {
          gsap.to(navbarRef.current, { y: "-100%" });
        } else {
          gsap.to(navbarRef.current, { y: "0%" });
        }
        lastScrollY = self.scroll();
      },
    });
  }, []);

  /* useGSAP(() => {
    gsap.from(logoRef.current, {
      x: -200,
      duration: 1,
      ease: "power3.out",
      opacity: 0,
    });

    gsap.from('.right-icon', {
      x: 200,
      duration: 1,
      ease: "power3.out",
      stagger: 0.3,
      opacity: 0,
    });

    gsap.from('.nav-link', {
      y: -50,
      duration: 1,
      ease: "power3.out",
      stagger: 0.3,
    });
  }, {}); */

  // State for user menu dropdown
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <>
      <header
        className={`${isDarkMode ? 'bg-[#002031]' : 'bg-white'} [box-shadow:rgba(60,_64,_67,_0.3)_0px_1px_2px_0px,_rgba(60,_64,_67,_0.15)_0px_1px_3px_1px] z-[999] sticky top-0 left-0`}
        ref={navbarRef}
      >
        <center>
          <div
            className={`flex max-w-[1440px] w-full min-h-[60px] gap-2 items-center justify-between px-2 md:pr-5`}
          >
            {/* Logo */}
            <div className="flex justify-center items-center select-none" ref={logoRef}>
              <HiMiniBars3BottomRight
                className="cursor-pointer lg:hidden ml-1"
                size={25}
                onClick={toggleSidebar}
              />
              <Logo className="hidden sm:flex" />
            </div>

            {/* Navigation Menu - Sidebar for Mobile */}
            <nav
              className={`absolute lg:block lg:static top-[60px] left-0 w-[250px] overflow-y-auto font-[Open Sans] lg:w-fit ${isDarkMode ? 'bg-[#002c44]' : 'bg-gray-200'
                } lg:bg-transparent h-[calc(100vh-60px)] lg:h-fit md:transform lg:translate-x-0 transition-transform duration-300 ${isSidebarOpen ? 'transform translate-x-0' : 'transform -translate-x-full'
                }`}
            >
              <ul className="flex lg:gap-6 text-lg flex-col text-nowrap lg:flex-row pt-5 lg:pt-0">
                <li className="nav-link">
                  <Link
                    className="hover:text-blue-500 flex gap-1 items-center px-8 py-4 lg:px-0 lg:py-0 lg:justify-center"
                    to="/"
                    onClick={closeSidebar}
                  >
                    <IoHomeOutline size={20} />
                    Home
                  </Link>
                </li>
                <li className="nav-link">
                  <Link
                    className="hover:text-blue-500 flex gap-1 items-center px-8 py-4 lg:px-0 lg:py-0 lg:justify-center"
                    to="/all-products"
                    onClick={closeSidebar}
                  >
                    <FiShoppingBag size={20} />
                    All Products
                  </Link>
                </li>
                <li className="nav-link">
                  <Link
                    className="hover:text-blue-500 flex gap-1 items-center px-8 py-4 lg:px-0 lg:py-0 lg:justify-center"
                    to="/order"
                    onClick={closeSidebar}
                  >
                    <BsTruck size={21} />
                    My Orders
                  </Link>
                </li>
              </ul>
            </nav>

            {/* User & Cart */}
            <div className="flex items-center gap-3 md:gap-4 justify-end">
              <div
                className={`right-icon flex-grow sm:flex-grow-0 border ${isDarkMode ? 'border-[#6e6e6e]' : 'border-[#ccc]'} py-2 px-4 rounded-4xl flex justify-center items-center`}
              >
                <input
                  type="text"
                  name="search"
                  id="search"
                  className={`focus:outline-none w-full ${isDarkMode ? ' text-white' : 'bg-white text-black'}`}
                  placeholder="Search..."
                />
                <button type="button" className="cursor-pointer">
                  <FaSearch size={20} />
                </button>
              </div>

              <Link to="/cart" className="relative right-icon">
                <FiShoppingCart size={25} />
                {totalQuantity > 0 && (
                  <span className="absolute top-[-7px] right-[-7px] aspect-square justify-center items-center bg-red-600 text-white text-xs rounded-full h-[20px] flex">
                    {totalQuantity}
                  </span>
                )}
              </Link>

              <ThemeToggleButton className="right-icon" />

              {/* User Icon with Dropdown on Hover */}
              <div
                className="relative flex items-center justify-center"
                onMouseEnter={() => setIsUserMenuOpen(true)}
                onMouseLeave={() => setIsUserMenuOpen(false)}
              >
                <button
                  type="button"
                  className="right-icon cursor-pointer flex items-center justify-center h-full"
                >
                  <FaUserCircle size={25} />
                </button>
                {isUserMenuOpen && (
                  <div
                    className={`absolute right-0 -top-5 mt-2 p-2 flex flex-col gap-2 w-48 shadow-md rounded border ${isDarkMode ? 'bg-[#002031] text-white border-gray-600' : 'bg-white text-black border-gray-200'}`}
                  >
                    {true ? (
                      <>
                        <Link to="/profile">
                          <button
                            className={`cursor-pointer w-full rounded-md flex px-4 py-2 border gap-2 items-center text-left transition-transform transform hover:scale-105 ${isDarkMode ? 'border-[#2f2f2f] hover:bg-gray-700' : 'hover:bg-gray-100 border-[#dcdada]'}`}
                          >
                            <img src="/mypic.jpg" alt="User avatar" className="w-10 h-10 rounded-full" />
                            <span className="truncate text-md leading-[1]">Musaraf Hossain</span>
                          </button>
                        </Link>

                        {/* My Wishlist Button */}
                        <button
                          className={`w-full cursor-pointer rounded-md flex px-4 py-2 border gap-2 items-center text-left transition-transform transform hover:scale-105 ${isDarkMode ? 'border-[#2f2f2f] hover:bg-gray-700' : 'hover:bg-gray-100 border-[#dcdada]'} text-green-500`}
                        >
                          <FaHeart size={18} className="transition-colors text-green-500" />
                          My Wishlist (10)
                        </button>

                        {/* Logout Button */}
                        <button
                          className={`w-full cursor-pointer rounded-md flex px-4 py-2 border gap-2 items-center text-left transition-transform transform hover:scale-105 ${isDarkMode ? 'border-[#2f2f2f] hover:bg-gray-700' : 'hover:bg-gray-100 border-[#dcdada]'} text-red-500`}
                        >
                          <HiMiniPower size={18} className="transition-colors text-red-500" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Login Button */}
                        <Link to='/login'>
                          <button
                            className={`w-full cursor-pointer rounded-md flex px-4 py-2 border gap-2 items-center text-left transition-transform transform hover:scale-105 ${isDarkMode ? 'border-[#2f2f2f] hover:bg-gray-700' : 'hover:bg-gray-100 border-[#dcdada]'} text-red-500`}
                          >
                            <CiLogin size={18} className="transition-colors text-red-500" />
                            Login
                          </button>
                        </Link>
                        <Link to='/signup'>
                          {/* Signup Button */}
                          <button
                            className={`w-full cursor-pointer rounded-md flex px-4 py-2 border gap-2 items-center text-left transition-transform transform hover:scale-105 ${isDarkMode ? 'border-[#2f2f2f] hover:bg-gray-700' : 'hover:bg-gray-100 border-[#dcdada]'} text-green-500`}
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
            </div>
          </div>
        </center>
      </header>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-[10] lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
    </>
  );
};

export default Navbar;
