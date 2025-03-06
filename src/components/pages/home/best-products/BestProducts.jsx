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
    const { products, error } = useProducts();

    return (
        <div className={`py-12 md:py-16 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <section className="max-w-[1440px] mx-auto overflow-hidden">
                {/* Centered Heading */}
                <Heading heading='Best Selling Products' subheading='Discover our most loved items' />

                <div className="relative px-8">
                    <Swiper
                        modules={[Navigation, Pagination, FreeMode]}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 16,
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 32
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 32
                            },
                            1280: {
                                slidesPerView: 4,
                                spaceBetween: 32
                            }
                        }}
                        centeredSlides={false}
                        className="!overflow-visible"
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product.id}>
                                <Link to={`/product/${product.id}`} className='cursor-default'>
                                    <ProductCard product={product} />
                                </Link>
                            </SwiperSlide>
                        ))}

                        {/* Navigation Buttons */}
                        <div className={`swiper-button-prev ${isDarkMode ? '!text-gray-300' : '!text-gray-700'}`}></div>
                        <div className={`swiper-button-next ${isDarkMode ? '!text-gray-300' : '!text-gray-700'}`}></div>
                    </Swiper>
                </div>

                {/* View All Button */}
                <div className="mt-8 md:mt-12 flex justify-center items-center text-center">
                    <button className={`px-6 flex justify-center items-center gap-1 py-3 md:px-8 rounded-xl cursor-pointer text-sm md:text-lg font-medium transition-all
                                    ${isDarkMode
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'}
                                     text-white hover:shadow-lg`}>
                        View All Products
                        <svg
                            className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </button>
                </div>
            </section>

            <style>{`
                .swiper-button-prev,
                .swiper-button-next {
                    background-color: ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
                    backdrop-filter: blur(8px);
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }

                .swiper-button-prev{
                    left: -2%;
                }

                .swiper-button-next{
                    right: -2%;
                }
                
                .swiper-button-prev:hover,
                .swiper-button-next:hover {
                    background-color: ${isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'};
                }
                
                .swiper-button-prev::after,
                .swiper-button-next::after {
                    font-size: 1.2rem;
                    font-weight: bold;
                    color: ${isDarkMode ? '#fff' : '#374151'};
                }
                
                .swiper-pagination-bullet {
                    background: ${isDarkMode ? '#fff' : '#000'} !important;
                    opacity: 0;
                }
                
                .swiper-pagination-bullet-active {
                    opacity: 0;
                }
            `}</style>
        </div>
    );
};

export default BestProducts;