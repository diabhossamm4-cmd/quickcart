import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useCartStore } from "../../store/cartStore";
import { useThemeStore } from "../../store/themeStore";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showCart?: boolean;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title = "QuickCart",
  showBack = false,
  showCart = true,
  rightAction,
}) => {
  const router = useRouter();
  const totalCartItems = useCartStore((state) => state.getTotalCount());
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
      <View className="flex-row items-center flex-1">
        {showBack ? (
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center rounded-full bg-gray-100 dark:bg-slate-800 mr-2 border border-gray-200/50 dark:border-slate-700/60"
          >
            <Feather name="arrow-left" size={18} color={isDark ? "#F8FAFC" : "#1F2937"} />
          </TouchableOpacity>
        ) : null}
        <Text className="text-xl font-black text-gray-900 dark:text-white tracking-tight" numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View className="flex-row items-center">
        {rightAction}

        {/* Dark Mode Switcher */}
        <ThemeToggle />

        {showCart && (
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/cart" as any)}
            className="w-10 h-10 items-center justify-center rounded-full bg-gray-100 dark:bg-slate-800 relative ml-2.5 border border-gray-200/50 dark:border-slate-700/60 shadow-sm"
          >
            <Feather name="shopping-bag" size={18} color={isDark ? "#F8FAFC" : "#1F2937"} />
            {totalCartItems > 0 && (
              <View className="absolute -top-1 -right-1 bg-blue-600 rounded-full min-w-[18px] h-[18px] items-center justify-center px-1 shadow-sm">
                <Text className="text-white text-[10px] font-black">
                  {totalCartItems > 99 ? "99+" : totalCartItems}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
