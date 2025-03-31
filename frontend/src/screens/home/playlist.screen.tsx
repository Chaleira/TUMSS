import React, { useEffect, useState } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import MyButton from "components/MyButton";
import { useAuth } from "@hooks/auth.hooks";
import BottomNav from "@components/BottomNav";
import { createPlaylist, deletePlaylist, getPlaylistSongs, getUserPlaylists, removeSongFromPlaylist } from "@api/playlist.api";
import TextInputModal from "@components/TextInputModal";
import PlaylistList from "@components/PlaylistList";
import { PlaylistType } from "types/components.types";
import { Music } from "types/music.types";
import { useAudioPlayer } from "@hooks/player.hooks";
import { Ionicons } from "@expo/vector-icons";
import MusicList from "@components/MusicList";

export function PlaylistScreen({ navigation }: any) {
	const { user } = useAuth();
	const { setPlaylist, setPlaylistIndex, setReload } = useAudioPlayer();
	const [isCreatingPlaylistVisible, setIsCreatingPlaylistVisible] = useState(false);
	const [isPlaylistVisible, setIsPlaylistVisible] = useState(false);
	const [musicList, setMusicList] = useState<Music[]>([]);
	const [playlists, setPlaylists] = useState<PlaylistType[]>([]);
	const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistType | null>(null);

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
			setSelectedPlaylist(playlist);
			setIsPlaylistVisible(true);
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
	}, [musicList]);

	const handleMusicPress = async (item: Music) => {
		setIsPlaylistVisible(false);
		setPlaylistIndex(musicList.indexOf(item));
		setPlaylist(musicList);
		navigation.navigate("Player");
	};

	const handleRemovePress = async (item: Music) => {
		try {
			if (!selectedPlaylist || item.id === undefined) {
				Alert.alert("Error", "No playlist selected");
				return;
			}
			const remove = await removeSongFromPlaylist(item.id, selectedPlaylist.id);
			if (remove) {
				const newPlaylist = await getPlaylistSongs(selectedPlaylist.id);
				setReload(false);
				setPlaylist(newPlaylist);
				setMusicList(newPlaylist);
				Alert.alert("Success", item.title + " removed from playlist " + selectedPlaylist.name);
			} else {
				Alert.alert("Error", "Error removing music from playlist");
			}
		} catch (error: any) {
			Alert.alert("Error", error.message);
		}
	};

	const handleRemovePlaylist  = async (item: PlaylistType) => {
		try {
			if (item.id === undefined) {
				Alert.alert("Error", "No playlist selected");
				return;
			}
			const remove = await deletePlaylist(item.id);
			if (remove) {
				if (!user) return;
				const newPlaylist = await getUserPlaylists(user.id);
				setReload(false);
				setPlaylists(newPlaylist);
				Alert.alert("Success", "Playlist " + item.name + " deleted!");
			} else {
				Alert.alert("Error", "Error removing playlist");
			}
		} catch (error: any) {
			Alert.alert("Error", error.message);
		}
	};

	return (
		<View style={{ flex: 1, paddingTop: 30 }}>
			{isPlaylistVisible ? (
				<View style={{ flex: 1 }}>
					<TouchableOpacity onPress={() => {setIsPlaylistVisible(false); setSelectedPlaylist(null)}} style={{ padding: 10, alignItems: "flex-end" }}>
						<Ionicons name="arrow-back" size={28} />
					</TouchableOpacity>
					<View style={{ flex: 1, paddingLeft: 10 }}>
						<MusicList playlist={musicList} onPressMusic={handleMusicPress} addVisible={false} removeVisible={true} onPressRemove={handleRemovePress} />
					</View>
				</View>
			) : (
				<View style={{ paddingTop: 30 }}>
					<MyButton title="New" onPress={() => setIsCreatingPlaylistVisible(true)} />
					<TextInputModal isVisible={isCreatingPlaylistVisible} onClose={() => setIsCreatingPlaylistVisible(false)} onSubmit={handleTextSubmit} />

					<PlaylistList playlists={playlists} onSelect={(item) => handlePlaylistSelect(item) } onRemove={handleRemovePlaylist} />
				</View>
			)}

			<BottomNav navigation={navigation} active="Playlist" />
		</View>
	);
}
