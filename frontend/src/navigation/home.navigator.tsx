import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/home/home.screen";
import {SearchScreen} from "../screens/home/search.screen";
import { PlaylistScreen } from "@screens/home/playlist.screen";
import { createStackNavigator } from "@react-navigation/stack";
import { PlayerScreen } from "@screens/home/player.screen";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { Text } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// export function HomeNavigator() {
// 	return(
// 	<Stack.Navigator>
// 		<Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
// 		<Stack.Screen name="Player" component={PlayerScreen} options={{ headerShown: false }} />
// 	</Stack.Navigator>
// 	);
// }


export function HomeNavigator(){
	return (
		<Tab.Navigator initialRouteName="Home" >
			<Tab.Screen 
				name="Hidden" 
				component={HomeScreen}
				options={{ tabBarButton: () => null, headerShown: false }} 
  			/>
			<Tab.Screen 
				name="Home" 
				component={HomeScreen}
				options={{
					  title: "Home",
					  headerShown: false,
					  tabBarIcon: () => <Ionicons name="home" color="grey" size={20} /> 
	}} 
  />
			<Tab.Screen 
				name="Search" 
				component={SearchScreen}
				options={{ 
					  title: "Search",
					  headerShown: false,
					//   tabBarHideOnKeyboard: true,
					  tabBarIcon: () => <Ionicons name="search" color="grey" size={20} /> 
	}} 
  />
			  <Tab.Screen 
				name="Playlist" 
				component={PlaylistScreen}
				options={{ 
					  title: "Playlist",
					  headerShown: false,
					  tabBarIcon: () => <Ionicons name="albums" color="grey" size={20} /> 
	}} 
  />
			<Tab.Screen 
				name="Player" 
				component={PlayerScreen}
				options={{tabBarButton: () => null, headerShown: false}}
  			/>
		</Tab.Navigator>
);
}