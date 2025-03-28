import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import MyButton from "components/MyButton";
import { useAuth } from "@hooks/auth.hooks";
import BottomNav from "@components/BottomNav";
import { createPlaylist, getPlaylistSongs, getUserPlaylists } from "@api/playlist.api";
import TextInputModal from "@components/TextInputModal";
import PlaylistList from "@components/PlaylistList";
import { PlaylistType } from "types/components.types";
import MusicListPopup from "@components/MusicListPopup";
import { Music } from "types/music.types";
import { useAudioPlayer } from "@hooks/player.hooks";

export function PlaylistScreen({ navigation }: any) {
	const { user } = useAuth();
	const [isCreatingPlaylistVisible, setIsCreatingPlaylistVisible] = useState(false);
	const [isPlaylistVisible, setIsPlaylistVisible] = useState(false);
	const [musicList, setMusicList] = useState<Music[]>([]);
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

	const handlePlaylistSelect = async (playlist: PlaylistType) => {
		try {
			const response = await getPlaylistSongs(playlist.id);
			setMusicList(response);
			setIsPlaylistVisible(true);
			// console.log(response);
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

	const { setPlaylist, setPlaylistIndex } = useAudioPlayer();
	const handleMusicPress = async (item: Music) => {
		setIsPlaylistVisible(false);
		musicList.forEach((music) => {
			console.log(music.title);
		});
		// console.log(item);
		setPlaylist(musicList);
		setPlaylistIndex(musicList.indexOf(item));
		navigation.navigate("Player");
	};

	return (
		<View style={{ flex: 1, paddingTop: 30 }}>
			{isPlaylistVisible ? (
				<MusicListPopup musicList={musicList} onPressMusic={(item) => handleMusicPress(item)} onClose={() => setIsPlaylistVisible(false)} isVisible={isPlaylistVisible} />
			) : (
				<View style={{ paddingTop: 30 }}>
					<MyButton title="New" onPress={() => setIsCreatingPlaylistVisible(true)} />
					<TextInputModal isVisible={isCreatingPlaylistVisible} onClose={() => setIsCreatingPlaylistVisible(false)} onSubmit={handleTextSubmit} />

					<PlaylistList playlists={playlists} onSelect={(item) => handlePlaylistSelect(item)} />
				</View>
			)}

			<BottomNav navigation={navigation} active="Playlist" />
		</View>
	);
}
