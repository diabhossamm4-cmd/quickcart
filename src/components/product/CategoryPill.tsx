import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text } from "react-native";
import { Category } from "../../types";
import { AnimatedPressable } from "../common/AnimatedPressable";

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
    <AnimatedPressable
      scaleTo={0.92}
      onPress={onSelect}
      className={`flex-row items-center px-4 py-2.5 rounded-full mr-2.5 border shadow-sm ${
        isSelected
          ? "bg-blue-600 border-blue-600 shadow-blue-200"
          : "bg-white/90 border-gray-200/70"
      }`}
    >
      <Feather
        name={category.icon as any}
        size={15}
        color={isSelected ? "#FFFFFF" : "#4B5563"}
      />
      <Text
        className={`ml-2 text-xs font-bold tracking-tight ${
          isSelected ? "text-white" : "text-gray-800"
        }`}
      >
        {category.name}
      </Text>
    </AnimatedPressable>
  );
};
