import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/home/home.screen";
import {SearchScreen} from "../screens/home/search.screen";

const Stack = createStackNavigator();

export function HomeNavigator() {
	return (
			<Stack.Navigator>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Search" component={SearchScreen} />
			</Stack.Navigator>
	);
}
