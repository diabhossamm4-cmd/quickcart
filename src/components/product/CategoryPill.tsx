import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Category } from "../../types";

interface CategoryPillProps {
  category: Category;
  isSelected: boolean;
  onSelect: () => void;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({
  category,
  isSelected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onSelect}
      className={`flex-row items-center px-4 py-2.5 rounded-2xl mr-2.5 border ${
        isSelected
          ? "bg-blue-600 border-blue-600 shadow-sm"
          : "bg-white border-gray-200"
      }`}
    >
      <Feather
        name={category.icon as any}
        size={15}
        color={isSelected ? "#FFFFFF" : "#6B7280"}
      />
      <Text
        className={`ml-2 text-xs font-semibold ${
          isSelected ? "text-white" : "text-gray-700"
        }`}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};
