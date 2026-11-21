import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="product/[id]"
          options={{
            headerShown: false,
            presentation: "card",
          }}
        />
        <Stack.Screen
          name="checkout"
          options={{
            headerShown: false,
            presentation: "modal",
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
