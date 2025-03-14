import React from "react";
import HomeScreen from "../screens/home/home.screen";
import {SearchScreen} from "../screens/home/search.screen";
import { PlaylistScreen } from "@screens/home/playlist.screen";
import { createStackNavigator } from "@react-navigation/stack";
import { PlayerScreen } from "@screens/home/player.screen";
import { AudioPlayerProvider } from "context/audioPlayer.context";

const Stack = createStackNavigator();

export function HomeNavigator() {

	return (
		<AudioPlayerProvider>
		<Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Playlist" component={PlaylistScreen} />
		<Stack.Screen name="Player" component={PlayerScreen} />
      </Stack.Navigator>
	  </AudioPlayerProvider>
	);
}
