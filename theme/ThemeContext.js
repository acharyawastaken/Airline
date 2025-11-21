// theme/ThemeContext.js
import React, { createContext, useContext, useState, useMemo } from 'react';
import lightTheme from './lightTheme';
import darkTheme from './darkTheme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => setIsDark(prev => !prev);

  const value = useMemo(
    () => ({ theme, isDark, toggleTheme }),
    [theme, isDark]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => useContext(ThemeContext);
