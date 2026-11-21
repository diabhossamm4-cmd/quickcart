import { useRouter } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState } from "../../src/components/common/EmptyState";
import { Header } from "../../src/components/common/Header";
import { ProductCard } from "../../src/components/product/ProductCard";
import { useWishlistStore } from "../../src/store/wishlistStore";

export default function WishlistScreen() {
  const router = useRouter();
  const favorites = useWishlistStore((state) => state.favorites);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-gray-50">
      <Header title="My Wishlist" />

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 6, flexGrow: 1 }}
        renderItem={({ item }) => (
          <View className="w-1/2">
            <ProductCard product={item} />
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            icon="heart"
            title="Your Wishlist is Empty"
            description="Explore our curated catalog and tap the heart icon on any item you love to save it for later."
            actionLabel="Discover Products"
            onAction={() => router.push("/(tabs)/explore" as any)}
          />
        }
      />
    </SafeAreaView>
  );
}
