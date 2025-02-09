import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className='flex items-center justify-between border-b border-[#ccc] px-5'>
      {/* Logo */}
      <img src="/logo.png" alt="Logo" className='w-[200px] p-2 rounded-xl' />
      
      {/* Navigation Menu */}
      <nav>
        <ul className='flex gap-6 text-md'>
          <li><Link className='hover:text-blue-500' to="/">Home</Link></li>
          <li><Link className='hover:text-blue-500' to="/all-products">All Products</Link></li>
          <li><Link className='hover:text-blue-500' to="/order">My Orders</Link></li>
        </ul>
      </nav>
      
      {/* User & Cart */}
      <div className='flex items-center gap-6'>
        {/* Cart Icon with Badge */}
        <a href="/cart" className='relative'>
          <GiShoppingBag size={25} />
          {/* Cart Badge positioned top-right */}
          <span className='absolute top-[-7px] right-[-7px] aspect-square flex justify-center items-center bg-red-600 text-white text-xs rounded-full h-[20px]'>
            99
          </span>
        </a>
        
        {/* User Profile Icon */}
        <button type="button">
          <FaUserCircle size={25} />
        </button>
      </div>
    </header>
  )
}

export default Navbar;
