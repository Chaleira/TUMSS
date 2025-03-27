// import React, { useState } from "react";
// import { View, Modal, Button, TouchableOpacity, Text, StyleSheet } from "react-native";
// import MusicList from "./MusicList"; // Import your MusicList component
// import { Music } from "types/music.types";
// import { PlaylistType } from "types/components.types";
// import PlaylistList from "./PlaylistList";

// interface PlaylistPopupProps {
// 	playlists: PlaylistType[];
// 	onPress: (item: PlaylistType) => void;
// 	music: Music;
// 	onClose: () => void;
// 	isVisible: boolean;
// }

// const PlaylistPopup: React.FC<PlaylistPopupProps> = ({ onPress, isVisible, onClose, music }) => {
	


// 	const handleSelect = (item: PlaylistType) => {
// 		console.log("Selected Playlist:", item);
// 	}
// 	return (
// 		<View style={styles.container}>
// 			<Modal visible={isVisible} animationType="slide" transparent>
// 				<TouchableOpacity onPress={onClose} style={styles.closeButton}>
// 					<Text style={styles.closeText}>Close</Text>
// 				</TouchableOpacity>
// 					{/* <PlaylistList onSelect={handleSelect}/> */}
// 			</Modal>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		paddingTop: 30,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		backgroundColor: "rgba(255,255,255, 1)",
// 		},
// 	closeButton: {
// 		alignSelf: "flex-end",
// 		padding: 10,
// 	},
// 	closeText: {
// 		color: "red",
// 		fontSize: 16,
// 	},
// });

// export default PlaylistPopup;
