import React, { useState } from "react";
import { View, Modal, Button, TouchableOpacity, Text, StyleSheet } from "react-native";
import MusicList from "./MusicList"; // Import your MusicList component
import { Music } from "types/music.types";
import { useAudioPlayer } from "@hooks/player.hooks";

interface MusicListPopupProps {
	musicList: Music[];
	onPressMusic: (item: Music) => void;
	onClose: () => void;
	isVisible: boolean;
}

const MusicListPopup: React.FC<MusicListPopupProps> = ({ musicList, onPressMusic, isVisible, onClose }) => {
	
	return (
		<View style={styles.container}>
			<Modal visible={isVisible} animationType="slide" transparent>
				<TouchableOpacity onPress={onClose} style={styles.closeButton}>
					<Text style={styles.closeText}>Close</Text>
				</TouchableOpacity>
					<MusicList playlist={musicList} onPressMusic={onPressMusic} addVisible={false}/>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 30,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(255,255,255, 1)",
		},
	closeButton: {
		alignSelf: "flex-end",
		padding: 10,
	},
	closeText: {
		color: "red",
		fontSize: 16,
	},
});

export default MusicListPopup;
