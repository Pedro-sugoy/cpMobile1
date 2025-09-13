import React, { createContext, useState, useContext } from 'react';
import { Appearance } from 'react-native';

// Criação do contexto
const ThemeContext = createContext();

// Definindo os temas
const lightTheme = {
  mode: 'light',
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
};

const darkTheme = {
  mode: 'dark',
  backgroundColor: '#000000',
  textColor: '#FFFFFF',
};

// Provedor do tema
export const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance.getColorScheme(); // Detecta o tema do sistema
  const [theme, setTheme] = useState(colorScheme === 'dark' ? darkTheme : lightTheme);

  // Alternador de tema manual (opcional)
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme.mode === 'light' ? darkTheme : lightTheme
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook customizado para usar o tema
export const useTheme = () => useContext(ThemeContext);
