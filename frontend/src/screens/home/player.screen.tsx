import { View, Text, Alert, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { useAuth } from "@hooks/auth.hooks";
import MediaButton from "@components/MediaButtons";
import MusicSlider from "@components/MusicSlider";
import BottomNav from "@components/BottomNav";
import { useAudioPlayer } from "@hooks/player.hooks";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Music } from "types/music.types";
import { getPlaylistSongs, getUserPlaylists, removeSongFromPlaylist } from "@api/playlist.api";
import MusicList from "@components/MusicList";
import { set } from "lodash";

export function PlayerScreen({ navigation }: any) {
	const { user } = useAuth();
	const { playTrack, stopTrack, isPlaying, currentTrack, playlist, sliderValue, onSliderValueChange, setPlaylistIndex, playlistIndex, duration, load, setPlaylist, setReload } = useAudioPlayer();
	const [prevDisabled, setPrevDisabled] = useState(false);
	const [nextDisabled, setNextDisabled] = useState(false);
	const [isPlaylistVisible, setIsPlaylistVisible] = useState(false);
	const [musicList, setMusicList] = useState<Music[]>([]);

	const handleNext = () => {
		if (playlistIndex < -5) return;
		setPlaylistIndex(playlistIndex + 1);
		setPrevDisabled(true); // Disable "Previous" button
		setTimeout(() => setPrevDisabled(false), 1000); // Re-enable after 1 sec
	};

	const handleRemovePress = async (item: Music) => {
			try {
				if (!playlist || item.id === undefined) {
					Alert.alert("Error", "No playlist selected");
					return;
				}
				const remove = await removeSongFromPlaylist(item.id, playlist.id);
				if (remove) {
					const newPlaylist = await getPlaylistSongs(playlist.id);
					setReload(false);
					setPlaylist({id: playlist.id, name: playlist.name, music:newPlaylist});
					setMusicList(newPlaylist);
					Alert.alert("Success", item.title + " removed from playlist " + playlist.name);
				} else {
					Alert.alert("Error", "Error removing music from playlist");
				}
			} catch (error: any) {
				Alert.alert("Error", error.message);
			}
		};

	const handlePrev = () => {
		if (playlistIndex < -5) return;
		setPlaylistIndex(playlistIndex - 1);
		setNextDisabled(true); // Disable "Next" button
		setTimeout(() => setNextDisabled(false), 1000); // Re-enable after
	};

	const handlePressCurrentPlaylist = () => {
		setIsPlaylistVisible(true);
	};

	const handleMusicPress = async (item: Music) => {
		setIsPlaylistVisible(false);
		setPlaylistIndex(playlist.music.indexOf(item));
		navigation.navigate("Player");
	};

	useEffect(() => {
		setMusicList(playlist.music);
	}, [playlist]);

	return (
		<View style={{ flex: 1, paddingTop: 35 }}>
			{isPlaylistVisible ? (
				<View style={{ flex: 1 }}>
					<TouchableOpacity
						onPress={() => {
							setIsPlaylistVisible(false);
						}}
						style={{ padding: 10, justifyContent: "space-between", flexDirection: "row", alignItems: "flex-end" }}
					>
						<Text style={{ fontSize: 24 }}>{playlist.name}</Text>
						<Ionicons name="arrow-back" size={28} />
					</TouchableOpacity>
					<View style={{ flex: 1, paddingLeft: 10 }}>
						<MusicList playlist={musicList} onPressMusic={handleMusicPress} addVisible={false} removeVisible={true} onPressRemove={handleRemovePress} />
					</View>
				</View>
			) : (
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					{load ? (
						<ActivityIndicator size="large" color="#1DB954" style={{ marginVertical: 20 }} />
					) : (
						<>
							<Image source={{ uri: currentTrack?.thumbnail }} style={{ width: 270, height: 150, borderRadius: 20 }} />
							<View style={{ justifyContent: "center" }}>
								<Text style={{ fontSize: 24, paddingTop: 20, justifyContent: "center", flexShrink: 1 }}>{currentTrack?.title || "No track loaded"}</Text>
							</View>
							<MusicSlider value={sliderValue} onValueChange={onSliderValueChange} maximumValue={duration} />
							<View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
								<MediaButton icon="play-back" onPress={handlePrev} disabled={prevDisabled} />
								<MediaButton icon={isPlaying ? "pause" : "play"} onPress={isPlaying ? stopTrack : playTrack} />
								<MediaButton icon="play-forward" onPress={handleNext} disabled={nextDisabled} />
							</View>
							<TouchableOpacity onPress={handlePressCurrentPlaylist} style={{ padding: 10, borderRadius: 5, alignItems: "center", paddingTop: 80 }}>
								<Ionicons name="albums" size={28} />
								<Text style={{ fontSize: 16, paddingTop: 10 }}>Current Playlist</Text>
							</TouchableOpacity>
						</>
					)}
				</View>
			)}
			<BottomNav navigation={navigation} active="Player" />
		</View>
	);
}

export default PlayerScreen;
function setReload(arg0: boolean) {
	throw new Error("Function not implemented.");
}
