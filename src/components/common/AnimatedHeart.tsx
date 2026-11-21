import { Feather } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface AnimatedHeartProps {
  isFavorite: boolean;
  onToggle: () => void;
  size?: number;
}

export const AnimatedHeart: React.FC<AnimatedHeartProps> = ({
  isFavorite,
  onToggle,
  size = 18,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(1.4, { damping: 4, stiffness: 350 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    );
    onToggle();
  };

  return (
    <AnimatedTouchable
      activeOpacity={0.8}
      onPress={handlePress}
      style={[animatedStyle]}
      className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md items-center justify-center shadow-sm border border-white/50"
    >
      <Feather
        name="heart"
        size={size}
        color={isFavorite ? "#EF4444" : "#4B5563"}
        fill={isFavorite ? "#EF4444" : "none"}
      />
    </AnimatedTouchable>
  );
};
