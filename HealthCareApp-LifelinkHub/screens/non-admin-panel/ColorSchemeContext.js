// ColorSchemeContext.js
import React, { createContext, useContext, useState } from 'react';
import { Appearance } from 'react-native';

const ColorSchemeContext = createContext();

export const ColorSchemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  const toggleColorScheme = () => {
    const newColorScheme = colorScheme === 'dark' ? 'light' : 'dark';
    Appearance.setColorScheme(newColorScheme);
    setColorScheme(newColorScheme); 
  };

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
};

export const useColorScheme = () => useContext(ColorSchemeContext);
