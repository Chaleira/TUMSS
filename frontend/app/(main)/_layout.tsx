import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Import icons
import { TouchableOpacity } from "react-native";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity onPress={() => console.log("Button Pressed!")}>
            <Ionicons name="menu" size={24} color="black" style={{ marginLeft: 15 }} />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Home",
		  headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} /> 
        }} 
      />
      <Tabs.Screen 
        name="search" 
        options={{ 
          title: "Search",
		  headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} /> 
        }} 
      />
      <Tabs.Screen 
        name="playlist" 
        options={{ 
          title: "Playlists",
		  headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="albums" color={color} size={size} /> 
        }} 
      />
    </Tabs>
  );
}
