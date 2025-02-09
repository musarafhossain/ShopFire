import React from 'react'
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

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <header className={`flex sticky top-0 left-0 items-center justify-between px-2 md:px-5 
                  [box-shadow:rgba(60,_64,_67,_0.3)_0px_1px_2px_0px,_rgba(60,_64,_67,_0.15)_0px_1px_3px_1px] 
                  ${isDarkMode ? 'bg-[#1f1f1f]' : 'bg-white'}`}
    >
      {/* Logo */}
      <div className='flex justify-center items-center select-none'>
        <HiMiniBars3BottomRight className='cursor-pointer md:hidden' size={25} />
        <Link to='/'>
          <img src={`${isDarkMode ? '/logo-invert.png' : '/logo.png'}`} alt="Logo" className='w-[170px] md:w-[200px] py-1.5 rounded-xl' />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className='hidden md:block'>
        <ul className='flex gap-6 text-lg items-center justify-center'>
          <li>
            <Link className='hover:text-blue-500 font-bold flex gap-1 items-center justify-center' to="/">
              <IoHomeOutline size={20} />
              Home
            </Link>
          </li>
          <li>
            <Link className='hover:text-blue-500 flex gap-1 items-center justify-center' to="/all-products">
              <FiShoppingBag size={20} />
              All Products
            </Link>
          </li>
          <li>
            <Link className='hover:text-blue-500 flex gap-1 items-center justify-center' to="/order">
              <BsTruck size={21} />
              My Orders
            </Link>
          </li>
        </ul>
      </nav>

      {/* User & Cart */}
      <div className='flex items-center gap-4 md:gap-6'>
        {/* Cart Icon with Badge */}
        <Link to="/cart" className='relative'>
          <FiShoppingCart size={25} />
          <span className='absolute top-[-7px] right-[-7px] aspect-square flex justify-center items-center bg-red-600 text-white text-xs rounded-full h-[20px]'>
            99
          </span>
        </Link>

        {/* Mode changing button */}
        <button type='button' onClick={toggleTheme} className='cursor-pointer duration-500'>
          {isDarkMode ? <FiSun size={25} /> : <IoMoonOutline size={25} />}
        </button>
        {/* User Profile Icon */}
        <button type="button">
          <FaUserCircle size={25} />
        </button>
      </div>
    </header>
  )
}

export default Navbar;
