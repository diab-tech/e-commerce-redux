import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const ThemeInitializer: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    const applyTheme = () => {
      const isDark =
        theme === "dark" ||
        (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
      document.documentElement.classList.toggle("dark", isDark);
    };

    applyTheme();

    // إضافة listener لتغييرات prefers-color-scheme
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme();
      }
    };
    mediaQuery.addEventListener("change", handleChange);

    // تنظيف الـ listener
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);

  return null;
};

export default ThemeInitializer;
