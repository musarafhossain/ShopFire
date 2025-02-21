import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '@/context/ThemeContext'
import LazyImage from '@/components/LazyImage'

const Logo = ({ className }) => {
    const { isDarkMode } = useTheme();
    return (
        <Link to='/'>
            <LazyImage
                src={`${isDarkMode ? '/logo-invert.png' : '/logo.png'}`}
                alt='Logo'
                className={`w-[170px] lg:w-[200px] py-1.5 rounded-xl bg-transparent ${className}`}
            />
        </Link>
    )
}

export default Logo