import React from 'react';
import { useTheme } from '../../../context/ThemeContext'; // Update with your theme context path

const BestProducts = () => {
    const { isDarkMode } = useTheme();

    const products = [
        {
            id: 1,
            name: 'Wireless Headphones',
            price: 299.99,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            category: 'Electronics',
            rating: 4.8
        },
        {
            id: 2,
            name: 'Smart Watch Pro',
            price: 199.99,
            image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            category: 'Wearables',
            rating: 4.6
        },
        {
            id: 3,
            name: 'Modern Sofa',
            price: 899.99,
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            category: 'Furniture',
            rating: 4.9
        },
        {
            id: 4,
            name: 'Designer Sunglasses',
            price: 159.99,
            image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            category: 'Fashion',
            rating: 4.7
        },
    ];

    return (
        <div className={`py-16 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-10'}`}>
            <section className="max-w-[1440px] mx-auto">
                {/* Centered Heading */}
                <div className="text-center mb-8 md:mb-16">
                    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r 
            ${isDarkMode ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'} 
            bg-clip-text text-transparent mb-2 md:mb-4`}>
                        Best Selling Products
                    </h2>
                    <p className={`text-base md:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Discover our most loved items
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className={`relative rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] group
                ${isDarkMode ? 'bg-gray-800 shadow-md' : 'bg-white shadow-sm'} md:shadow-lg`}
                        >
                            <div className="relative aspect-square">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover object-center"
                                />
                                {/* Product Badge */}
                                <div className="absolute top-2 right-2 md:top-4 md:right-4 flex items-center gap-1 px-2 py-0.5 md:px-3 md:py-1 
                  bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-xs md:text-sm">
                                    ⭐ {product.rating}
                                </div>
                            </div>

                            <div className="p-3 md:p-6">
                                <span className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {product.category}
                                </span>
                                <h3 className={`mt-1 md:mt-2 text-base md:text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {product.name}
                                </h3>
                                <div className="mt-2 md:mt-4 flex justify-between items-center gap-2">
                                    <span className={`text-lg md:text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                        ${product.price}
                                    </span>
                                    <button className={`px-2 py-1 md:px-4 md:py-2 rounded-md md:rounded-lg text-xs md:text-base transition-all
                    ${isDarkMode
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white'
                                            : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white'}`}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-8 md:mt-12 text-center">
                    <button className={`px-6 py-2 md:px-8 md:py-3 rounded-full text-base md:text-lg font-medium transition-all
            ${isDarkMode
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-purple-glow'
                            : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg'}`}>
                        View All Products
                    </button>
                </div>
            </section>

            <style jsx>{`
        .text-transparent {
          color: transparent;
        }
        @keyframes purple-glow {
          0% { box-shadow: 0 0 20px rgba(168, 85, 247, 0); }
          50% { box-shadow: 0 0 30px rgba(168, 85, 247, 0.4); }
          100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0); }
        }
        .hover\:shadow-purple-glow:hover {
          animation: purple-glow 1.5s infinite;
        }
      `}</style>
        </div>
    );
};

export default BestProducts;