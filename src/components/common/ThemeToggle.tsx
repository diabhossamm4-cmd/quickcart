import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React from "react";
import { useThemeStore } from "../../store/themeStore";
import { AnimatedPressable } from "./AnimatedPressable";

export const ThemeToggle: React.FC = () => {
  const { setColorScheme } = useColorScheme();
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const isDark = theme === "dark";

  const handleToggle = () => {
    const next = isDark ? "light" : "dark";
    toggleTheme();
    setColorScheme(next);
  };

  return (
    <AnimatedPressable
      scaleTo={0.88}
      onPress={handleToggle}
      className="w-10 h-10 items-center justify-center rounded-full bg-gray-100 dark:bg-slate-800 border border-gray-200/50 dark:border-slate-700/60 ml-2 shadow-sm"
    >
      <Feather
        name={isDark ? "sun" : "moon"}
        size={18}
        color={isDark ? "#F59E0B" : "#4B5563"}
      />
    </AnimatedPressable>
  );
};
