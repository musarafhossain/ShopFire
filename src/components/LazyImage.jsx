import React, { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useTheme } from '../context/ThemeContext';

const LazyImage = ({ src, alt, className, onClick }) => {
    const { isDarkMode } = useTheme();
    const [isLoaded, setIsLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const img = new Image();
        img.src = src;
        img.onload = () => {
            if (isMounted) {
                setImageSrc(src);
                setIsLoaded(true);
                setHasError(false);
            }
        };
        img.onerror = () => {
            if (isMounted) {
                setHasError(true);
                setIsLoaded(false);
            }
        };
        return () => {
            isMounted = false;
        };
    }, [src]);

    return (
        <>
            {!isLoaded && !hasError && <LoadingSpinner className={className} />}
            {hasError && <div className={`${className} border ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '} text-center`} onClick={onClick}>Failed to load image</div>}
            {isLoaded && <img src={imageSrc} alt={alt} className={className} onClick={onClick} />}
        </>
    );
};

export default LazyImage;