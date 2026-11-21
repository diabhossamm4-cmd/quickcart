import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../src/components/common/Header";
import { DEFAULT_ADDRESSES } from "../src/data/mockData";
import { useCartStore } from "../src/store/cartStore";
import { calculateOrderSummary, formatCurrency } from "../src/utils/formatters";

export default function CheckoutScreen() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const activePromo = useCartStore((state) => state.activePromo);
  const clearCart = useCartStore((state) => state.clearCart);

  const summary = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const discountRate = activePromo ? activePromo.discountRate : 0;
    return calculateOrderSummary(subtotal, discountRate);
  }, [items, activePromo]);

  const [selectedAddress, setSelectedAddress] = useState(DEFAULT_ADDRESSES[0].id);
  const [selectedPayment, setSelectedPayment] = useState("apple-pay");
  const [orderSuccessModal, setOrderSuccessModal] = useState(false);

  const paymentOptions = [
    { id: "apple-pay", title: "Apple Pay / Google Pay", icon: "smartphone" },
    { id: "card", title: "Credit or Debit Card", icon: "credit-card" },
    { id: "cash", title: "Cash on Delivery", icon: "dollar-sign" },
  ];

  const handlePlaceOrder = () => {
    setOrderSuccessModal(true);
    clearCart();
  };

  const handleFinish = () => {
    setOrderSuccessModal(false);
    router.replace("/(tabs)/" as any);
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-gray-50">
      <Header title="Checkout" showBack={true} showCart={false} />

      <ScrollView className="flex-1 px-4 pt-3" showsVerticalScrollIndicator={false}>
        {/* Shipping Address Section */}
        <View className="mb-5">
          <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
            Shipping Address
          </Text>
          <View className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm">
            {DEFAULT_ADDRESSES.map((addr) => (
              <TouchableOpacity
                key={addr.id}
                onPress={() => setSelectedAddress(addr.id)}
                className={`p-3 rounded-xl mb-2 border flex-row items-start justify-between ${
                  selectedAddress === addr.id
                    ? "border-blue-600 bg-blue-50/40"
                    : "border-gray-100 bg-white"
                }`}
              >
                <View className="flex-row items-start flex-1 mr-2">
                  <Feather
                    name="map-pin"
                    size={16}
                    color={selectedAddress === addr.id ? "#2563EB" : "#9CA3AF"}
                    className="mt-0.5"
                  />
                  <View className="ml-2.5 flex-1">
                    <Text className="text-sm font-bold text-gray-900">
                      {addr.title}
                    </Text>
                    <Text className="text-xs text-gray-500 mt-0.5">
                      {addr.addressLine}, {addr.city}
                    </Text>
                    <Text className="text-xs text-gray-400 mt-0.5">
                      {addr.phone}
                    </Text>
                  </View>
                </View>

                <View
                  className={`w-5 h-5 rounded-full border items-center justify-center ${
                    selectedAddress === addr.id
                      ? "border-blue-600 bg-blue-600"
                      : "border-gray-300"
                  }`}
                >
                  {selectedAddress === addr.id && (
                    <View className="w-2 h-2 rounded-full bg-white" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Methods Section */}
        <View className="mb-5">
          <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
            Payment Method
          </Text>
          <View className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm">
            {paymentOptions.map((opt) => (
              <TouchableOpacity
                key={opt.id}
                onPress={() => setSelectedPayment(opt.id)}
                className={`p-3 rounded-xl mb-2 border flex-row items-center justify-between ${
                  selectedPayment === opt.id
                    ? "border-blue-600 bg-blue-50/40"
                    : "border-gray-100 bg-white"
                }`}
              >
                <View className="flex-row items-center">
                  <Feather
                    name={opt.icon as any}
                    size={16}
                    color={selectedPayment === opt.id ? "#2563EB" : "#6B7280"}
                  />
                  <Text className="text-sm font-semibold text-gray-800 ml-2.5">
                    {opt.title}
                  </Text>
                </View>
                <View
                  className={`w-5 h-5 rounded-full border items-center justify-center ${
                    selectedPayment === opt.id
                      ? "border-blue-600 bg-blue-600"
                      : "border-gray-300"
                  }`}
                >
                  {selectedPayment === opt.id && (
                    <View className="w-2 h-2 rounded-full bg-white" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Final Payment Review */}
        <View className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm mb-6">
          <Text className="text-sm font-bold text-gray-900 mb-2">Order Summary</Text>
          <View className="flex-row justify-between mb-1">
            <Text className="text-xs text-gray-500">Subtotal</Text>
            <Text className="text-xs font-semibold text-gray-800">{formatCurrency(summary.subtotal)}</Text>
          </View>
          {summary.discount > 0 && (
            <View className="flex-row justify-between mb-1">
              <Text className="text-xs text-green-600">Discount</Text>
              <Text className="text-xs font-semibold text-green-600">-{formatCurrency(summary.discount)}</Text>
            </View>
          )}
          <View className="flex-row justify-between mb-1">
            <Text className="text-xs text-gray-500">Shipping</Text>
            <Text className="text-xs font-semibold text-gray-800">
              {summary.shipping === 0 ? "FREE" : formatCurrency(summary.shipping)}
            </Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-xs text-gray-500">Estimated Tax</Text>
            <Text className="text-xs font-semibold text-gray-800">{formatCurrency(summary.tax)}</Text>
          </View>
          <View className="flex-row justify-between pt-2 border-t border-gray-100 items-center">
            <Text className="text-sm font-bold text-gray-900">Total Due</Text>
            <Text className="text-lg font-black text-blue-600">{formatCurrency(summary.total)}</Text>
          </View>
        </View>

        {/* Place Order CTA */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handlePlaceOrder}
          className="w-full bg-blue-600 py-4 rounded-2xl items-center justify-center shadow-md mb-10 active:bg-blue-700"
        >
          <Text className="text-white text-base font-bold">
            Place Order ({formatCurrency(summary.total)})
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Success Modal */}
      <Modal visible={orderSuccessModal} transparent animationType="fade">
        <View className="flex-1 bg-black/60 items-center justify-center px-6">
          <View className="bg-white w-full rounded-3xl p-6 items-center shadow-xl">
            <View className="w-16 h-16 rounded-full bg-green-100 items-center justify-center mb-4">
              <Feather name="check-circle" size={36} color="#16A34A" />
            </View>
            <Text className="text-xl font-black text-gray-900 text-center mb-1">
              Order Placed!
            </Text>
            <Text className="text-xs text-gray-500 text-center mb-5 leading-relaxed">
              Thank you for shopping with QuickCart! Your order #QC-84920 has been received and is being prepared.
            </Text>
            <TouchableOpacity
              onPress={handleFinish}
              className="w-full bg-blue-600 py-3.5 rounded-xl items-center"
            >
              <Text className="text-white text-sm font-bold">Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
