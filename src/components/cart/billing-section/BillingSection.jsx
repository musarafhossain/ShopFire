import React from 'react'
import { useTheme } from '../../../context/ThemeContext';

const BillingSection = () => {
    const { isDarkMode } = useTheme();
    return (
        <div className={`md:w-[40%] lg:w-[30%] w-full text-left flex flex-col gap-4`}>
            {/* Payment Details Box */}
            <div className={`${isDarkMode ? 'border-[#2f2f2f]' : 'border-[#dcdada]'} border rounded-2xl p-4`}>
                <h1 className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold text-md mx-2`}>Payment Details</h1>
                <div className='mx-2 my-4 flex flex-col gap-2'>
                    <p className={`flex items-center justify-between border-b pb-1 ${isDarkMode ? 'border-[#444444]' : 'border-[#dbdbdb]'}`}>
                        <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-md font-semibold`}>MRP Total</span>
                        <span className='text-lg'>₹249.00</span>
                    </p>
                    <p className={`flex items-center justify-between border-b py-1 ${isDarkMode ? 'border-[#444444]' : 'border-[#dbdbdb]'}`}>
                        <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-md font-semibold`}>Product Discount</span>
                        <span className='text-md text-green-500 font-bold'>-₹134.00</span>
                    </p>
                    <p className={`flex items-center justify-between border-b py-1 ${isDarkMode ? 'border-[#444444]' : 'border-[#dbdbdb]'}`}>
                        <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-md font-semibold`}>Delivery Fee (Scheduled)</span>
                        <span className='text-md text-green-500 font-bold'>FREE</span>
                    </p>
                    <p className={`flex items-center justify-between py-1 ${isDarkMode ? 'border-[#444444]' : ''}`}>
                        <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-md font-semibold`}>Total</span>
                        <span className='text-md font-bold'>₹114.00</span>
                    </p>
                    <p className={`${isDarkMode ? 'text-green-400' : 'text-green-500'} text-end text-md font-bold`}>You Saved ₹134.00</p>
                </div>
            </div>

            {/* Desktop "Place Order" Button */}
            <button className={`w-full hidden md:block mx-auto py-3 cursor-pointer rounded-4xl text-lg font-semibold 
                ${isDarkMode ? 'bg-indigo-500 text-white hover:bg-indigo-400' : 'bg-indigo-500 text-white hover:bg-indigo-400'}`}>
                Place Order
            </button>

            {/* Mobile Footer */}
            <div className={`md:hidden fixed w-full bottom-0 left-0 ${isDarkMode ? 'bg-[#2f2f2f]' : 'bg-gray-100'} flex shadow-lg justify-between items-center py-2 px-4`}>
                <div className='flex flex-col'>
                    <p className='text-md font-bold'>₹114.00</p>
                    <p className={`${isDarkMode ? 'text-green-400' : 'text-green-500'} text-md font-bold`}>You Saved ₹134.00</p>
                </div>
                <button className={`px-10 py-2 cursor-pointer rounded-4xl text-md font-semibold 
                    ${isDarkMode ? 'bg-indigo-500 text-white hover:bg-indigo-400' : 'bg-indigo-500 text-white hover:bg-indigo-400'}`}>
                    Place Order
                </button>
            </div>
        </div>
    )
}

export default BillingSection
