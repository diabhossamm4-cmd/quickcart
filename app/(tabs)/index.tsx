import React, { useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../src/components/common/Header";
import { SearchBar } from "../../src/components/common/SearchBar";
import { BannerCarousel } from "../../src/components/home/BannerCarousel";
import { CategoryPill } from "../../src/components/product/CategoryPill";
import { ProductCard } from "../../src/components/product/ProductCard";
import { CATEGORIES, PRODUCTS } from "../../src/data/mockData";

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-gray-50">
      <Header title="QuickCart" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <SearchBar value={search} onChangeText={setSearch} />

        {/* Promo Banner */}
        <BannerCarousel />

        {/* Categories Bar */}
        <View className="my-2">
          <View className="flex-row items-center justify-between px-4 mb-2.5">
            <Text className="text-base font-bold text-gray-900">Categories</Text>
            <TouchableOpacity>
              <Text className="text-xs font-semibold text-blue-600">See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={CATEGORIES}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            renderItem={({ item }) => (
              <CategoryPill
                category={item}
                isSelected={selectedCategory === item.id}
                onSelect={() => setSelectedCategory(item.id)}
              />
            )}
          />
        </View>

        {/* Featured Products Grid */}
        <View className="px-2 mt-4">
          <View className="flex-row items-center justify-between px-2 mb-2">
            <Text className="text-base font-bold text-gray-900">
              {selectedCategory === "all" ? "Featured Products" : `${selectedCategory.toUpperCase()} Items`}
            </Text>
            <Text className="text-xs font-medium text-gray-400">
              {filteredProducts.length} items
            </Text>
          </View>

          <View className="flex-row flex-wrap">
            {filteredProducts.map((product) => (
              <View key={product.id} className="w-1/2">
                <ProductCard product={product} />
              </View>
            ))}
          </View>
        </View>

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
