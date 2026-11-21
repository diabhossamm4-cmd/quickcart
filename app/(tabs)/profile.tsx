import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../src/components/common/Header";

export default function ProfileScreen() {
  const menuSections = [
    {
      title: "Orders & Activity",
      items: [
        { icon: "package", label: "My Orders", badge: "2 active" },
        { icon: "map-pin", label: "Shipping Addresses" },
        { icon: "credit-card", label: "Payment Methods" },
      ],
    },
    {
      title: "Preferences",
      items: [
        { icon: "bell", label: "Push Notifications", badge: "On" },
        { icon: "globe", label: "Language", badge: "English (US)" },
        { icon: "shield", label: "Security & Biometrics" },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: "help-circle", label: "Help & FAQ" },
        { icon: "file-text", label: "Terms of Service" },
        { icon: "mail", label: "Contact Customer Care" },
      ],
    },
  ];

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-gray-50">
      <Header title="My Account" showCart={false} />

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-4 pt-4">
        {/* User Card */}
        <View className="flex-row items-center bg-white p-4 rounded-3xl border border-gray-100 shadow-sm mb-6">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
            }}
            className="w-16 h-16 rounded-full bg-gray-200"
          />
          <View className="ml-4 flex-1">
            <Text className="text-lg font-bold text-gray-900">Sarah Jenkins</Text>
            <Text className="text-xs text-gray-400">sarah.jenkins@example.com</Text>
            <View className="flex-row items-center mt-1.5 self-start bg-blue-50 px-2 py-0.5 rounded-full">
              <Feather name="award" size={12} color="#2563EB" />
              <Text className="text-[10px] font-bold text-blue-700 ml-1">
                Gold Member (500 pts)
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Sections */}
        {menuSections.map((section, idx) => (
          <View key={idx} className="mb-5">
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
              {section.title}
            </Text>
            <View className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              {section.items.map((item, itemIdx) => (
                <TouchableOpacity
                  key={itemIdx}
                  activeOpacity={0.7}
                  className={`flex-row items-center justify-between p-3.5 ${
                    itemIdx !== section.items.length - 1
                      ? "border-b border-gray-50"
                      : ""
                  }`}
                >
                  <View className="flex-row items-center">
                    <View className="w-8 h-8 rounded-lg bg-gray-50 items-center justify-center mr-3">
                      <Feather name={item.icon as any} size={16} color="#4B5563" />
                    </View>
                    <Text className="text-sm font-semibold text-gray-800">
                      {item.label}
                    </Text>
                  </View>

                  <View className="flex-row items-center">
                    {item.badge && (
                      <Text className="text-xs text-gray-400 mr-2 font-medium">
                        {item.badge}
                      </Text>
                    )}
                    <Feather name="chevron-right" size={16} color="#9CA3AF" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Sign Out Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          className="flex-row items-center justify-center bg-red-50 p-3.5 rounded-2xl mb-12 border border-red-100"
        >
          <Feather name="log-out" size={16} color="#EF4444" />
          <Text className="text-red-500 font-bold text-sm ml-2">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
