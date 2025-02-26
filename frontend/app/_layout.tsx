import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Import icons
import { View } from "react-native-reanimated/lib/typescript/Animated";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Home", 
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} /> 
        }} 
      />
      <Tabs.Screen 
        name="search" 
        options={{ 
          title: "Search", 
          tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} /> 
        }} 
      />
      <Tabs.Screen 
        name="playlist" 
        options={{ 
          title: "Playlists", 
          tabBarIcon: ({ color, size }) => <Ionicons name="albums" color={color} size={size} /> 
        }} 
      />
    </Tabs>
  );
}
