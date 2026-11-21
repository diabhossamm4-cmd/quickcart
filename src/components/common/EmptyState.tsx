import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { AnimatedPressable } from "./AnimatedPressable";

interface EmptyStateProps {
  icon?: keyof typeof Feather.glyphMap;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "inbox",
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <View className="flex-1 items-center justify-center px-8 py-20">
      <View className="w-20 h-20 rounded-full bg-blue-50 dark:bg-slate-800 items-center justify-center mb-5 border border-blue-100 dark:border-slate-700">
        <Feather name={icon} size={36} color="#2563EB" />
      </View>
      <Text className="text-xl font-black text-gray-900 dark:text-white text-center mb-2">{title}</Text>
      <Text className="text-sm text-gray-500 dark:text-slate-400 text-center leading-relaxed mb-6">
        {description}
      </Text>
      {actionLabel && onAction && (
        <AnimatedPressable
          scaleTo={0.92}
          onPress={onAction}
          className="bg-blue-600 px-6 py-3.5 rounded-2xl shadow-md active:bg-blue-700"
        >
          <Text className="text-white font-bold text-sm tracking-tight">{actionLabel}</Text>
        </AnimatedPressable>
      )}
    </View>
  );
};
