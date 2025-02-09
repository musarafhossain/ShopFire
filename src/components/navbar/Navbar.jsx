import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoMoonOutline } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { FiShoppingBag } from "react-icons/fi";
import { BsTruck } from "react-icons/bs";
import { useTheme } from '../../context/ThemeContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Refs for elements to animate
  const logoRef = useRef(null);
  const rightIconsRef = useRef(null);

  // State to handle sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  useGSAP(() => {
    gsap.from(logoRef.current, {
      x: -200,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from('.right-icon', {
      x: 200,
      duration: 1,
      ease: "power3.out",
      stagger: 0.3,
    });

    gsap.from('.nav-link', {
      y: -50,
      duration: 1,
      ease: "power3.out",
      stagger: 0.3,
    });
  }, {});

  return (
    <>
      <header
        className={`flex sticky w-full top-0 z-[999] left-0 items-center justify-between px-2 md:px-5 
                  [box-shadow:rgba(60,_64,_67,_0.3)_0px_1px_2px_0px,_rgba(60,_64,_67,_0.15)_0px_1px_3px_1px] 
                  ${isDarkMode ? 'bg-[#1f1f1f]' : 'bg-white'}`}
      >
        {/* Logo */}
        <div className='flex justify-center items-center select-none' ref={logoRef}>
          <HiMiniBars3BottomRight
            className='cursor-pointer md:hidden ml-1'
            size={25}
            onClick={toggleSidebar}
          />
          <Link to='/'>
            <img
              src={`${isDarkMode ? '/logo-invert.png' : '/logo.png'}`}
              alt='Logo'
              className='w-[170px] md:w-[200px] py-1.5 rounded-xl'
            />
          </Link>
        </div>

        {/* Navigation Menu - Sidebar for Mobile */}
        <nav
          className={`absolute md:block md:static top-[60px] left-0 w-[250px] md:w-fit ${isDarkMode ? 'bg-[#363636]' : 'bg-gray-200'} md:bg-transparent h-[100dvh] md:h-fit md:transform md:translate-x-0 transition-transform duration-300 ${isSidebarOpen ? 'transform translate-x-0' : 'transform -translate-x-full'}`}
        >
          <ul className='flex md:gap-6 text-lg flex-col md:flex-row pt-5 md:pt-0'>
            <li className='nav-link'>
              <Link className='hover:text-blue-500 font-bold flex gap-1 items-center px-8 py-4 md:px-0 md:py-0 md:justify-center' to="/" onClick={closeSidebar}>
                <IoHomeOutline size={20} />
                Home
              </Link>
            </li>
            <li className='nav-link'>
              <Link className='hover:text-blue-500 flex gap-1 items-center px-8 py-4 md:px-0 md:py-0 md:justify-center' to="/all-products" onClick={closeSidebar}>
                <FiShoppingBag size={20} />
                All Products
              </Link>
            </li>
            <li className='nav-link'>
              <Link className='hover:text-blue-500 flex gap-1 items-center px-8 py-4 md:px-0 md:py-0 md:justify-center' to="/order" onClick={closeSidebar}>
                <BsTruck size={21} />
                My Orders
              </Link>
            </li>
          </ul>
        </nav>

        {/* User & Cart */}
        <div className='flex items-center gap-4 md:gap-6'>
          <Link to="/cart" className='relative right-icon'>
            <FiShoppingCart size={25} />
            <span className='absolute top-[-7px] right-[-7px] aspect-square justify-center items-center bg-red-600 text-white text-xs rounded-full h-[20px] hidden'>
              99
            </span>
          </Link>

          <button type='button' onClick={toggleTheme} className='cursor-pointer right-icon'>
            {isDarkMode ? <FiSun size={25} /> : <IoMoonOutline size={25} />}
          </button>

          <button type="button" className='right-icon'>
            <FaUserCircle size={25} />
          </button>
        </div>
      </header>

      {/* Overlay (visible when sidebar is open) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-[10] md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
    </>
  );
};

export default Navbar;
