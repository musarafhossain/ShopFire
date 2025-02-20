//import react libraries
import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";

//import react icons
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoHomeOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { FiShoppingBag } from "react-icons/fi";
import { BsTruck } from "react-icons/bs";

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

  return (
    <>
      <header className={`${isDarkMode ? 'bg-[#002031]' : 'bg-white'} [box-shadow:rgba(60,_64,_67,_0.3)_0px_1px_2px_0px,_rgba(60,_64,_67,_0.15)_0px_1px_3px_1px] z-[999] sticky top-0 left-0`} ref={navbarRef}>
        <center>
          <div
            className={`flex max-w-[1440px] w-full min-h-[60px] gap-2 items-center justify-between px-2 md:pr-5 `}  >
            {/* Logo */}
            <div className='flex justify-center items-center select-none' ref={logoRef}>
              <HiMiniBars3BottomRight
                className='cursor-pointer lg:hidden ml-1'
                size={25}
                onClick={toggleSidebar}
              />
              <Logo className='hidden sm:flex'/>
            </div>

            {/* Navigation Menu - Sidebar for Mobile */}
            <nav
              className={`absolute lg:block lg:static top-[60px] left-0 w-[250px] overflow-y-auto font-[Open Sans] lg:w-fit ${isDarkMode ? 'bg-[#002c44]' : 'bg-gray-200'} lg:bg-transparent h-[calc(100vh-60px)] lg:h-fit md:transform lg:translate-x-0 transition-transform duration-300 ${isSidebarOpen ? 'transform translate-x-0' : 'transform -translate-x-full'}`}
            >
              <ul className='flex lg:gap-6 text-lg flex-col text-nowrap lg:flex-row pt-5 lg:pt-0'>
                <li className='nav-link'>
                  <Link className='hover:text-blue-500 flex gap-1 items-center px-8 py-4 lg:px-0 lg:py-0 lg:justify-center' to="/" onClick={closeSidebar}>
                    <IoHomeOutline size={20} />
                    Home
                  </Link>
                </li>
                <li className='nav-link'>
                  <Link className='hover:text-blue-500 flex gap-1 items-center px-8 py-4 lg:px-0 lg:py-0 lg:justify-center' to="/all-products" onClick={closeSidebar}>
                    <FiShoppingBag size={20} />
                    All Products
                  </Link>
                </li>
                <li className='nav-link'>
                  <Link className='hover:text-blue-500 flex gap-1 items-center px-8 py-4 lg:px-0 lg:py-0 lg:justify-center' to="/order" onClick={closeSidebar}>
                    <BsTruck size={21} />
                    My Orders
                  </Link>
                </li>
              </ul>
            </nav>

            {/* User & Cart */}
            <div className='flex items-center gap-3 md:gap-4 justify-end'>
              <div className={`right-icon flex-grow sm:flex-grow-0 border ${isDarkMode ? 'border-[#6e6e6e]' : 'border-[#ccc]'} py-2 px-4 rounded-4xl flex justify-center items-center`}>
                <input type="text" name="search" id="search" className='focus:outline-none w-full' placeholder='Search...' />
                <button type="button" className='cursor-pointer'>
                  <FaSearch size={20} />
                </button>
              </div>

              <Link to="/cart" className='relative right-icon'>
                <FiShoppingCart size={25} />
                <span className='absolute top-[-7px] right-[-7px] aspect-square justify-center items-center bg-red-600 text-white text-xs rounded-full h-[20px] flex'>
                  99
                </span>
              </Link>

              <ThemeToggleButton className='right-icon'/>

              <button type="button" className='right-icon'>
                <FaUserCircle size={25} />
              </button>
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
