import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a Context
const ThemeContext = createContext();

// Custom hook to use the ThemeContext
export const useTheme = () => {
  return useContext(ThemeContext);
};

// ThemeProvider component to wrap the part of the app that needs theme state
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    // Toggle the theme and update the background color
    if (isDarkMode) {
      document.body.style.backgroundColor = 'white'; 
      document.body.style.color = 'black';

    } else {
      document.body.style.backgroundColor = 'black'; 
      document.body.style.color = 'white';
    }
    setIsDarkMode(prevMode => !prevMode); 
  };


  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
