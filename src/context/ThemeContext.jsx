import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a Context
const ThemeContext = createContext();

// Custom hook to use the ThemeContext
export const useTheme = () => {
  return useContext(ThemeContext);
};

// ThemeProvider component to wrap the part of the app that needs theme state
export const ThemeProvider = ({ children }) => {
  const savedTheme = localStorage.getItem('isDarkMode');
  const [isDarkMode, setIsDarkMode] = useState(savedTheme === 'true');

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    if (newTheme) {
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
    } else {
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
    }

    setIsDarkMode(newTheme);
    localStorage.setItem('isDarkMode', newTheme);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
    } else {
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
