import React, { useEffect, useState } from "react";
import { View, Text, Alert, TouchableOpacity, Image } from "react-native";
import MyButton from "components/MyButton";
import BottomNav from "components/BottomNav";
import { getMainData } from "@api/user.api";
import { useAuth } from "@hooks/auth.hooks";
import { useHome } from "@hooks/home.hooks";
import { FlatList } from "react-native-gesture-handler";
import { useAudioPlayer } from "@hooks/player.hooks";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MusicList from "@components/MusicList";
import PlaylistList from "@components/PlaylistList";
import { add, set } from "lodash";
import { addSongToPlaylist, getPlaylistSongs, getUserPlaylists } from "@api/playlist.api";
import { PlaylistType } from "types/components.types";
import { Music } from "types/music.types";

export default function HomeScreen({ navigation }: any) {
	const { logout, user } = useAuth();
	const { homePlaylist } = useHome();
	const { setPlaylistIndex, setPlaylist, setReload } = useAudioPlayer();
	const [isPlaylistListVisible, setIsPlaylistListVisible] = useState(false);
	const [playlists, setPlaylists] = useState<PlaylistType[]>([]);
	const [addMusic, setAddMusic] = useState<Music>();

	const handleGet = async () => {
		Alert.alert("Hello", "This is a community music app. You can add your own music to your playlist and share it with others.");
	};

	const handleAdd = async (item: Music) => {
		try {
			setAddMusic(item);
			setIsPlaylistListVisible(true);
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
		<View style={{ flex: 1, paddingLeft: 10, paddingTop: 35 }}>
			{isPlaylistListVisible ? (
				<View style={{ flex: 1 }}>
					<TouchableOpacity onPress={() => setIsPlaylistListVisible(false)} style={{ padding: 10, borderRadius: 5, alignItems: "flex-end" }}>
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
								setPlaylist(newPlaylist);
								Alert.alert("Success", addMusic.title + ` added to playlist \n` + item.name);
							} catch (error: any) {
								Alert.alert("Error", error.message);
							}
						}}
					/>
				</View>
			) : (
				<View style={{ flex: 1 }}>
					<View style={{ flexDirection: "row", alignItems: "flex-end" }}>
						<Text style={{ fontSize: 24 }}>Community Music</Text>
						<TouchableOpacity onPress={handleGet} style={{ marginLeft: "auto", paddingRight: 10 }}>
							<Ionicons name="help" size={28} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => logout()} style={{ paddingRight: 10 }}>
							<Ionicons name="log-out" size={28} />
						</TouchableOpacity>
					</View>
					<View style={{ flex: 1 }}>
						<MusicList
							playlist={homePlaylist}
							onPressMusic={async (item) => {
								setPlaylistIndex(homePlaylist.indexOf(item));
								setPlaylist(homePlaylist);
								navigation.navigate("Player");
							}}
							onPressAdd={handleAdd}
						/>
					</View>
				</View>
			)}
			<BottomNav navigation={navigation} active="Home" />
		</View>
	);
}
