import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MusicPlayerCard from "./MusicPlayerCard";
import { useAudioPlayer } from "@hooks/player.hooks";

export default function BottomNav({ navigation, active }: any) {
	const { currentTrack } = useAudioPlayer();
	return (
		<View style={styles.navBar}>
			{/* Home Button */}
			<TouchableOpacity onPress={() => navigation.navigate("Home")} style={[styles.navButton, active === "Home" && styles.activeButton]}>
				<Ionicons name="home-outline" size={28} color={active === "Home" ? "tomato" : "white"} />
			</TouchableOpacity>

			{/* Profile Button */}
			<TouchableOpacity onPress={() => navigation.navigate("Search")} style={[styles.navButton, active === "Search" && styles.activeButton]}>
				<Ionicons name="search-outline" size={28} color={active === "Search" ? "tomato" : "white"} />
			</TouchableOpacity>

			{/* Settings Button */}
			<TouchableOpacity onPress={() => navigation.navigate("Playlist")} style={[styles.navButton, active === "Playlist" && styles.activeButton]}>
				<Ionicons name="albums-outline" size={28} color={active === "Playlist" ? "tomato" : "white"} />
			</TouchableOpacity>

			<TouchableOpacity onPress={() => navigation.navigate("Player")} style={[styles.navButton, active === "Player" && styles.activeButton]}>
				<Ionicons name="play-outline" size={28} color={active === "Player" ? "tomato" : "white"} />
			</TouchableOpacity>
			{active !== "Player" && (<MusicPlayerCard navigation={navigation} active={active}/>)}
		</View>
	);
}

const styles = StyleSheet.create({
	navBar: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: "#000",
		paddingVertical: 4,
	},
	navButton: {
		padding: 5,
	},
	activeButton: {
		borderBottomWidth: 2,
		borderBottomColor: "tomato",
	},
});
