import React from 'react'
import { Link } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoMoonOutline } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <header className='flex items-center justify-between px-2 md:px-5 [box-shadow:rgba(60,_64,_67,_0.3)_0px_1px_2px_0px,_rgba(60,_64,_67,_0.15)_0px_1px_3px_1px]'>
      {/* Logo */}
      <div className='flex justify-center items-center select-none'>
        <HiMiniBars3BottomRight className='cursor-pointer md:hidden' size={25} />
        <img src="/logo.png" alt="Logo" className='w-[170px] md:w-[200px] py-1.5 rounded-xl' />
      </div>
      
      {/* Navigation Menu */}
      <nav className='hidden md:block'>
        <ul className='flex gap-6 text-md'>
          <li><Link className='hover:text-blue-500' to="/">Home</Link></li>
          <li><Link className='hover:text-blue-500' to="/all-products">All Products</Link></li>
          <li><Link className='hover:text-blue-500' to="/order">My Orders</Link></li>
        </ul>
      </nav>
      
      {/* User & Cart */}
      <div className='flex items-center gap-4 md:gap-6'>
        {/* Cart Icon with Badge */}
        <Link to="/cart" className='relative'>
          <GiShoppingBag size={25} />
          <span className='absolute top-[-7px] right-[-7px] aspect-square flex justify-center items-center bg-red-600 text-white text-xs rounded-full h-[20px]'>
            99
          </span>
        </Link>

        {/* Mode changing button */}
        <button type='button' onClick={toggleTheme} className='cursor-pointer duration-500'>
          {isDarkMode?<FiSun size={25} />:<IoMoonOutline size={25} />}
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
