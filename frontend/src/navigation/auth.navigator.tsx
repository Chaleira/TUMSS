import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {RegisterScreen} from "../screens/auth/register.screen";
import LoginScreen from "../screens/auth/login.screen";

const Stack = createStackNavigator();

export function AuthNavigator() {
	return (
			<Stack.Navigator>
				<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
				<Stack.Screen name="Register" component={RegisterScreen} />
			</Stack.Navigator>
	);
}
