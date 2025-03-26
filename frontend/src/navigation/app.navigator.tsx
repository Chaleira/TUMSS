import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hooks/auth.hooks";
import { AuthNavigator } from "./auth.navigator";
import { HomeNavigator } from "./home.navigator";
import { ActivityIndicator, View } from "react-native";
import { setupInterceptors } from "../api/client.api";
import { AudioPlayerProvider } from "context/audioPlayer.context";


export default function AppNavigator() {
	const { user, loading, logout } = useAuth(); // Get user from AuthContext
	const [navigatorToShow, setNavigatorToShow] = useState<JSX.Element | null>(null);

	useEffect(() => {
		if (!loading){
			if (user)
			setNavigatorToShow(

				<AudioPlayerProvider>
					<HomeNavigator />
				</AudioPlayerProvider>
			);
			else
				setNavigatorToShow(

					<AuthNavigator />
				);
		}
	}, [user, loading]);

	useEffect(() => {
		setupInterceptors(logout);
	}, [logout]);

	if (loading) {
		return (
		  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<ActivityIndicator size="large" />
		  </View>
		);
	  }

	return (
		<NavigationContainer>
			{navigatorToShow}
		</NavigationContainer>
	);
}
