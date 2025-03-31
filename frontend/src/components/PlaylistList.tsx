import React, { useEffect, useState } from "react";
import { Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { PlaylistType } from "../types/components.types";
import { getUserPlaylists } from "@api/playlist.api";
import { View } from "react-native-reanimated/lib/typescript/Animated";

interface PlaylistListProps {
	playlists: PlaylistType[];
	onSelect: (item: PlaylistType) => void;
	onRemove?: (item: PlaylistType) => void;
}

export default function PlaylistList({ playlists, onSelect, onRemove }: PlaylistListProps) {
	return (
		<FlatList
			data={playlists}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
					<Text style={styles.text}>{item.name}</Text>

					{onRemove && (
						<TouchableOpacity style={styles.removeButton} onPress={() => onRemove(item)}>
							<Text style={styles.removeButtonText}>Remove</Text>
						</TouchableOpacity>
					)}
				</TouchableOpacity>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	item: {
		flexDirection: 'row', // Horizontal layout
		alignItems: 'center',
		justifyContent: 'space-between', // Space between text and button
		padding: 10,
		backgroundColor: '#fff',
		marginBottom: 5,
		borderRadius: 8,
	},
	text: {
		fontSize: 16,
	},
	removeButton: {
		padding: 8,
		backgroundColor: 'red',
		borderRadius: 5,
	},
	removeButtonText: {
		color: 'white',
		fontWeight: 'bold',
	},
});
