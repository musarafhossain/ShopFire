import React, { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const LazyImage = ({ src, alt, className }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const img = new Image();
        img.src = src;
        img.onload = () => {
            if (isMounted) {
                setImageSrc(src);
                setIsLoaded(true);
            }
        };
        return () => {
            isMounted = false;
        };
    }, [src]);

    return (
        <>
            {!isLoaded && <LoadingSpinner />}
            {isLoaded && <img src={imageSrc} alt={alt} className={className} />}
        </>
    );
};

export default LazyImage;