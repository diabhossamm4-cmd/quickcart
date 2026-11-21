import { Feather } from "@expo/vector-icons";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search products, brands...",
  onClear,
}) => {
  return (
    <View className="flex-row items-center bg-gray-100 dark:bg-slate-800/80 rounded-2xl px-4 py-3 mx-4 my-2.5 border border-transparent dark:border-slate-700/60">
      <Feather name="search" size={18} color="#9CA3AF" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        className="flex-1 ml-3 text-sm text-gray-900 dark:text-white"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear || (() => onChangeText(""))} className="p-1">
          <Feather name="x-circle" size={16} color="#9CA3AF" />
        </TouchableOpacity>
      )}
    </View>
  );
};
