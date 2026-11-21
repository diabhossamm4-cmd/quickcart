import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimatedHeart } from "../../src/components/common/AnimatedHeart";
import { AnimatedPressable } from "../../src/components/common/AnimatedPressable";
import { StarRating } from "../../src/components/common/StarRating";
import { PRODUCTS } from "../../src/data/mockData";
import { useCartStore } from "../../src/store/cartStore";
import { useWishlistStore } from "../../src/store/wishlistStore";
import { formatCurrency } from "../../src/utils/formatters";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isFavorite = useWishlistStore((state) => state.isFavorite(product.id));

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      {/* Top Floating Navbar */}
      <View className="flex-row items-center justify-between px-5 py-2.5 z-20">
        <AnimatedPressable
          scaleTo={0.9}
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-100/80 backdrop-blur-md items-center justify-center border border-gray-200/50"
        >
          <Feather name="arrow-left" size={18} color="#1F2937" />
        </AnimatedPressable>

        <Text className="text-sm font-extrabold text-gray-900 tracking-tight" numberOfLines={1}>
          Product Details
        </Text>

        <AnimatedHeart
          isFavorite={isFavorite}
          onToggle={() => toggleWishlist(product)}
          size={18}
        />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Main Product Hero Image */}
        <View className="w-full h-84 bg-gray-50 relative overflow-hidden">
          <Image
            source={{ uri: product.images[selectedImage] || product.images[0] }}
            className="w-full h-full"
            resizeMode="cover"
          />
          {product.discountPercentage && (
            <View className="absolute top-4 left-5 bg-red-500/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
              <Text className="text-white text-xs font-black tracking-wider">
                {product.discountPercentage}% OFF
              </Text>
            </View>
          )}
        </View>

        {/* Gallery Thumbnails */}
        {product.images.length > 1 && (
          <View className="flex-row px-5 py-3.5 bg-gray-50/50">
            {product.images.map((imgUri, index) => (
              <AnimatedPressable
                key={index}
                scaleTo={0.93}
                onPress={() => setSelectedImage(index)}
                className={`w-16 h-16 rounded-2xl overflow-hidden mr-3 border-2 ${
                  selectedImage === index ? "border-blue-600 shadow-sm" : "border-transparent opacity-70"
                }`}
              >
                <Image source={{ uri: imgUri }} className="w-full h-full" />
              </AnimatedPressable>
            ))}
          </View>
        )}

        {/* Details Section */}
        <View className="p-6">
          <Text className="text-xs uppercase font-black text-blue-600 tracking-widest mb-1.5">
            {product.category}
          </Text>
          <Text className="text-2xl font-black text-gray-900 leading-tight mb-2.5">
            {product.title}
          </Text>

          {/* Rating & Stock Pill */}
          <View className="flex-row items-center justify-between mb-5">
            <StarRating rating={product.rating} reviewsCount={product.reviewsCount} size={16} />
            <View className="flex-row items-center bg-green-50 px-3 py-1 rounded-full border border-green-200/60">
              <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
              <Text className="text-green-700 text-xs font-bold">In Stock & Ready</Text>
            </View>
          </View>

          {/* Price */}
          <View className="flex-row items-baseline mb-6">
            <Text className="text-3xl font-black text-gray-900 mr-2.5 tracking-tight">
              {formatCurrency(product.price)}
            </Text>
            {product.originalPrice && (
              <Text className="text-base text-gray-400 line-through">
                {formatCurrency(product.originalPrice)}
              </Text>
            )}
          </View>

          {/* Color Selection */}
          {product.colors && (
            <View className="mb-6">
              <Text className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-2.5">
                Select Finish
              </Text>
              <View className="flex-row">
                {product.colors.map((color, idx) => (
                  <TouchableOpacity
                    key={idx}
                    activeOpacity={0.8}
                    onPress={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full mr-3.5 items-center justify-center border-2 ${
                      selectedColor === color ? "border-blue-600" : "border-gray-200"
                    }`}
                  >
                    <View
                      className="w-7 h-7 rounded-full shadow-inner"
                      style={{ backgroundColor: color }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Size Selection */}
          {product.sizes && (
            <View className="mb-6">
              <Text className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-2.5">
                Select Size
              </Text>
              <View className="flex-row flex-wrap">
                {product.sizes.map((size, idx) => (
                  <AnimatedPressable
                    key={idx}
                    scaleTo={0.92}
                    onPress={() => setSelectedSize(size)}
                    className={`px-4 py-2.5 rounded-2xl mr-2.5 mb-2.5 border ${
                      selectedSize === size
                        ? "bg-blue-600 border-blue-600 shadow-sm"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        selectedSize === size ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {size}
                    </Text>
                  </AnimatedPressable>
                ))}
              </View>
            </View>
          )}

          {/* Description */}
          <View className="mb-10">
            <Text className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-2">
              Overview
            </Text>
            <Text className="text-sm text-gray-600 leading-relaxed font-normal">
              {product.description}
            </Text>
          </View>
        </View>

        <View className="h-28" />
      </ScrollView>

      {/* Floating Glass Bottom Bar */}
      <View
        className="px-5 py-3 border-t border-gray-100 bg-white/90 flex-row items-center"
        style={Platform.OS === "web" ? ({ backdropFilter: "blur(20px)" } as any) : {}}
      >
        {/* Quantity selector */}
        <View className="flex-row items-center bg-gray-100 rounded-2xl px-2.5 py-1.5 mr-3">
          <AnimatedPressable
            scaleTo={0.88}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 items-center justify-center rounded-xl bg-white shadow-sm"
          >
            <Feather name="minus" size={13} color="#1F2937" />
          </AnimatedPressable>
          <Text className="text-sm font-bold text-gray-900 mx-3.5">{quantity}</Text>
          <AnimatedPressable
            scaleTo={0.88}
            onPress={() => setQuantity(quantity + 1)}
            className="w-8 h-8 items-center justify-center rounded-xl bg-white shadow-sm"
          >
            <Feather name="plus" size={13} color="#1F2937" />
          </AnimatedPressable>
        </View>

        {/* Add to Cart button */}
        <AnimatedPressable
          scaleTo={0.96}
          onPress={handleAddToCart}
          className={`flex-1 py-4 rounded-2xl flex-row items-center justify-center shadow-lg ${
            addedNotice ? "bg-green-600 shadow-green-200" : "bg-blue-600 shadow-blue-200"
          }`}
        >
          <Feather
            name={addedNotice ? "check" : "shopping-bag"}
            size={18}
            color="#FFFFFF"
          />
          <Text className="text-white text-sm font-extrabold ml-2.5 tracking-tight">
            {addedNotice ? "Added to Cart!" : `Add to Bag • ${formatCurrency(product.price * quantity)}`}
          </Text>
        </AnimatedPressable>
      </View>
    </SafeAreaView>
  );
}
