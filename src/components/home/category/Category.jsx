import React from 'react';
import { useTheme } from '../../../context/ThemeContext'; // Update with your theme context path
import './Category.css'

const categories = [
  { name: 'Electronics', image: 'https://cdn-icons-png.flaticon.com/512/324/324445.png' },
  { name: 'Fashion', image: 'https://cdn-icons-png.flaticon.com/512/3142/3142788.png' },
  { name: 'Home', image: 'https://cdn-icons-png.flaticon.com/512/2378/2378530.png' },
  { name: 'Sports', image: 'https://cdn-icons-png.flaticon.com/512/857/857455.png' },
  { name: 'Beauty', image: 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png' },
  { name: 'Books', image: 'https://cdn-icons-png.flaticon.com/512/2702/2702134.png' },
  { name: 'Toys', image: 'https://cdn-icons-png.flaticon.com/512/2832/2832997.png' },
  { name: 'Health', image: 'https://cdn-icons-png.flaticon.com/512/3053/3053995.png' },
];

const Category = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`overflow-hidden relative py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Heading Section */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h2 className={`text-5xl font-extrabold text-center pb-4 bg-gradient-to-r ${isDarkMode ? 'from-blue-400 to-indigo-500' : 'from-blue-600 to-indigo-700'} bg-clip-text text-transparent`}>
          Categories
        </h2>
        <p className={`text-lg text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Discover products in popular collections
        </p>
      </div>

      {/* Scrolling Categories */}
      <div className="animate-scroll whitespace-nowrap flex gap-14 px-4">
        {[...categories, ...categories].map((category, index) => (
          <div 
            key={index} 
            className="inline-flex flex-col items-center gap-5 transform transition-all duration-300 hover:scale-105 group cursor-pointer"
          >
            <div className={`relative h-24 w-24 rounded-2xl p-5 backdrop-blur-lg border ${
              isDarkMode 
                ? 'bg-gray-800/30 border-gray-700 hover:bg-gray-800/50 hover:border-indigo-400' 
                : 'bg-white/80 border-gray-200 hover:bg-white hover:border-blue-500'
            } shadow-lg transition-all`}>
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-contain"
              />
            </div>
            <span className={`font-semibold text-lg tracking-tight transition-colors ${
              isDarkMode 
                ? 'text-gray-200 group-hover:text-indigo-400' 
                : 'text-gray-800 group-hover:text-blue-600'
            }`}>
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;