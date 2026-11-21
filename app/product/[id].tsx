import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
      {/* Top Navbar */}
      <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center"
        >
          <Feather name="arrow-left" size={20} color="#1F2937" />
        </TouchableOpacity>

        <Text className="text-base font-bold text-gray-900" numberOfLines={1}>
          Product Details
        </Text>

        <TouchableOpacity
          onPress={() => toggleWishlist(product)}
          className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center"
        >
          <Feather
            name="heart"
            size={18}
            color={isFavorite ? "#EF4444" : "#1F2937"}
            fill={isFavorite ? "#EF4444" : "none"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Main Product Image */}
        <View className="w-full h-80 bg-gray-100 relative">
          <Image
            source={{ uri: product.images[selectedImage] || product.images[0] }}
            className="w-full h-full"
            resizeMode="cover"
          />
          {product.discountPercentage && (
            <View className="absolute top-4 left-4 bg-red-500 px-3 py-1 rounded-xl">
              <Text className="text-white text-xs font-extrabold">
                {product.discountPercentage}% OFF
              </Text>
            </View>
          )}
        </View>

        {/* Image Thumbnails Gallery */}
        {product.images.length > 1 && (
          <View className="flex-row px-4 py-3 bg-gray-50">
            {product.images.map((imgUri, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImage(index)}
                className={`w-16 h-16 rounded-xl overflow-hidden mr-3 border-2 ${
                  selectedImage === index ? "border-blue-600" : "border-transparent"
                }`}
              >
                <Image source={{ uri: imgUri }} className="w-full h-full" />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Content & Specs */}
        <View className="p-5">
          <Text className="text-xs uppercase font-extrabold text-blue-600 tracking-wider mb-1">
            {product.category}
          </Text>
          <Text className="text-xl font-bold text-gray-900 leading-snug mb-2">
            {product.title}
          </Text>

          {/* Rating & Stock */}
          <View className="flex-row items-center justify-between mb-4">
            <StarRating rating={product.rating} reviewsCount={product.reviewsCount} size={16} />
            <View className="flex-row items-center bg-green-50 px-2.5 py-1 rounded-full">
              <View className="w-2 h-2 rounded-full bg-green-500 mr-1.5" />
              <Text className="text-green-700 text-xs font-bold">In Stock</Text>
            </View>
          </View>

          {/* Price */}
          <View className="flex-row items-baseline mb-5">
            <Text className="text-2xl font-black text-gray-900 mr-2">
              {formatCurrency(product.price)}
            </Text>
            {product.originalPrice && (
              <Text className="text-sm text-gray-400 line-through">
                {formatCurrency(product.originalPrice)}
              </Text>
            )}
          </View>

          {/* Colors Selection */}
          {product.colors && (
            <View className="mb-5">
              <Text className="text-xs font-bold text-gray-700 uppercase mb-2">
                Select Color
              </Text>
              <View className="flex-row">
                {product.colors.map((color, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-full mr-3 items-center justify-center border-2 ${
                      selectedColor === color ? "border-blue-600" : "border-gray-200"
                    }`}
                  >
                    <View
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Sizes Selection */}
          {product.sizes && (
            <View className="mb-5">
              <Text className="text-xs font-bold text-gray-700 uppercase mb-2">
                Select Size
              </Text>
              <View className="flex-row flex-wrap">
                {product.sizes.map((size, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl mr-2 mb-2 border ${
                      selectedSize === size
                        ? "bg-blue-600 border-blue-600"
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
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Description */}
          <View className="mb-6">
            <Text className="text-xs font-bold text-gray-700 uppercase mb-2">
              Description
            </Text>
            <Text className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Bar */}
      <View className="px-5 py-3 border-t border-gray-100 bg-white flex-row items-center">
        {/* Quantity selector */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-2 py-1 mr-3">
          <TouchableOpacity
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 items-center justify-center rounded-lg bg-white shadow-sm"
          >
            <Feather name="minus" size={14} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-sm font-bold text-gray-900 mx-3">{quantity}</Text>
          <TouchableOpacity
            onPress={() => setQuantity(quantity + 1)}
            className="w-8 h-8 items-center justify-center rounded-lg bg-white shadow-sm"
          >
            <Feather name="plus" size={14} color="#1F2937" />
          </TouchableOpacity>
        </View>

        {/* Add to Cart button */}
        <TouchableOpacity
          onPress={handleAddToCart}
          activeOpacity={0.85}
          className={`flex-1 py-3.5 rounded-xl flex-row items-center justify-center shadow-sm ${
            addedNotice ? "bg-green-600" : "bg-blue-600"
          }`}
        >
          <Feather
            name={addedNotice ? "check" : "shopping-bag"}
            size={18}
            color="#FFFFFF"
          />
          <Text className="text-white text-sm font-bold ml-2">
            {addedNotice ? "Added to Cart!" : `Add • ${formatCurrency(product.price * quantity)}`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
