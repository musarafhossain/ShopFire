import React from 'react'
import { useTheme } from '../../../context/ThemeContext';

const BillingSection = () => {
    const { isDarkMode } = useTheme();
    return (
        <div className={` md:w-[40%] lg:w-[30%] w-full p-10 ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '} border rounded-2xl`}>
            BillingSection
        </div>
    )
}

export default BillingSection