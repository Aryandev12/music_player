import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, darkTheme, lightTheme } from '../constants/themes';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = 'APP_THEME';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(darkTheme);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (savedTheme === 'light') {
        setThemeState(lightTheme);
        setIsDark(false);
      } else {
        setThemeState(darkTheme);
        setIsDark(true);
      }
    } catch (error) {
      console.log('Error loading theme:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = isDark ? lightTheme : darkTheme;
    setThemeState(newTheme);
    setIsDark(!isDark);
    saveTheme(newTheme.name);
  };

  const setTheme = (themeName: 'dark' | 'light') => {
    const newTheme = themeName === 'dark' ? darkTheme : lightTheme;
    setThemeState(newTheme);
    setIsDark(themeName === 'dark');
    saveTheme(themeName);
  };

  const saveTheme = async (themeName: 'dark' | 'light') => {
    try {
      await AsyncStorage.setItem(THEME_KEY, themeName);
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
