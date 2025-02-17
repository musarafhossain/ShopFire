import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import LazyImage from '../../LazyImage'
import { FaAnglesRight } from "react-icons/fa6";

const ProductCatalog = () => {
    const imgs = [
        'https://picsum.photos/id/100/200/300',
        'https://picsum.photos/id/101/200/300',
        'https://picsum.photos/id/102/200/300',
        'https://picsum.photos/id/103/200/300',
        'https://picsum.photos/id/104/200/300',
        'https://picsum.photos/id/105/200/300',
        'https://picsum.photos/id/106/200/300',
        'https://picsum.photos/id/107/200/300',
    ];

    return (
        <div className='w-[50%] py-4'>
            <div className='flex gap-3'>
                <div className='w-fit flex flex-col gap-2 items-center relative'>
                    <button className="custom-prev py-1 rounded-lg border border-[#ccc] w-full cursor-pointer">
                        ▲
                    </button>
                    <div className='h-[350px] w-[80px]'>
                        <Swiper
                            direction="vertical"
                            spaceBetween={5}
                            slidesPerView={4}
                            slidesPerGroup={4}
                            navigation={{
                                nextEl: ".custom-next",
                                prevEl: ".custom-prev",
                            }}
                            pagination={false}
                            modules={[Navigation, Pagination]}
                            style={{ height: "100%" }}
                        >
                            {imgs.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <LazyImage
                                        src={img}
                                        alt={`Image ${index}`}
                                        className="rounded-lg w-full aspect-square"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <button className="custom-next py-1 rounded-lg border border-[#ccc] w-full cursor-pointer">
                        ▼
                    </button>
                </div>
                <div className='w-full border border-[#ccc] rounded-xl'>
                    <LazyImage
                        src={imgs[0]}
                        alt="Main Image"
                        className="h-[500px] object-cover"
                    />
                </div>
            </div>
            <div className='flex justify-end gap-2 items-center mt-5'>
                <button className='w-[180px] py-2 border border-indigo-600 rounded-md text-indigo-600 text-lg cursor-pointer'>Add to Cart</button>
                <button className='w-[180px] py-2 bg-indigo-600 rounded-md text-white font-semibold text-lg cursor-pointer flex justify-center items-center gap-3'>
                    <FaAnglesRight size={20}/>
                    <span>Buy Now</span>
                </button>
            </div>
        </div>
    )
}

export default ProductCatalog;
