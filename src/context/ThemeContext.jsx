import { createContext, useContext, useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'go_business_theme';
const ThemeContext = createContext(null);

const getSystemTheme = () => {
  if (window.matchMedia?.('(prefers-color-scheme: dark)')?.matches) {
    return 'dark';
  }

  return 'light';
};

const getInitialTheme = () => {
  let savedTheme = '';

  try {
    savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    savedTheme = '';
  }

  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return getSystemTheme();
};

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
};

export const ThemeProvider = ({ children }) => {
  const [theme, updateTheme] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      return;
    }
  }, [theme]);

  const setTheme = (nextTheme) => {
    if (nextTheme === 'light' || nextTheme === 'dark') {
      updateTheme(nextTheme);
    }
  };

  const toggleTheme = () => {
    updateTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return <ThemeContext.Provider value={{ setTheme, theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
