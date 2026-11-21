import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartItemRow } from "../../src/components/cart/CartItemRow";
import { OrderSummary } from "../../src/components/cart/OrderSummary";
import { EmptyState } from "../../src/components/common/EmptyState";
import { Header } from "../../src/components/common/Header";
import { useCartStore } from "../../src/store/cartStore";

export default function CartScreen() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-gray-50/60">
      <Header
        title={`Shopping Cart (${items.length})`}
        showCart={false}
        rightAction={
          items.length > 0 ? (
            <TouchableOpacity onPress={clearCart} className="px-2.5 py-1 rounded-full bg-red-50">
              <Text className="text-xs font-bold text-red-500">Clear</Text>
            </TouchableOpacity>
          ) : null
        }
      />

      {items.length === 0 ? (
        <EmptyState
          icon="shopping-bag"
          title="Your Cart is Empty"
          description="Looks like you haven't added anything to your cart yet. Check out our curated catalog!"
          actionLabel="Start Shopping"
          onAction={() => router.push("/(tabs)/explore" as any)}
        />
      ) : (
        <ScrollView className="flex-1 px-4 pt-3" showsVerticalScrollIndicator={false}>
          {/* Cart Items List */}
          <View className="mb-2">
            {items.map((cartItem) => (
              <CartItemRow key={cartItem.id} item={cartItem} />
            ))}
          </View>

          {/* Pricing & Promo Code Summary */}
          <OrderSummary />

          {/* Checkout CTA */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push("/checkout" as any)}
            className="w-full bg-blue-600 py-4 rounded-2xl items-center justify-center shadow-lg mb-8 active:bg-blue-700 shadow-blue-300"
          >
            <Text className="text-white text-base font-black tracking-tight">
              Proceed to Checkout
            </Text>
          </TouchableOpacity>

          {/* Space for floating tab bar */}
          <View className="h-24" />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
