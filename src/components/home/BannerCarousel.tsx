import React from "react";
import { ImageBackground, Text, View } from "react-native";
import { AnimatedPressable } from "../common/AnimatedPressable";

export const BannerCarousel: React.FC = () => {
  return (
    <View className="px-4 py-2 mb-3">
      <AnimatedPressable scaleTo={0.97} className="overflow-hidden rounded-3xl shadow-lg">
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80",
          }}
          imageStyle={{ borderRadius: 28 }}
          className="w-full h-48 justify-between p-6 overflow-hidden"
        >
          {/* Subtle dark gradient overlay */}
          <View className="bg-gradient-to-t from-black/80 via-black/40 to-transparent absolute inset-0 rounded-3xl" />

          {/* Top Pill */}
          <View className="bg-white/20 backdrop-blur-md self-start px-3 py-1 rounded-full z-10 border border-white/30">
            <Text className="text-white text-[10px] font-extrabold tracking-widest uppercase">
              Apple Silicon & Audio
            </Text>
          </View>

          {/* Bottom Callout */}
          <View className="z-10">
            <Text className="text-white text-2xl font-black tracking-tight leading-7">
              Next-Gen Sound.{"\n"}Supreme Comfort.
            </Text>
            <View className="flex-row items-center justify-between mt-2.5">
              <Text className="text-gray-200 text-xs font-medium">
                Up to 30% OFF on Studio Series
              </Text>
              <View className="bg-white px-3.5 py-1.5 rounded-full shadow-sm">
                <Text className="text-blue-600 font-bold text-xs">Explore Drop</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </AnimatedPressable>
    </View>
  );
};
