import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

export const BannerCarousel: React.FC = () => {
  return (
    <View className="px-4 py-2 mb-3">
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80",
        }}
        imageStyle={{ borderRadius: 20 }}
        className="w-full h-44 overflow-hidden rounded-3xl justify-between p-5 shadow-sm"
      >
        <View className="bg-black/30 absolute inset-0 rounded-3xl" />

        <View className="z-10">
          <View className="bg-amber-400 self-start px-2.5 py-0.5 rounded-full mb-2">
            <Text className="text-gray-900 text-[10px] font-extrabold tracking-wider uppercase">
              Limited Offer
            </Text>
          </View>
          <Text className="text-white text-2xl font-black tracking-tight leading-7">
            Summer Season{"\n"}Big Sale
          </Text>
          <Text className="text-gray-200 text-xs font-medium mt-1">
            Up to 40% OFF on all premium gear
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          className="bg-white self-start px-4 py-2 rounded-xl z-10 shadow-sm"
        >
          <Text className="text-blue-600 font-bold text-xs">Shop Now</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};
