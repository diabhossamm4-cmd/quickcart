import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useCartStore } from "../../store/cartStore";
import { CartItem } from "../../types";
import { formatCurrency } from "../../utils/formatters";
import { AnimatedPressable } from "../common/AnimatedPressable";

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <View className="flex-row items-center bg-white dark:bg-slate-900 p-3.5 rounded-3xl mb-3 border border-gray-100 dark:border-slate-800 shadow-sm">
      {/* Product thumbnail */}
      <Image
        source={{ uri: item.product.images[0] }}
        className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-slate-800"
        resizeMode="cover"
      />

      {/* Details */}
      <View className="flex-1 ml-3.5">
        <View className="flex-row items-start justify-between">
          <Text
            numberOfLines={1}
            className="text-sm font-bold text-gray-900 dark:text-white flex-1 mr-2"
          >
            {item.product.title}
          </Text>
          <TouchableOpacity
            onPress={() => removeFromCart(item.id)}
            className="p-1"
          >
            <Feather name="trash-2" size={16} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Selected options */}
        <View className="flex-row items-center mt-1">
          {item.selectedSize && (
            <Text className="text-xs text-gray-400 dark:text-slate-400 mr-2 font-medium">
              Size: {item.selectedSize}
            </Text>
          )}
          {item.selectedColor && (
            <View className="flex-row items-center">
              <Text className="text-xs text-gray-400 dark:text-slate-400 mr-1 font-medium">Color:</Text>
              <View
                className="w-3.5 h-3.5 rounded-full border border-gray-300 dark:border-slate-600 shadow-sm"
                style={{ backgroundColor: item.selectedColor }}
              />
            </View>
          )}
        </View>

        {/* Price & Quantity Controls */}
        <View className="flex-row items-center justify-between mt-3">
          <Text className="text-base font-extrabold text-blue-600 dark:text-blue-400">
            {formatCurrency(item.product.price * item.quantity)}
          </Text>

          <View className="flex-row items-center bg-gray-100 dark:bg-slate-800 rounded-2xl px-2 py-1 border border-transparent dark:border-slate-700">
            <AnimatedPressable
              scaleTo={0.88}
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-6 h-6 items-center justify-center rounded-xl bg-white dark:bg-slate-700 shadow-sm"
            >
              <Feather name="minus" size={12} color="#1F2937" />
            </AnimatedPressable>

            <Text className="text-xs font-bold text-gray-900 dark:text-white mx-3">
              {item.quantity}
            </Text>

            <AnimatedPressable
              scaleTo={0.88}
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-6 h-6 items-center justify-center rounded-xl bg-white dark:bg-slate-700 shadow-sm"
            >
              <Feather name="plus" size={12} color="#1F2937" />
            </AnimatedPressable>
          </View>
        </View>
      </View>
    </View>
  );
};
