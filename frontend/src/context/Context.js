import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const themes = {
  lightTheme: {
    backgroundColor: "white",
    color: "#222222",
  },
  darkTheme: {
    backgroundColor: "#222222",
    color: "white",
  },
  lightComponent: {
    backgroundColor: "rgb(247, 247, 247)",
    color: "#2a2a2a",
  },
  darkComponent: {
    backgroundColor: "#2a2a2a",
    color: "rgb(247, 247, 247)",
  },
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const currentTheme = isDark ? themes.darkTheme : themes.lightTheme;
  const currentComponentTheme = isDark
    ? themes.darkComponent
    : themes.lightComponent;

  const toggleTheme = () => {
    localStorage.setItem("isDark", JSON.stringify(!isDark));
    setIsDark(!isDark);
  };

  useEffect(() => {
    const isDark = localStorage.getItem("isDark") === "true";
    setIsDark(isDark);
  }, []);

  return (
    <ThemeContext.Provider
      value={[{ isDark, currentTheme, currentComponentTheme }, toggleTheme]}
    >
      {children}
    </ThemeContext.Provider>
  );
};
