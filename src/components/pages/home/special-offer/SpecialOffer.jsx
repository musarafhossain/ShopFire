import React, { useState } from 'react';
import { FiGift, FiTag, FiCopy, FiCheck } from 'react-icons/fi';
import { useTheme } from '../../../../context/ThemeContext';
import './SpecialOffer.css';
import OfferLottie from '../../../../assets/Lottie/home/Offer_Lottie.json'
import Lottie from 'lottie-react';

const SpecialOffer = () => {
    const { isDarkMode } = useTheme();
    const [copied, setCopied] = useState(false);

    const handleCopyCode = () => {
        navigator.clipboard.writeText('OFFER90');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`relative ${isDarkMode
            ? 'bg-gradient-to-r from-purple-900/80 to-yellow-900/80'
            : 'bg-gradient-to-r from-blue-400/20 to-orange-400/20'
            }`}>
                {/* <div class="ribbon">Special <br />Offer</div>  */}
            <section className={`relative overflow-hidden max-w-[1440px] flex justify-center items-center p-8 transition-all duration-300 `}>
                {/* Left Lottie - Hidden on mobile */}
                <div className="hidden md:block w-1/4 max-w-[300px]">
                    <Lottie
                        loop
                        animationData={OfferLottie}
                        className="w-full h-auto"
                    />
                </div>
                <div className="flex-1 space-y-4">
                    <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r ${isDarkMode
                        ? 'from-pink-400 to-indigo-400'
                        : 'from-pink-600 to-orange-600'
                        } bg-clip-text text-transparent inline-block animate-shine`}>
                        90% OFF
                    </h2>

                    <div className={`p-6 rounded-2xl w-fit text-center ${isDarkMode
                        ? 'bg-indigo-800/40 backdrop-blur-lg'
                        : 'bg-white/90 backdrop-blur-sm'
                        } shadow-lg`}>
                        <FiGift className={`w-16 h-16 ${isDarkMode ? 'text-indigo-400' : 'text-pink-500'
                            } animate-pulse`} />
                    </div>

                    <p className={`flex items-center justify-center gap-3 text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-800'
                        }`}>
                        <FiTag className="flex-shrink-0" />
                        Use code:
                        <span className="font-mono font-bold">OFFER90</span>
                    </p>
                    <button className="button-82-pushable" role="button" onClick={handleCopyCode}>
                        <span className="button-82-shadow"></span>
                        <span className="button-82-edge"></span>
                        <span className="button-82-front text">
                            {copied ? <FiCheck /> : <FiCopy />}
                            {copied ? 'Copied!' : 'Copy Code'}
                        </span>
                    </button>
                </div>
                {/* Right Lottie - Hidden on mobile */}
                <div className="hidden md:block w-1/4 max-w-[300px]">
                    <Lottie
                        loop
                        animationData={OfferLottie}
                        className="w-full h-auto"
                    />
                </div>
            </section>
        </div>
    );
};

export default SpecialOffer;