import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { useCartStore } from "../../store/cartStore";
import { useWishlistStore } from "../../store/wishlistStore";
import { Product } from "../../types";
import { formatCurrency } from "../../utils/formatters";
import { AnimatedHeart } from "../common/AnimatedHeart";
import { AnimatedPressable } from "../common/AnimatedPressable";
import { StarRating } from "../common/StarRating";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isFavorite = useWishlistStore((state) => state.isFavorite(product.id));

  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <AnimatedPressable
      scaleTo={0.96}
      onPress={() => router.push(`/product/${product.id}` as any)}
      className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800/80 mb-4 flex-1 m-2"
    >
      {/* Product Image Frame */}
      <View className="relative w-full h-48 bg-gray-50/70 dark:bg-slate-800/50 overflow-hidden">
        <Image
          source={{ uri: product.images[0] }}
          className="w-full h-full"
          resizeMode="cover"
        />

        {/* Frosted Discount Pill */}
        {product.discountPercentage && (
          <View className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-md rounded-full px-2.5 py-0.5 shadow-sm">
            <Text className="text-white text-[11px] font-black tracking-wide">
              -{product.discountPercentage}%
            </Text>
          </View>
        )}

        {/* Animated Pop Heart */}
        <View className="absolute top-2.5 right-2.5">
          <AnimatedHeart
            isFavorite={isFavorite}
            onToggle={() => toggleWishlist(product)}
            size={16}
          />
        </View>
      </View>

      {/* Card Body */}
      <View className="p-3.5">
        <Text className="text-[11px] text-gray-400 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">
          {product.category}
        </Text>
        <Text
          numberOfLines={2}
          className="text-sm font-bold text-gray-900 dark:text-white mb-2 leading-snug h-10"
        >
          {product.title}
        </Text>

        <StarRating rating={product.rating} reviewsCount={product.reviewsCount} />

        {/* Pricing & Morphing Add Button */}
        <View className="flex-row items-center justify-between mt-3.5 pt-2.5 border-t border-gray-100/70 dark:border-slate-800">
          <View>
            <Text className="text-base font-extrabold text-gray-900 dark:text-white tracking-tight">
              {formatCurrency(product.price)}
            </Text>
            {product.originalPrice && (
              <Text className="text-[11px] text-gray-400 dark:text-slate-500 line-through">
                {formatCurrency(product.originalPrice)}
              </Text>
            )}
          </View>

          <AnimatedPressable
            scaleTo={0.88}
            onPress={handleAddToCart}
            className={`w-9 h-9 rounded-2xl items-center justify-center shadow-sm ${
              justAdded ? "bg-green-600" : "bg-blue-600"
            }`}
          >
            <Feather
              name={justAdded ? "check" : "plus"}
              size={17}
              color="#FFFFFF"
            />
          </AnimatedPressable>
        </View>
      </View>
    </AnimatedPressable>
  );
};
