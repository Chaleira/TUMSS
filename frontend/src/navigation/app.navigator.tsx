import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/auth.context";
import { AuthNavigator } from "./auth.navigator";
import { HomeNavigator } from "./home.navigator";

// const Stack = createStackNavigator();

export default function AppNavigator() {
	const { user, isAuthenticated } = useAuth(); // Get user from AuthContext
	const [navigatorToShow, setNavigatorToShow] = useState<JSX.Element | null>(null);

	useEffect(() => {
		if (user)
			setNavigatorToShow(<HomeNavigator />);
		else
			setNavigatorToShow(<AuthNavigator />);
	}, [user]);
	return (
		<NavigationContainer>
			{navigatorToShow}
		</NavigationContainer>
	);
}
