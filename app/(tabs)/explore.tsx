import { Feather } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState } from "../../src/components/common/EmptyState";
import { Header } from "../../src/components/common/Header";
import { SearchBar } from "../../src/components/common/SearchBar";
import { ProductCard } from "../../src/components/product/ProductCard";
import { PRODUCTS } from "../../src/data/mockData";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

export default function ExploreScreen() {
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("featured");

  const filteredAndSorted = useMemo(() => {
    let result = PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    switch (sortOption) {
      case "price-asc":
        return result.sort((a, b) => a.price - b.price);
      case "price-desc":
        return result.sort((a, b) => b.price - a.price);
      case "rating":
        return result.sort((a, b) => b.rating - a.rating);
      default:
        return result;
    }
  }, [search, sortOption]);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-gray-50/60">
      <Header title="Explore Catalog" />

      {/* Search Input */}
      <SearchBar value={search} onChangeText={setSearch} placeholder="Search entire catalog..." />

      {/* Filter / Sort bar */}
      <View className="flex-row items-center justify-between px-5 py-2.5 border-b border-gray-100 bg-white/70 backdrop-blur-md">
        <Text className="text-xs text-gray-500 font-semibold">
          Showing {filteredAndSorted.length} products
        </Text>

        <TouchableOpacity
          onPress={() =>
            setSortOption(
              sortOption === "price-asc"
                ? "price-desc"
                : sortOption === "price-desc"
                ? "rating"
                : "price-asc"
            )
          }
          className="flex-row items-center bg-gray-100 px-3 py-1.5 rounded-full"
        >
          <Feather name="sliders" size={12} color="#4B5563" />
          <Text className="text-xs font-bold text-gray-700 ml-1.5">
            {sortOption === "price-asc"
              ? "Price: Low to High"
              : sortOption === "price-desc"
              ? "Price: High to Low"
              : sortOption === "rating"
              ? "Top Rated"
              : "Sort"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={filteredAndSorted}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 6, paddingBottom: 110, flexGrow: 1 }}
        renderItem={({ item }) => (
          <View className="w-1/2">
            <ProductCard product={item} />
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            icon="search"
            title="No Results Found"
            description="We couldn't find any products matching your search query. Try another keyword!"
            actionLabel="Clear Search"
            onAction={() => setSearch("")}
          />
        }
      />
    </SafeAreaView>
  );
}
