import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { FaChevronRight, FaPowerOff } from "react-icons/fa6";
import { FaUser, FaFolder, FaWallet, FaImage, FaTrash, FaTimes, FaEdit, FaUserLock } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { useAuth } from "@/auth/AuthContext";
import toast from "react-hot-toast";
import LazyImage from '@/components/LazyImage';
import ModalLayout from '../../layout/ModalLayout';
import { useLoading } from "@/context/LoadingContext";
import LoadingSpinner from '@/components/LoadingSpinner';

const LeftSection = ({ pageTitle }) => {
  const { user, logout, handleProfilePicture, handleDeleteProfilePicture } = useAuth();
  const [imgUrl, setImgUrl] = useState(user?.photoURL || "/mypic.png");
  const [showOptions, setShowOptions] = useState(false);
  const { isDarkMode } = useTheme();
  const { loading } = useLoading();

  // Handle Image Selection
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (!user?.uid) {
      toast.error("User ID not found!");
      return;
    }
    setShowOptions(false);
    const result = await handleProfilePicture(file);
    if (result.success) {
      toast.success("Profile picture has been updated!");
      setImgUrl(result.updatedPhotoURL);
    } else {
      toast.error(result.message || "Failed to update profile picture.");
    }
  };

  // Handle image click to show options
  const handleImageClick = () => {
    setShowOptions(true);
  };

  // Handle delete image
  const handleDeleteImage = async () => {
    setShowOptions(false);
    const result = await handleDeleteProfilePicture();
    if (result.success) {
      toast.success("Profile picture removed!");
      setImgUrl(result.updatedPhotoURL);
    } else {
      toast.error(result.message || "Failed to remove profile picture.");
    }
  };

  return (
    <div className={`w-full md:w-[40vw] lg:w-[30vw] flex flex-col gap-4 text-left`}>
      {/* Greeting Section */}
      <div className={`flex items-center gap-3 p-4 rounded-xl border ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '}`}>
        {/* Profile Image Upload */}
        <div className="relative w-14 h-14 flex justify-center items-center overflow-hidden cursor-pointer group" onClick={handleImageClick}>
          {loading ?
            <LoadingSpinner className='bg-transparent' />
            : <LazyImage
              src={imgUrl}
              alt="Profile Pic"
              className="h-14 w-14 rounded-full object-cover"
            />
          }


          {/* Overlay with Edit Icon */}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FaEdit className="text-white text-lg" />
          </div>
        </div>

        <input type="file" id="profile-pic" accept="image/*" onChange={handleImageChange} className="hidden" />

        <div className='text-left'>
          <p className='text-sm'>Hello,</p>
          <p className='text-xl font-semibold truncate max-w-sm'>{user.name}</p>
        </div>
      </div>

      {/* Image Change/Delete Options */}
      <ModalLayout isOpenModal={showOptions} closeModal={() => setShowOptions(false)} openModal={() => setShowOptions(true)}>
        <div className="rounded-lg mx-auto text-center py-2 px-4">
          <p className={`text-xl font-semibold mb-4 ${isDarkMode ? 'dark:text-gray-200' : 'text-gray-800'}`}>
            Change Profile Picture
          </p>

          {/* Responsive Grid for Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              className="flex items-center justify-center gap-2 border border-blue-500/40 text-blue-500 py-2 px-4 rounded-md cursor-pointer transform transition-transform duration-200 hover:scale-105"
              onClick={() => document.getElementById("profile-pic").click()}
            >
              <FaImage /> Change Image
            </button>

            <button
              className="flex items-center justify-center gap-2 border border-red-500/40 text-red-500 py-2 px-4 rounded-md cursor-pointer transform transition-transform duration-200 hover:scale-105"
              onClick={handleDeleteImage}
            >
              <FaTrash /> Delete Image
            </button>

            {/* Full width button on mobile, aligns with grid on larger screens */}
            <button
              className="flex items-center justify-center gap-2 border border-gray-400/40 text-gray-400 py-2 px-4 rounded-md cursor-pointer transform transition-transform duration-200 hover:scale-105"
              onClick={() => setShowOptions(false)}
            >
              <FaTimes /> Cancel
            </button>
          </div>
        </div>
      </ModalLayout>

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
        {/* Admin Panel Link */}
        {user.role === 'admin' &&
          <Link
            className={`uppercase cursor-pointer flex items-center justify-between p-4 w-full border-b ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '} text-gray-400 hover:text-blue-800 duration-300`}
            to='/admin/dashboard'
          >
            <div className='flex items-center gap-4'>
              <FaUserLock size={20} className='text-indigo-400' />
              <span className='text-md font-semibold'>Admin Panel</span>
            </div>
            <FaChevronRight size={20} />
          </Link>
        }
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
          <div className='pt-2 font-semibold flex flex-col'>
            <p className={`text-sm p-2 pl-9 rounded-lg cursor-pointer duration-200 hover:text-blue-800 ${isDarkMode ? ' hover:bg-gray-800 ' : ' hover:bg-gray-200 '}`}>My Coupons</p>
            <Link to='/profile/wishlist' className={`text-sm p-2 pl-9 rounded-lg cursor-pointer duration-200 ${pageTitle === "Wishlist" && ' text-blue-800 '} hover:text-blue-800 ${isDarkMode ? ' hover:bg-gray-800 ' : ' hover:bg-gray-200 '}`}>
              My Wishlist
            </Link>
          </div>
        </div>
        {/* Logout */}
        <button
          className={`uppercase cursor-pointer flex items-center justify-between p-4 w-full border-b ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '} text-gray-400 hover:text-red-600 duration-300`}
          onClick={logout}
        >
          <div className='flex items-center gap-4 '>
            <FaPowerOff size={20} className='text-red-400' />
            <span className='text-md font-semibold'>Logout</span>
          </div>
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default LeftSection;
