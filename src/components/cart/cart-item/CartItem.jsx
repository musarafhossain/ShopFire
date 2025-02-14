import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import LazyImage from '../../LazyImage'
import AddToCart from '../../buttons/AddToCart';

const CartItem = ({ product, isLast }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isLast ? '' : 'border-b'} ${isDarkMode ? 'border-[#222]' : 'border-[#eeeeee]'} py-4 flex flex-col gap-4 text-left`}>
      <div className="flex gap-4">
        <LazyImage src={product.image} alt={product.name} className="w-24 h-24 rounded-lg" />
        <div className="flex flex-col gap-[1px]">
          <div className={`text-md ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-semibold`}>
            {product.name}
          </div>
          <div>
            <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              ₹{product.price}
              <span className={`text-sm line-through ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} ml-1`}>
                ₹{product.mrp}
              </span>
            </span>
          </div>
          <div
            className={`${isDarkMode ? 'bg-green-300/20 text-green-200' : 'bg-green-400/20 text-green-800'
              } rounded-md text-sm font-bold w-fit px-1`}
          >
            You Save ₹{parseFloat(product.mrp - product.price).toFixed(2)}
          </div>
          <div className="text-sm">
            <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Sold By :</span>
            <span className={`${isDarkMode ? 'text-gray-300' : ''} ml-1`}>{product.brand}</span>
          </div>
        </div>
      </div>
      <div className='flex justify-end items-center'>
        <AddToCart className='' />
      </div>
    </div>
  );
};

export default CartItem;
