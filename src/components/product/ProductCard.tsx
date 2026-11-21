import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useCartStore } from "../../store/cartStore";
import { useWishlistStore } from "../../store/wishlistStore";
import { Product } from "../../types";
import { formatCurrency } from "../../utils/formatters";
import { StarRating } from "../common/StarRating";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isFavorite = useWishlistStore((state) => state.isFavorite(product.id));

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => router.push(`/product/${product.id}` as any)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-4 flex-1 m-1.5"
    >
      {/* Image container */}
      <View className="relative w-full h-44 bg-gray-100">
        <Image
          source={{ uri: product.images[0] }}
          className="w-full h-full"
          resizeMode="cover"
        />

        {/* Discount Badge */}
        {product.discountPercentage && (
          <View className="absolute top-2 left-2 bg-red-500 rounded-lg px-2 py-0.5">
            <Text className="text-white text-[10px] font-bold">
              -{product.discountPercentage}%
            </Text>
          </View>
        )}

        {/* Wishlist Button */}
        <TouchableOpacity
          onPress={() => toggleWishlist(product)}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 items-center justify-center shadow-sm"
        >
          <Feather
            name="heart"
            size={16}
            color={isFavorite ? "#EF4444" : "#6B7280"}
            fill={isFavorite ? "#EF4444" : "none"}
          />
        </TouchableOpacity>
      </View>

      {/* Product Content */}
      <View className="p-3">
        <Text className="text-xs text-gray-400 capitalize mb-0.5 font-medium">
          {product.category}
        </Text>
        <Text
          numberOfLines={2}
          className="text-sm font-semibold text-gray-900 mb-1.5 leading-snug"
        >
          {product.title}
        </Text>

        <StarRating rating={product.rating} reviewsCount={product.reviewsCount} />

        <View className="flex-row items-center justify-between mt-3 pt-2 border-t border-gray-50">
          <View>
            <Text className="text-base font-bold text-gray-900">
              {formatCurrency(product.price)}
            </Text>
            {product.originalPrice && (
              <Text className="text-xs text-gray-400 line-through">
                {formatCurrency(product.originalPrice)}
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={() => addToCart(product)}
            className="w-9 h-9 rounded-xl bg-blue-600 items-center justify-center shadow-sm active:bg-blue-700"
          >
            <Feather name="plus" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
