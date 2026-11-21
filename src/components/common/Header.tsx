import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useCartStore } from "../../store/cartStore";

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

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
      <View className="flex-row items-center flex-1">
        {showBack ? (
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center rounded-full bg-gray-50 mr-2"
          >
            <Feather name="arrow-left" size={20} color="#1F2937" />
          </TouchableOpacity>
        ) : null}
        <Text className="text-xl font-bold text-gray-900 tracking-tight" numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View className="flex-row items-center space-x-2">
        {rightAction}

        {showCart && (
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/cart" as any)}
            className="w-10 h-10 items-center justify-center rounded-full bg-gray-50 relative ml-2"
          >
            <Feather name="shopping-bag" size={20} color="#1F2937" />
            {totalCartItems > 0 && (
              <View className="absolute -top-1 -right-1 bg-blue-600 rounded-full min-w-[18px] h-[18px] items-center justify-center px-1">
                <Text className="text-white text-[10px] font-bold">
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
