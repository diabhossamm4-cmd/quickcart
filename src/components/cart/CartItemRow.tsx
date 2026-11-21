import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useCartStore } from "../../store/cartStore";
import { CartItem } from "../../types";
import { formatCurrency } from "../../utils/formatters";

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <View className="flex-row items-center bg-white p-3.5 rounded-2xl mb-3 border border-gray-100 shadow-sm">
      {/* Product thumbnail */}
      <Image
        source={{ uri: item.product.images[0] }}
        className="w-20 h-20 rounded-xl bg-gray-100"
        resizeMode="cover"
      />

      {/* Details */}
      <View className="flex-1 ml-3.5">
        <View className="flex-row items-start justify-between">
          <Text
            numberOfLines={1}
            className="text-sm font-bold text-gray-900 flex-1 mr-2"
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
            <Text className="text-xs text-gray-400 mr-2">
              Size: {item.selectedSize}
            </Text>
          )}
          {item.selectedColor && (
            <View className="flex-row items-center">
              <Text className="text-xs text-gray-400 mr-1">Color:</Text>
              <View
                className="w-3 h-3 rounded-full border border-gray-300"
                style={{ backgroundColor: item.selectedColor }}
              />
            </View>
          )}
        </View>

        {/* Price & Quantity Controls */}
        <View className="flex-row items-center justify-between mt-2.5">
          <Text className="text-sm font-extrabold text-blue-600">
            {formatCurrency(item.product.price * item.quantity)}
          </Text>

          <View className="flex-row items-center bg-gray-100 rounded-xl px-2 py-1">
            <TouchableOpacity
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-6 h-6 items-center justify-center rounded-lg bg-white shadow-sm"
            >
              <Feather name="minus" size={12} color="#1F2937" />
            </TouchableOpacity>

            <Text className="text-xs font-bold text-gray-900 mx-3">
              {item.quantity}
            </Text>

            <TouchableOpacity
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-6 h-6 items-center justify-center rounded-lg bg-white shadow-sm"
            >
              <Feather name="plus" size={12} color="#1F2937" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
