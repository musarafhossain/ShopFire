import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../../context/ThemeContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode } from 'swiper/modules';
import ProductCard from '../../../cards/ProductCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import Heading from '../../../Heading';
import useProducts from "@/hooks/useProducts";

const BestProducts = () => {
    const { isDarkMode } = useTheme();
    const { products } = useProducts();

    const [swiperRef, setSwiperRef] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (swiperRef) {
            swiperRef.on('slideChange', () => {
                setActiveIndex(swiperRef.activeIndex);
            });
        }
    }, [swiperRef]);

    return (
        <div className={`py-12 md:py-16 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <section className="max-w-[1440px] mx-auto overflow-hidden">
                <Heading heading='Best Selling Products' subheading='Discover our most loved items' />

                <div className="relative px-8">
                    {/* Navigation Buttons */}
                    <button
                        className={`swiper-button-prev absolute top-1/2 transform -translate-y-1/2 z-10
                                    ${activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                                    ${isDarkMode ? '!text-gray-300' : '!text-gray-700'}`}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (swiperRef && activeIndex > 0) swiperRef.slidePrev();
                        }}
                        disabled={activeIndex === 0}
                    >
                    </button>

                    <Swiper
                        modules={[Navigation, Pagination, FreeMode]}
                        onSwiper={setSwiperRef} // Get Swiper instance
                        pagination={{ clickable: true, dynamicBullets: true }}
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 16 },
                            640: { slidesPerView: 2, spaceBetween: 32 },
                            1024: { slidesPerView: 3, spaceBetween: 32 },
                            1280: { slidesPerView: 4, spaceBetween: 32 }
                        }}
                        className="!overflow-visible"
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product.id}>
                                <Link to={`/product/${product.id}`} className="cursor-default">
                                    <ProductCard product={product} />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button
                        className={`swiper-button-next absolute top-1/2 transform -translate-y-1/2 z-10
                                    ${activeIndex === products.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}
                                    ${isDarkMode ? '!text-gray-300' : '!text-gray-700'}`}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (swiperRef && activeIndex < products.length - 1) swiperRef.slideNext();
                        }}
                        disabled={activeIndex === products.length - 1}
                    >
                    </button>
                </div>
            </section>
            <style>{`
                /* Hide pagination bullets */
                .swiper-pagination {
                    display: none !important;
                }
            `}</style>
        </div>
    );
};

export default BestProducts;
