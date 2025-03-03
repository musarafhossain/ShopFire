import React, { useState } from 'react'
import { useTheme } from '../../../../context/ThemeContext'
import Rating from '../../../Rating';
import { FiStar, FiThumbsUp, FiThumbsDown, FiClock, FiUser } from 'react-icons/fi';
import LazyImage from '../../../LazyImage';

const ProductDetails = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]?.size || '');
  const { isDarkMode } = useTheme();
  return (
    <div className='md:w-[50%] sm:py-4 mb-4 px-4 lg:px-2 text-left flex flex-col gap-4'>
      <div className={`border ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '} rounded-xl p-4 flex flex-col gap-2`}>
        <h1 className={`font-semibold ${isDarkMode ? ' text-gray-200 ' : ' text-gray-900 '}`}>{product?.brand}</h1>
        <h1 className='text-gray-500 text-lg font-semibold'>{product?.name}</h1>
        <div className='flex items-baseline gap-2'>
          <p className='text-3xl'>₹{product?.price}</p>
          <p className='text-xl line-through text-gray-500'>₹{product?.mrp}</p>
        </div>
        <Rating rating={product?.rating} />
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
        <h1 className={`text-lg font-bold ${isDarkMode ? ' text-[#c2c2c2] ' : ' text-[#373737] '} ${selectedSize === product?.size && 'border-indigo-700 bg-indigo-500/20 text-indigo-700'}`}>Select Size</h1>
        <div className='flex gap-2 flex-wrap'>
          {product?.sizes?.map((item, index) => (
            <button
              key={index}
              disabled={item.stock === "0"}
              className={`border text-lg cursor-pointer w-16 ${isDarkMode ? ' border-[#2f2f2f] disabled:text-gray-700 ' : ' border-[#dcdada] disabled:text-gray-400 '} px-3 disabled:cursor-not-allowed duration-300 not-disabled:hover:border-indigo-700 font-semibold py-1 rounded-3xl ${selectedSize === item.size ? 'border-indigo-700 bg-indigo-500/20 text-indigo-700' : ''}`}
            >
              {item.size}
            </button>
          ))}
        </div>
      </div>
      <div className={`border ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '} rounded-xl p-4 flex flex-col gap-2`}>
        <h1 className={`text-lg font-bold ${isDarkMode ? ' text-[#c2c2c2] ' : ' text-[#373737] '}`}>Product Details</h1>
        <div className={`text-gray-500 font-semibold flex flex-col gap-1`}>
          {product?.productDetails.map((detail, index) => (
            <p
              key={index}
              className={`pb-1 ${index !== product?.productDetails.length - 1 ?
                (isDarkMode ? 'border-[#222] border-b' : 'border-[#eeeeee] border-b') : ''} flex`}
            >
              <span className='flex-1'>{detail.key}</span>
              <span className={`${isDarkMode ? ' text-gray-400 ' : ' text-gray-700 '} flex-1 lg:flex-2`}>: {detail.value}</span>
            </p>
          ))}
        </div>
      </div>

      <div className={`border ${isDarkMode ? 'border-[#2f2f2f]' : 'border-[#dcdada]'} rounded-xl p-4 flex flex-col gap-2`}>
        <h1 className={`text-lg font-bold ${isDarkMode ? 'text-[#c2c2c2]' : 'text-[#373737]'}`}>Product Ratings & Reviews</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side */}
          <div className={`flex-1 flex flex-col items-center justify-center gap-2 border-r ${isDarkMode ? 'border-[#2f2f2f]' : 'border-[#dcdada]'}`}>
            <div className="flex items-center gap-1">
              <span className={`text-4xl font-bold ${isDarkMode ? 'text-[#c2c2c2]' : 'text-[#373737]'}`}>3.9</span>
              <FiStar className={`w-6 h-6 ${isDarkMode ? 'text-[#c2c2c2]' : 'text-[#373737]'}`} />
            </div>
            <p className={`${isDarkMode ? 'text-[#c2c2c2]' : 'text-[#373737]'}`}>2153 Ratings</p>
            <p className={`${isDarkMode ? 'text-[#c2c2c2]' : 'text-[#373737]'}`}>556 Reviews</p>
          </div>

          {/* Right Side */}
          <div className="flex-1 flex flex-col gap-3">
            {[
              { label: 'Excellent', value: 1187, color: 'bg-green-500', width: (1187 / 2153) * 100 },
              { label: 'Very Good', value: 337, color: 'bg-green-500', width: (337 / 2153) * 100 },
              { label: 'Good', value: 224, color: 'bg-yellow-500', width: (224 / 2153) * 100 },
              { label: 'Average', value: 82, color: 'bg-orange-500', width: (82 / 2153) * 100 },
              { label: 'Poor', value: 323, color: 'bg-red-500', width: (323 / 2153) * 100 },
            ].map((item, index) => (
              <div key={index} className="flex flex-col gap-1 font-bold">
                <div className="flex justify-between">
                  <span className={`${isDarkMode ? 'text-[#c2c2c2]' : 'text-[#4a4a4a]'}`}>{item.label}</span>
                  <span className={`${isDarkMode ? 'text-[#c2c2c2]' : 'text-[#4a4a4a]'}`}>{item.value}</span>
                </div>
                <div className={`h-2 rounded-full ${isDarkMode ? 'bg-[#2f2f2f]' : 'bg-gray-200'}`}>
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${item.width}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`mt-6 flex flex-col gap-4 ${isDarkMode ? 'text-[#c2c2c2]' : 'text-[#373737]'}`}>
          {/* Single Review Block */}
          <div className={`p-4 border-t ${isDarkMode ? 'border-[#2f2f2f]' : 'border-[#dcdada]'} `}>
            {/* User Info Section */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                {/* User Icon */}
                <div className={`p-2 rounded-full ${isDarkMode ? 'bg-[#2f2f2f]' : 'bg-gray-200'}`}>
                  <FiUser className="w-4 h-4" />
                </div>
                {/* Name and Rating */}
                <div>
                  <h3 className="font-semibold">John D.</h3>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(4)].map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                    <FiStar className="w-4 h-4 text-yellow-500" />
                  </div>
                </div>
              </div>
              {/* Date */}
              <div className="flex items-center gap-1 text-sm">
                <FiClock className="w-4 h-4" />
                <span>2 days ago</span>
              </div>
            </div>

            {/* Review Text */}
            <p className="mb-4">
              This product exceeded my expectations! The quality is amazing and it arrived much
              faster than I anticipated. Would definitely recommend to others.
            </p>

            {/* Product Images */}
            <div className="flex gap-3 mb-4">
              {[1, 2, 3].map((img) => (

                <LazyImage
                  key={img}
                  src={`https://picsum.photos/id/100/200/300`}
                  alt="Product"
                  className="w-20 h-20 object-cover rounded-lg border border-[#dcdada]"
                />
              ))}
            </div>

            {/* Like/Dislike Buttons */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                <FiThumbsUp className="w-5 h-5" />
                <span>24</span>
              </button>
              <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                <FiThumbsDown className="w-5 h-5" />
                <span>2</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails