import React from 'react';
import { useTheme } from '../../../../context/ThemeContext'; // Update with your theme context path
import './Category.css'
import Heading from '../../../Heading';
import useCategoryCollection from '@/hooks/useCategoryCollection';

const Category = () => {
  const { isDarkMode } = useTheme();
  const { categories } = useCategoryCollection();
  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <section className={`overflow-hidden max-w-[1440px] relative py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Heading Section */}
        <Heading heading='Categories' subheading='Discover products in popular collections' />

        {/* Scrolling Categories */}
        <div className="animate-scroll whitespace-nowrap flex gap-14 px-4">
          {[...categories, ...categories].map((category, index) => (
            <div
              key={index}
              className="inline-flex flex-col items-center gap-5 transform transition-all duration-300 hover:scale-105 group cursor-pointer"
            >
              <div className={`relative h-24 w-24 rounded-2xl overflow-hidden backdrop-blur-lg border ${isDarkMode
                ? 'bg-gray-800/30 border-gray-700 hover:bg-gray-800/50 hover:border-indigo-400'
                : 'bg-white/80 border-gray-200 hover:bg-white hover:border-blue-500'
                } shadow-lg transition-all`}>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className={`font-semibold text-lg tracking-tight transition-colors ${isDarkMode
                ? 'text-gray-200 group-hover:text-indigo-400'
                : 'text-gray-800 group-hover:text-blue-600'
                }`}>
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Category;