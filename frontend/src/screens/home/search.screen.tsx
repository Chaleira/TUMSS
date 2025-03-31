import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import SearchBar from "../../components/SearchBar";
import { useSearch } from "../../hooks/search.hooks";
import BottomNav from "@components/BottomNav";
import { useAudioPlayer } from "@hooks/player.hooks";
import MusicList from "@components/MusicList";
import { createMusic } from "@api/music.api";
import { Music } from "types/music.types";
import { Ionicons } from "@expo/vector-icons";
import PlaylistList from "@components/PlaylistList";
import { useAuth } from "@hooks/auth.hooks";
import { addSongToPlaylist, getPlaylistSongs, getUserPlaylists } from "@api/playlist.api";

export function SearchScreen({ navigation }: any) {
	const { user } = useAuth();
	const { inputRef, setSearchQuery, results, loading } = useSearch();
	const { selectTrack, setPlaylist, setReload } = useAudioPlayer();
	const [isPlaylistListVisible, setIsPlaylistListVisible] = useState(false);
	const [playlists, setPlaylists] = useState([]);
	const [addMusic, setAddMusic] = useState<Music>();

	const handleOnPressAdd = async (item: Music) => {
		try {
			const music = await createMusic(item.fileId);
			setAddMusic(music);
			setIsPlaylistListVisible(true);
		} catch (error: any) {
			Alert.alert("Error", error.message);
		}
	};

	const handleOnPressMusic = (item: Music) => {
		selectTrack(item);
		navigation.navigate("Player");
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
		<View style={{ flex: 1, padding: 10, paddingTop: 40 }}>
			{isPlaylistListVisible ? (
				<View style={{ flex: 1 }}>
					<TouchableOpacity onPress={() => setIsPlaylistListVisible(false)} style={{ padding: 10, backgroundColor: "#ccc", borderRadius: 5 }}>
						<Ionicons name="arrow-back" size={28} />
					</TouchableOpacity>
					<PlaylistList
						playlists={playlists}
						onSelect={async (item) => {
							try {
								if (addMusic === undefined || addMusic.id === undefined) {
									Alert.alert("Error", "Error Selecting music");
									return;
								}
								await addSongToPlaylist(addMusic.id, item.id);
								const newPlaylist = await getPlaylistSongs(item.id);
								setReload(false);
								setPlaylist({id: item.id, name: item.name, music:newPlaylist});
								Alert.alert("Success", addMusic.title + ` added to playlist \n` + item.name);
							} catch (error: any) {
								Alert.alert("Error", error.message);
							}
						}}
					/>
				</View>
			) : (
				<View style={{ flex: 1 }}>
					<SearchBar onSearch={setSearchQuery} focus={inputRef} />

					{loading && <ActivityIndicator size="large" color="#0000ff" />}

					<MusicList playlist={results} onPressMusic={handleOnPressMusic} onPressAdd={handleOnPressAdd} />
				</View>
			)}
			<BottomNav navigation={navigation} active="Search" />
		</View>
	);
}
