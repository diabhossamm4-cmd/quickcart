import { Feather } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useCartStore } from "../../store/cartStore";
import { calculateOrderSummary, formatCurrency } from "../../utils/formatters";

export const OrderSummary: React.FC = () => {
  const [promoInput, setPromoInput] = useState("");
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);

  const items = useCartStore((state) => state.items);
  const activePromo = useCartStore((state) => state.activePromo);
  const applyPromoCode = useCartStore((state) => state.applyPromoCode);
  const removePromoCode = useCartStore((state) => state.removePromoCode);

  const summary = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const discountRate = activePromo ? activePromo.discountRate : 0;
    return calculateOrderSummary(subtotal, discountRate);
  }, [items, activePromo]);

  const handleApply = () => {
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setFeedback({ message: res.message, isError: !res.success });
    if (res.success) {
      setPromoInput("");
    }
  };

  return (
    <View className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-4">
      <Text className="text-base font-bold text-gray-900 mb-3">Order Summary</Text>

      {/* Promo Code Input */}
      {activePromo ? (
        <View className="flex-row items-center justify-between bg-green-50 border border-green-200 px-3 py-2.5 rounded-xl mb-3">
          <View className="flex-row items-center">
            <Feather name="tag" size={16} color="#059669" />
            <Text className="text-xs font-bold text-green-700 ml-2">
              Code {activePromo.code} Applied ({activePromo.discountRate * 100}% off)
            </Text>
          </View>
          <TouchableOpacity onPress={removePromoCode} className="p-1">
            <Feather name="x" size={14} color="#059669" />
          </TouchableOpacity>
        </View>
      ) : (
        <View className="mb-3">
          <View className="flex-row items-center">
            <TextInput
              value={promoInput}
              onChangeText={(text) => {
                setPromoInput(text);
                setFeedback(null);
              }}
              placeholder="Promo code (e.g. WELCOME10)"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="characters"
              className="flex-1 bg-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-900 mr-2"
            />
            <TouchableOpacity
              onPress={handleApply}
              className="bg-gray-900 px-4 py-2.5 rounded-xl"
            >
              <Text className="text-white text-xs font-semibold">Apply</Text>
            </TouchableOpacity>
          </View>
          {feedback && (
            <Text
              className={`text-[11px] mt-1 ml-1 ${
                feedback.isError ? "text-red-500" : "text-green-600"
              }`}
            >
              {feedback.message}
            </Text>
          )}
        </View>
      )}

      {/* Cost Breakdown */}
      <View className="space-y-2 border-t border-gray-100 pt-3">
        <View className="flex-row justify-between mb-1.5">
          <Text className="text-xs text-gray-500">Subtotal</Text>
          <Text className="text-xs font-semibold text-gray-800">
            {formatCurrency(summary.subtotal)}
          </Text>
        </View>

        {summary.discount > 0 && (
          <View className="flex-row justify-between mb-1.5">
            <Text className="text-xs text-green-600">Discount</Text>
            <Text className="text-xs font-semibold text-green-600">
              -{formatCurrency(summary.discount)}
            </Text>
          </View>
        )}

        <View className="flex-row justify-between mb-1.5">
          <Text className="text-xs text-gray-500">Shipping</Text>
          <Text className="text-xs font-semibold text-gray-800">
            {summary.shipping === 0 ? "FREE" : formatCurrency(summary.shipping)}
          </Text>
        </View>

        <View className="flex-row justify-between mb-2">
          <Text className="text-xs text-gray-500">Estimated Tax (8%)</Text>
          <Text className="text-xs font-semibold text-gray-800">
            {formatCurrency(summary.tax)}
          </Text>
        </View>

        <View className="flex-row justify-between pt-2 border-t border-gray-100 items-center">
          <Text className="text-sm font-bold text-gray-900">Total</Text>
          <Text className="text-lg font-extrabold text-blue-600">
            {formatCurrency(summary.total)}
          </Text>
        </View>
      </View>
    </View>
  );
};
