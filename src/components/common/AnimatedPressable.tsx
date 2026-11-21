import React from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressableBase = Animated.createAnimatedComponent(Pressable);

interface AnimatedPressableProps extends PressableProps {
  scaleTo?: number;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export const AnimatedPressable: React.FC<AnimatedPressableProps> = ({
  scaleTo = 0.94,
  style,
  children,
  onPressIn,
  onPressOut,
  ...props
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressableBase
      {...props}
      onPressIn={(e) => {
        scale.value = withSpring(scaleTo, {
          damping: 14,
          stiffness: 250,
          mass: 0.8,
        });
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        scale.value = withSpring(1, {
          damping: 14,
          stiffness: 250,
          mass: 0.8,
        });
        onPressOut?.(e);
      }}
      style={[animatedStyle, style]}
    >
      {children}
    </AnimatedPressableBase>
  );
};
