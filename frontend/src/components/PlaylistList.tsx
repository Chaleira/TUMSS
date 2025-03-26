import React, { useEffect, useState } from "react";
import { Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { PlaylistType } from "../types/components.types";
import { getUserPlaylists } from "@api/playlist.api";

interface PlaylistListProps {
	playlists: PlaylistType[];
	onSelect: (item: PlaylistType) => void;
	// userId: string | undefined;
}

const PlaylistList: React.FC<PlaylistListProps> = ({ playlists, onSelect }) => {
	return (
		<FlatList
			data={playlists}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
					<Text style={styles.text}>{item.name}</Text>
				</TouchableOpacity>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	item: {
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	text: {
		fontSize: 16,
	},
});

export default PlaylistList;
