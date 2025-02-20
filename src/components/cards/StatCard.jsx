import React from 'react';
import { IoArrowUpOutline, IoArrowDownOutline } from "react-icons/io5";
import { useTheme } from '../../context/ThemeContext';

const StatCard = ({ title, value, status = 0, icon, colorClass }) => {
    const { isDarkMode } = useTheme();
    
    return (
        <div className={`p-3 rounded-lg shadow-sm border hover:scale-105 duration-300 ${
            isDarkMode 
                ? 'bg-slate-800 border-slate-700' 
                : 'bg-white border-gray-100'
        }`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                        {title}
                    </p>
                    <p className={`text-2xl font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                        {value}
                    </p>
                </div>
                <div className={`p-3 rounded-full ${colorClass} ${
                    isDarkMode ? 'bg-opacity-30' : 'bg-opacity-20'
                }`}>
                    {icon}
                </div>
            </div>
            <div className="mt-4">
                <p className={`text-sm flex items-center gap-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                    <span className={`flex items-center ${
                        status >= 0 
                            ? 'text-green-500 bg-green-500/20' 
                            : 'text-red-500 bg-red-500/20'
                    } w-fit px-2 gap-1 rounded-xl`}>
                        {status >= 0 ?
                            <IoArrowUpOutline className='h-4 w-4 font-thin' /> : 
                            <IoArrowDownOutline className='h-4 w-4 font-thin' />
                        } {status}%
                    </span>
                    <span className='truncate'>in this past month</span>
                </p>
            </div>
        </div>
    );
};

export default StatCard;