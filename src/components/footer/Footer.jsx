import React from 'react'
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <footer className={`${isDarkMode ? 'bg-[#3e3e3e]' : 'bg-gray-100'} text-center`}>
      {/* Footer Content */}
      <div className='flex justify-center flex-col lg:flex-row gap-6 py-6'>
        <div className='flex-1 px-4'>
          <div className='flex items-center gap-2'>
            <img src="/icon.png" alt="Logo" className='w-[70px]' />
            <h1 className='text-2xl font-bold text-left'>Lorem ipsum dolor sit amet.</h1>
          </div>
          <p className='text-left p-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem iusto aspernatur mollitia iure eius rerum! Obcaecati quis sint libero expedita.</p>
          <ul className='flex p-3 gap-2.5'>
            <li><FaInstagram size={25} className='hover:text-orange-800 cursor-pointer duration-500' /></li>
            <li><FaFacebook size={25} className='hover:text-blue-700 cursor-pointer duration-500' /></li>
            <li><FaLinkedin size={25} className='hover:text-blue-500 cursor-pointer duration-500' /></li>
            <li><FaTwitter size={25} className='hover:text-blue-400 cursor-pointer duration-500' /></li>
            <li><FaYoutube size={25} className='hover:text-red-700 cursor-pointer duration-500' /></li>
          </ul>
        </div>
        <div className='flex-2 flex px-4 sm:flex-row flex-col gap-5'>
          <div className='flex-1'>
            <h2 className='font-semibold text-lg mb-3'>Quick Links</h2>
            <ul className='space-y-2'>
              <li><Link className='hover:text-blue-500' to='/'>Home</Link></li>
              <li><Link className='hover:text-blue-500' to='/all-products'>All Products</Link></li>
              <li><Link className='hover:text-blue-500' to='/order'>My Orders</Link></li>
              <li><Link className='hover:text-blue-500' to='/cart'>Cart</Link></li>
            </ul>
          </div>
          <div className='flex-1'>
            <h2 className='font-semibold text-lg mb-3'>Policies</h2>
            <ul className='space-y-2'>
              <li><Link className='hover:text-blue-500' to='/terms'>Terms & Conditions</Link></li>
              <li><Link className='hover:text-blue-500' to='/privacy'>Privacy Policy</Link></li>
              <li><Link className='hover:text-blue-500' to='/refund'>Refund Policy</Link></li>
              <li><Link className='hover:text-blue-500' to='/contact'>Contact Us</Link></li>
            </ul>
          </div>
          <div className='flex-1'>
            <h2 className='font-semibold text-lg mb-3'>Others</h2>
            <ul className='space-y-2'>
              <li><Link className='hover:text-blue-500' to='/about-us'>About Us</Link></li>
              <li><Link className='hover:text-blue-500' to='/contact-us'>Contact Us</Link></li>
              <li><Link className='hover:text-blue-500' to='/support'>Support</Link></li>
              <li><Link className='hover:text-blue-500' to='/faq'>FAQ</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <p className={`text-sm border-t py-4 ${isDarkMode ? 'dark:border-gray-500 dark:text-gray-300' : 'border-[#ccc] text-gray-700'} text-center`}>
        &copy; {new Date().getFullYear()} <Link to='/' className='text-red-400 font-medium'>ShopFire</Link>. All rights reserved.
      </p>

    </footer>
  )
}

export default Footer;
