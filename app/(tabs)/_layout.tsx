import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { Platform, Text, View } from "react-native";
import { useCartStore } from "../../src/store/cartStore";

export default function TabLayout() {
  const totalCartItems = useCartStore((state) => state.getTotalCount());
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: isDark ? "#60A5FA" : "#2563EB",
        tabBarInactiveTintColor: isDark ? "#64748B" : "#9CA3AF",
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          height: 66,
          borderRadius: 33,
          backgroundColor: isDark
            ? Platform.OS === "web"
              ? "rgba(15, 23, 42, 0.88)"
              : "#0F172A"
            : Platform.OS === "web"
              ? "rgba(255, 255, 255, 0.88)"
              : "#FFFFFF",
          borderWidth: 1,
          borderColor: isDark ? "rgba(51, 65, 85, 0.8)" : "rgba(229, 231, 235, 0.8)",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: isDark ? 0.35 : 0.1,
          shadowRadius: 20,
          elevation: 10,
          paddingBottom: 8,
          paddingTop: 8,
          ...(Platform.OS === "web" ? ({ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" } as any) : {}),
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size - 1} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" size={size - 1} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={size - 1} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size }) => (
            <View className="relative">
              <Feather name="shopping-bag" size={size - 1} color={color} />
              {totalCartItems > 0 && (
                <View className="absolute -top-1.5 -right-2.5 bg-blue-600 rounded-full min-w-[17px] h-[17px] items-center justify-center px-1 shadow-sm">
                  <Text className="text-white text-[9px] font-black">
                    {totalCartItems > 99 ? "99+" : totalCartItems}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size - 1} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
