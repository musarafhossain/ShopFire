import React from 'react'
import { useTheme } from '../../../context/ThemeContext'
import Rating from '../../Rating';

const ProductDetails = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className='md:w-[50%] sm:py-4 px-4 lg:px-2 text-left flex flex-col gap-4'>
      <div className={`border ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '} rounded-xl p-4 flex flex-col gap-2`}>
        <h1 className='text-gray-500 text-lg font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad incidunt quibusdam expedita sed. Quam esse dolor adipisci, magnam doloremque soluta.</h1>
        <p className='text-3xl'>₹145</p>
        <Rating rating={4.5} />
        <p className='bg-green-500/30 w-fit p-1 rounded-2xl text-sm px-2 flex gap-1 font-semibold'>
          Trusted by
          <span className={`${isDarkMode ? ' text-green-300 ' : ' text-green-900 '} font-bold`}>
            <a href="/">
              ShopFire
            </a>
          </span>
          <img src="/icon.png" className='h-5 w-5' alt="Logo" />
        </p>
      </div>
      <div className={`border ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '} rounded-xl p-4 flex flex-col gap-4`}>
        <h1 className={`text-lg font-bold ${isDarkMode ? ' text-[#c2c2c2] ' : ' text-[#373737] '}`}>Select Size</h1>
        <div className='flex gap-2'>
          <button className={`border text-lg border-indigo-700 px-3 w-16 bg-indigo-500/20 text-indigo-700 font-semibold py-1 rounded-3xl`}>S</button>
          <button className={`border text-lg w-16 ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '} px-3 font-semibold py-1 rounded-3xl`}>M</button>
          <button className={`border text-lg w-16 ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '} px-3 font-semibold py-1 rounded-3xl`}>L</button>
          <button className={`border text-lg w-16 ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '} px-3 font-semibold py-1 rounded-3xl`}>XL</button>
          <button className={`border text-lg w-16 ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '} px-3 font-semibold py-1 rounded-3xl`}>XXL</button>
          <button className={`border text-lg w-16 ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '} px-3 font-semibold py-1 rounded-3xl`}>SM</button>
        </div>
      </div>
      <div className={`border ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '} rounded-xl p-4 flex flex-col gap-2`}>
        <h1 className={`text-lg font-bold ${isDarkMode ? ' text-[#c2c2c2] ' : ' text-[#373737] '}`}>Product Details</h1>
        <div className={`text-gray-500 font-semibold flex flex-col gap-1`}>
          <p className={`border-b ${isDarkMode ? 'border-[#222]' : 'border-[#eeeeee]'} pb-1`}>Name : Latest trending stylish high neck</p>
          <p className={`border-b ${isDarkMode ? 'border-[#222]' : 'border-[#eeeeee]'} pb-1`}>Fabric : Polyester</p>
          <p className={`border-b ${isDarkMode ? 'border-[#222]' : 'border-[#eeeeee]'} pb-1`}>Sleeve Length : Short Sleeves</p>
          <p className={`border-b ${isDarkMode ? 'border-[#222]' : 'border-[#eeeeee]'} pb-1`}>Pattern : Checked</p>
          <p className={`border-b ${isDarkMode ? 'border-[#222]' : 'border-[#eeeeee]'} pb-1`}>Net Quantity (N) : 1</p>
          <p className={`border-b ${isDarkMode ? 'border-[#222]' : 'border-[#eeeeee]'} pb-1`}>Sizes : S, M, L, XL, XXL, SM</p>
          <p className={``}>Country of Origin : India</p>
        </div>
      </div>
      <div className={`border ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '} rounded-xl p-4 flex flex-col gap-2`}>
        {/* Seller Details */}
      </div>
      <div className={`border ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '} rounded-xl p-4 flex flex-col gap-2`}>
        {/* Customer Review and Comments */}
      </div>
    </div>
  )
}

export default ProductDetails