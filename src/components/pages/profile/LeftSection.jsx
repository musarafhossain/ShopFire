import React from 'react'
import { useTheme } from '@/context/ThemeContext'
import { FaChevronRight, FaPowerOff } from "react-icons/fa6";
import { FaUser, FaFolder, FaWallet } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { Link } from 'react-router-dom';

const LeftSection = ({ pageTitle }) => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`w-full md:w-[40vw] lg:w-[30vw] flex flex-col gap-4 text-left`}>
      {/* Greeting Section */}
      <div className={`flex items-center gap-3 p-4 rounded-xl border ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '}`}>
        <img src="/mypic.jpg" className='h-14 w-14 rounded-full' alt="" />
        <div className='text-left'>
          <p className='text-sm'>Hello,</p>
          <p className='text-xl font-semibold truncate max-w-sm'>Musaraf Hossain</p>
        </div>
      </div>

      {/* Tab Section */}
      <div className={`flex items-center flex-col rounded-xl border ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '}`}>
        {/* My orders */}
        <div className={`uppercase cursor-pointer flex items-center justify-between p-4 w-full border-b ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '} text-gray-400 hover:text-blue-800 duration-300`}>
          <div className='flex items-center gap-4'>
            <GiShoppingBag size={20} className='text-indigo-400' />
            <span className='text-md font-semibold'>My Orders</span>
          </div>
          <FaChevronRight size={20} />
        </div>
        {/* Account Settting */}
        <div className={`flex flex-col p-4 w-full border-b ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '}`}>
          <div className='flex items-center gap-4'>
            <FaUser size={20} className='text-indigo-400' />
            <span className='text-md font-semibold text-gray-400 uppercase'>Account Setting</span>
          </div>
          <div className='pt-2 font-semibold flex flex-col'>
            <Link to='/profile' className={`text-sm p-2 pl-9 rounded-lg cursor-pointer duration-200 ${pageTitle === "Profile Information" && ' text-blue-800 '} hover:text-blue-800 ${isDarkMode ? ' hover:bg-gray-800 ' : ' hover:bg-gray-200 '}`}>
              Profile Information
            </Link>
            <Link to='/profile/addresses' className={`text-sm p-2 pl-9 rounded-lg cursor-pointer duration-200 ${pageTitle === "Manage Addresses" && ' text-blue-800 '} hover:text-blue-800 ${isDarkMode ? ' hover:bg-gray-800 ' : ' hover:bg-gray-200 '}`}>
              Manage Addresses
            </Link>
          </div>
        </div>
        {/* Payments */}
        <div className={`flex flex-col p-4 w-full border-b ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '}`}>
          <div className='flex items-center gap-4'>
            <FaWallet size={20} className='text-indigo-400' />
            <span className='text-md font-semibold text-gray-400 uppercase'>Payments</span>
          </div>
          <div className='pt-2 font-semibold'>
            <p className={`text-sm p-2 pl-9 rounded-lg cursor-pointer duration-200 hover:text-blue-800 ${isDarkMode ? ' hover:bg-gray-800 ' : ' hover:bg-gray-200 '}`}>Saved UPI</p>
            <p className={`text-sm p-2 pl-9 rounded-lg cursor-pointer duration-200 hover:text-blue-800 ${isDarkMode ? ' hover:bg-gray-800 ' : ' hover:bg-gray-200 '}`}>Saved Card</p>
          </div>
        </div>
        {/* My Stuff */}
        <div className={`flex flex-col p-4 w-full border-b ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '}`}>
          <div className='flex items-center gap-4'>
            <FaFolder size={20} className='text-indigo-400' />
            <span className='text-md font-semibold text-gray-400 uppercase'>My Stuff</span>
          </div>
          <div className='pt-2 font-semibold'>
            <p className={`text-sm p-2 pl-9 rounded-lg cursor-pointer duration-200 hover:text-blue-800 ${isDarkMode ? ' hover:bg-gray-800 ' : ' hover:bg-gray-200 '}`}>My Coupons</p>
            <p className={`text-sm p-2 pl-9 rounded-lg cursor-pointer duration-200 hover:text-blue-800 ${isDarkMode ? ' hover:bg-gray-800 ' : ' hover:bg-gray-200 '}`}>My Wishlist</p>
          </div>
        </div>
        {/* Logout */}
        <div className={`uppercase cursor-pointer flex items-center justify-between p-4 w-full border-b ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '} text-gray-400 hover:text-red-600 duration-300`}>
          <div className='flex items-center gap-4 '>
            <FaPowerOff size={20} className='text-red-400' />
            <span className='text-md font-semibold'>Logout</span>
          </div>
          <FaChevronRight size={20} />
        </div>
      </div>
    </div>
  )
}
export default LeftSection