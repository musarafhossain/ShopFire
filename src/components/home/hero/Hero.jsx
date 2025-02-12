import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import Lottie from 'lottie-react';
import animationData from '../../../assets/Lottie/home/Hero_Lottie.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { isDarkMode } = useTheme();
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const lottieRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power4.out', duration: 1.2 },
    });

    // Animate text elements
    tl.fromTo(
      headingRef.current?.children,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        delay: 0.3,
      }
    )
    .fromTo(
      textRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0 },
      '-=0.8'
    )
    .fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1 },
      '-=0.5'
    );

    // Animate Lottie container
    const lottieTl = gsap.timeline({
      scrollTrigger: {
        trigger: lottieRef.current,
        start: 'top center',
      },
    });

    lottieTl.fromTo(
      lottieRef.current,
      { x: 100, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 1.4 }
    );

    // Hover animation for Lottie container
    gsap.to(lottieRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // Cleanup
    return () => {
      tl.kill();
      lottieTl.kill();
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className={`min-h-fit transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 via-blue-100 to-gray-50'
      }`}
    >
      <section className='max-w-[1440px]'>
        <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left mb-12 lg:mb-0 lg:mr-12">
            <h1 
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight overflow-hidden"
            >
              <span className={`inline-block bg-clip-text text-transparent bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-blue-400 to-purple-400' 
                  : 'from-blue-600 to-purple-600'
              }`}>
                Ignite Your Shopping Experience
              </span>
              <br />
              <span className={`inline-block ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                with ShopFire!
              </span>
            </h1>
            
            <p 
              ref={textRef}
              className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto lg:mx-0 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Discover the hottest deals, latest trends, and premium products—all in one place.
            </p>

            <div className="group relative inline-block">
              <a 
                ref={buttonRef}
                href="#" 
                className={`inline-flex items-center justify-center px-8 py-4 text-lg font-semibold transition-all duration-200 rounded-lg hover:shadow-xl hover:scale-105 ${
                  isDarkMode
                    ? 'text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                    : 'text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                }`}
              >
                Shop Now
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
              </a>
              <div className={`absolute inset-0 blur-2xl -z-10 group-hover:opacity-40 transition-opacity ${
                isDarkMode ? 'bg-white/10' : 'bg-blue-400/20'
              }`} />
            </div>
          </div>

          {/* Lottie Animation */}
          <div 
            ref={lottieRef}
            className="flex-1 max-w-2xl lg:max-w-3xl xl:max-w-4xl"
          >
            <div className={`relative rounded-2xl p-4 backdrop-blur-sm border ${
              isDarkMode 
                ? 'bg-blue-900/20 border-white/10' 
                : 'bg-white/30 border-gray-200'
            }`}>
              <div className={`aspect-square rounded-xl flex items-center justify-center ${
                isDarkMode ? 'bg-gray-800/30' : 'bg-white/50'
              }`}>
                <Lottie animationData={animationData} loop={true} />
              </div>
              <div className={`absolute inset-0 border rounded-2xl pointer-events-none ${
                isDarkMode ? 'border-blue-400/30' : 'border-blue-300/30'
              }`} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;