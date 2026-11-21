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
    <View className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-gray-100 dark:border-slate-800 shadow-sm mb-4">
      <Text className="text-base font-black text-gray-900 dark:text-white mb-3 tracking-tight">Order Summary</Text>

      {/* Promo Code Input */}
      {activePromo ? (
        <View className="flex-row items-center justify-between bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 px-3.5 py-2.5 rounded-2xl mb-3.5">
          <View className="flex-row items-center">
            <Feather name="tag" size={16} color="#059669" />
            <Text className="text-xs font-bold text-green-700 dark:text-green-400 ml-2">
              Code {activePromo.code} Applied ({activePromo.discountRate * 100}% off)
            </Text>
          </View>
          <TouchableOpacity onPress={removePromoCode} className="p-1">
            <Feather name="x" size={14} color="#059669" />
          </TouchableOpacity>
        </View>
      ) : (
        <View className="mb-3.5">
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
              className="flex-1 bg-gray-100 dark:bg-slate-800 rounded-2xl px-3.5 py-2.5 text-xs text-gray-900 dark:text-white mr-2 border border-transparent dark:border-slate-700"
            />
            <TouchableOpacity
              onPress={handleApply}
              className="bg-gray-900 dark:bg-blue-600 px-4 py-2.5 rounded-2xl"
            >
              <Text className="text-white text-xs font-bold">Apply</Text>
            </TouchableOpacity>
          </View>
          {feedback && (
            <Text
              className={`text-[11px] mt-1 ml-1 font-semibold ${
                feedback.isError ? "text-red-500" : "text-green-600"
              }`}
            >
              {feedback.message}
            </Text>
          )}
        </View>
      )}

      {/* Cost Breakdown */}
      <View className="space-y-2 border-t border-gray-100 dark:border-slate-800 pt-3">
        <View className="flex-row justify-between mb-1.5">
          <Text className="text-xs text-gray-500 dark:text-slate-400">Subtotal</Text>
          <Text className="text-xs font-bold text-gray-800 dark:text-slate-200">
            {formatCurrency(summary.subtotal)}
          </Text>
        </View>

        {summary.discount > 0 && (
          <View className="flex-row justify-between mb-1.5">
            <Text className="text-xs text-green-600 dark:text-green-400 font-semibold">Discount</Text>
            <Text className="text-xs font-bold text-green-600 dark:text-green-400">
              -{formatCurrency(summary.discount)}
            </Text>
          </View>
        )}

        <View className="flex-row justify-between mb-1.5">
          <Text className="text-xs text-gray-500 dark:text-slate-400">Shipping</Text>
          <Text className="text-xs font-bold text-gray-800 dark:text-slate-200">
            {summary.shipping === 0 ? "FREE" : formatCurrency(summary.shipping)}
          </Text>
        </View>

        <View className="flex-row justify-between mb-2">
          <Text className="text-xs text-gray-500 dark:text-slate-400">Estimated Tax (8%)</Text>
          <Text className="text-xs font-bold text-gray-800 dark:text-slate-200">
            {formatCurrency(summary.tax)}
          </Text>
        </View>

        <View className="flex-row justify-between pt-2.5 border-t border-gray-100 dark:border-slate-800 items-center">
          <Text className="text-sm font-black text-gray-900 dark:text-white">Total</Text>
          <Text className="text-lg font-black text-blue-600 dark:text-blue-400">
            {formatCurrency(summary.total)}
          </Text>
        </View>
      </View>
    </View>
  );
};
