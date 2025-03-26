import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import MyButton from "components/MyButton";
import { getMainData } from "@api/user.api";
import { useAuth } from "@hooks/auth.hooks";
import BottomNav from "@components/BottomNav";
import { createPlaylist, getUserPlaylists } from "@api/playlist.api";
import TextInputModal from "@components/TextInputModal";
import PlaylistList from "@components/PlaylistList";
import { PlaylistType } from "types/components.types";

export function PlaylistScreen({ navigation }: any) {
	const { user } = useAuth();
	const [isModalVisible, setModalVisible] = useState(false);
	const [playlists, setPlaylists] = useState<PlaylistType[]>([]);

	const handleTextSubmit = async (text: string) => {
		try {
			await createPlaylist(text);
			listPlaylist();
			// Alert.alert("Playlist Created");
		} catch (error: any) {
			Alert.alert("Error", error.message);
		}
	};

	const listPlaylist = async () => {
		try {
			if (!user?.id) return;
			const response = await getUserPlaylists(user.id);
			setPlaylists(response);
		} catch (error: any) {
			Alert.alert("Error", error.message);
		}
	};

	useEffect(() => {
		listPlaylist();
	}, []);

	return (
		<View style={{ flex: 1, paddingTop: 30 }}>
			<MyButton title="New" onPress={() => setModalVisible(true)} />
			<TextInputModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} onSubmit={handleTextSubmit} />
			<View style={{ alignItems: "center" }}>
				<Text style={{ fontSize: 24 }}>Welcome {user?.username} !</Text>
				<Text style={{ fontSize: 24 }}>Playlist Screen</Text>
			</View>
				<PlaylistList
					playlists={playlists}
					onSelect={(item) => {
						console.log(item.name);
					}}
				/>
			<BottomNav navigation={navigation} active="Playlist" />
		</View>
	);
}
