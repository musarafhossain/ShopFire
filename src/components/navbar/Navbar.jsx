import React from 'react'
import { Link } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className='flex items-center justify-between px-5 [box-shadow:rgba(60,_64,_67,_0.3)_0px_1px_2px_0px,_rgba(60,_64,_67,_0.15)_0px_1px_3px_1px]'>
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
