import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React from "react";
import { AnimatedPressable } from "./AnimatedPressable";

export const ThemeToggle: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <AnimatedPressable
      scaleTo={0.88}
      onPress={toggleColorScheme}
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
