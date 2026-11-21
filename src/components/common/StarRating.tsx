import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

interface StarRatingProps {
  rating: number;
  reviewsCount?: number;
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  reviewsCount,
  size = 14,
}) => {
  return (
    <View className="flex-row items-center">
      <Feather name="star" size={size} color="#F59E0B" fill="#F59E0B" />
      <Text className="text-xs font-bold text-gray-800 ml-1">
        {rating.toFixed(1)}
      </Text>
      {reviewsCount !== undefined && (
        <Text className="text-xs text-gray-400 ml-1">
          ({reviewsCount})
        </Text>
      )}
    </View>
  );
};
