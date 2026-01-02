import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    useCallback,
  } from "react";
  import type { ReactNode } from "react";
  
  export interface Theme {
    id: string;
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  }
  
  const lightTheme: Theme = {
    id: "light",
    name: "Light",
    primary: "#3b82f6",
    secondary: "#2563eb",
    accent: "#60a5fa",
    background: "#ffffff",
    surface: "#f9fafb",
    text: "#111827",
    textSecondary: "#6b7280",
  };
  
  const darkTheme: Theme = {
    id: "dark",
    name: "Dark",
    primary: "#60a5fa",
    secondary: "#3b82f6",
    accent: "#93c5fd",
    background: "#000000",
    surface: "#000000",
    text: "#e5e7eb",
    textSecondary: "#d1d5db",
  };
  
  interface ThemeContextType {
    currentTheme: Theme;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
  }
  
  const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
  
  export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  
    const currentTheme = useMemo(
      () => (isDarkMode ? darkTheme : lightTheme),
      [isDarkMode]
    );
  
    useEffect(() => {
      const savedDarkMode = localStorage.getItem("app-dark-mode");
      if (savedDarkMode !== null) {
        const parsedDarkMode = JSON.parse(savedDarkMode);
        setIsDarkMode(parsedDarkMode);
      }
    }, []);
  
    useEffect(() => {
      localStorage.setItem("app-dark-mode", JSON.stringify(isDarkMode));
  
      const root = document.documentElement;
      root.style.setProperty("--color-primary", currentTheme.primary);
      root.style.setProperty("--color-secondary", currentTheme.secondary);
      root.style.setProperty("--color-accent", currentTheme.accent);
      root.style.setProperty("--color-background", currentTheme.background);
      root.style.setProperty("--color-surface", currentTheme.surface);
      root.style.setProperty("--color-text", currentTheme.text);
      root.style.setProperty(
        "--color-text-secondary",
        currentTheme.textSecondary
      );
    }, [isDarkMode, currentTheme]);
  
    const toggleDarkMode = useCallback(() => {
      setIsDarkMode((prev) => !prev);
    }, []);
  
    const contextValue = useMemo(() => ({
      currentTheme,
      isDarkMode,
      toggleDarkMode,
    }), [currentTheme, isDarkMode, toggleDarkMode]);
  
    return (
      <ThemeContext.Provider value={contextValue}>
        {children}
      </ThemeContext.Provider>
    );
  };
  
  export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
      throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
  };