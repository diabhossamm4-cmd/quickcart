import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

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
    <View className="flex-1 items-center justify-center px-8 py-16">
      <View className="w-20 h-20 rounded-full bg-blue-50 items-center justify-center mb-5">
        <Feather name={icon} size={36} color="#2563EB" />
      </View>
      <Text className="text-xl font-bold text-gray-900 text-center mb-2">{title}</Text>
      <Text className="text-sm text-gray-500 text-center leading-relaxed mb-6">
        {description}
      </Text>
      {actionLabel && onAction && (
        <TouchableOpacity
          onPress={onAction}
          className="bg-blue-600 px-6 py-3 rounded-xl shadow-sm active:bg-blue-700"
        >
          <Text className="text-white font-semibold text-sm">{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
