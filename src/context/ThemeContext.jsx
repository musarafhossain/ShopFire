import React, { createContext, useState, useContext } from 'react';

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
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
