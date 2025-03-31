import { Ionicons } from "@expo/vector-icons";
import { useAudioPlayer } from "@hooks/player.hooks";
import { set } from "lodash";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated } from "react-native";
import { Directions, FlingGestureHandler, Gesture, GestureDetector, PanGestureHandler, State } from "react-native-gesture-handler";

export default function MusicPlayerCard({ navigation }: any) {
	const { currentTrack, isPlaying, playTrack, stopTrack, setPlaylistIndex, playlistIndex } = useAudioPlayer();

	return (
		<View style={styles.container}>
		<FlingGestureHandler
			direction={Directions.LEFT}
			onHandlerStateChange={({ nativeEvent }) => {
				if (nativeEvent.state === State.END) {
					if (playlistIndex < -5) return;
					setPlaylistIndex(playlistIndex + 1);
				}
			}}
		>
			<FlingGestureHandler
				direction={Directions.RIGHT}
				onHandlerStateChange={({ nativeEvent }) => {
					if (nativeEvent.state === State.END) {
						if (playlistIndex < -5) return;
						setPlaylistIndex(playlistIndex - 1);
					}
				}}
			>
					<TouchableOpacity onPress={() => navigation.navigate("Player")} style={{ flexDirection: "row", alignItems: "center" }}>
					<Image source={{ uri: currentTrack?.thumbnail }} style={styles.image} />

					<Text style={styles.songName}>{currentTrack?.title}</Text>

					<View style={styles.controls}>
						<TouchableOpacity style={styles.button} onPress={isPlaying ? stopTrack : playTrack}>
							<Ionicons name={isPlaying ? "pause" : "play"} size={24} color="white" />
						</TouchableOpacity>
					</View>
					</TouchableOpacity>
			</FlingGestureHandler>
		</FlingGestureHandler>
				</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 48,
		width: "100%",
		backgroundColor: "#222", // Dark background
		padding: 15,
		left: 0,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		height: 70,
		// borderTopLeftRadius: 20,
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 8,
	},
	songName: {
		color: "white",
		fontSize: 16,
		flex: 1,
		marginLeft: 10,
	},
	controls: {
		flexDirection: "row",
	},
	button: {
		// backgroundColor: "#1DB954", // Spotify Green
		paddingVertical: 8,
		paddingHorizontal: 15,
		borderRadius: 5,
		marginLeft: 10,
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
	},
});
