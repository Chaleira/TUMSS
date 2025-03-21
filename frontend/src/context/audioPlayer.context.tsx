import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { Audio } from "expo-av";
import { getYouTubeVideoID } from "@utils/parseUrl.utils";
import { API_MUSIC_STREAM } from "@config/config.index";
import * as SecureStore from "expo-secure-store";
import { API_ENDPOINT, AUTH_TOKEN, MAIN_SEARCH_URL } from "@config/config.index";
import { Music } from "types/music.types";
import { set } from "lodash";

// Define types
interface AudioPlayerContextType {
	selectTrack: (song: Music, navigation: any) => void;
	loadTrack: (song: Music, shouldPlay:boolean) => Promise<void>;
	playTrack: () => Promise<void>;
	stopTrack: () => Promise<void>;
	unloadTrack: () => Promise<void>;
	isPlaying: boolean;
	currentTrack: { title: string; thumbnail: string } | null;
	sliderValue: number;
	setSliderValue: (value: number) => void;
	load: boolean;
	setPlaylist: React.Dispatch<React.SetStateAction<Music[]>>;
	playlist: Music[];
	setPlaylistIndex: React.Dispatch<React.SetStateAction<number>>;
	playlistIndex: number;
	setLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create Context
export const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const soundRef = useRef<Audio.Sound | null>(null); // Persistent sound instance
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTrack, setCurrentTrack] = useState<Music | null>(null);
	const [sliderValue, setSliderValue] = useState(0);
	const [playlist, setPlaylist] = useState<Music[]>([]);
	const [playlistIndex, setPlaylistIndex] = useState<number>(-1);
	const [load, setLoad] = useState<boolean>(false);

	// Function to load a track
	const loadTrack = async (song: Music, shouldPlay: boolean) => {
		try {
			// Unload any existing track
			if (soundRef.current) {
				await soundRef.current.stopAsync();
				await soundRef.current.unloadAsync();
				soundRef.current = null;
			}

			if (song === undefined) return;
			let parsedUri = song.fileId.includes(MAIN_SEARCH_URL) ? getYouTubeVideoID(song.fileId) : song.fileId;

			const token = await SecureStore.getItemAsync(AUTH_TOKEN);
			if (!token) throw new Error("No token found");

			Audio.setAudioModeAsync({ staysActiveInBackground: true });

			const { sound } = await Audio.Sound.createAsync({ uri: API_MUSIC_STREAM + parsedUri, headers: { Authorization: `Bearer ${token}` } }, { shouldPlay: shouldPlay });

			if (shouldPlay)
				setIsPlaying(true);
			setCurrentTrack(song);
			soundRef.current = sound;
		} catch (error) {
			console.error("Error loading audio:", error);
		}
	};

	// Function to play the loaded track
	const playTrack = async () => {
		if (soundRef.current) {
			setIsPlaying(true);
			await soundRef.current.playAsync();

			soundRef.current.setOnPlaybackStatusUpdate((status) => {
				if (status.isLoaded && status.didJustFinish) {
					setPlaylistIndex(playlistIndex + 1);
					setIsPlaying(false);
				}
			});
		} else {
			console.error("No track loaded. Call loadTrack() first.");
		}
	};

	// Function to stop the current track
	const stopTrack = async () => {
		if (soundRef.current) {
			await soundRef.current.pauseAsync();
			setIsPlaying(false);
		}
	};

	// Function to unload the track
	const unloadTrack = async () => {
		if (soundRef.current) {
			await soundRef.current.unloadAsync();
			soundRef.current = null;
			setIsPlaying(false);
			setCurrentTrack(null);
		}
	};

	// Cleanup when unmounting
	useEffect(() => {
		return () => {
			if (soundRef.current) {
				soundRef.current.unloadAsync();
			}
		};
	}, []);

	useEffect(() => {
		if(playlist){
			loadTrack(playlist[0], false)
		}
	}, [playlist]);

	useEffect(() => {
		if (load) return;
		setLoad(true);
		if (playlist.length > 0) {
			if (playlistIndex < 0){
				setPlaylistIndex(playlist.length - 1);
				setLoad(false);
				return;
			}
			else if (playlistIndex >= playlist.length){
				setPlaylistIndex(0);
				setLoad(false);
				return;
			}
			selectTrack(playlist[playlistIndex], null);
		}
		setLoad(false);
	}, [playlistIndex]);

	const selectTrack = (song: Music, navigation: any) => {

		loadTrack(song, true);
		if (navigation)
			navigation.navigate("Player");
		 // Adjust delay as needed
	};

	return (
		<AudioPlayerContext.Provider
			value={{
				loadTrack,
				playTrack,
				stopTrack,
				unloadTrack,
				isPlaying,
				currentTrack,
				sliderValue,
				setSliderValue,
				selectTrack,
				load,
				setPlaylist,
				playlist,
				setPlaylistIndex,
				playlistIndex,
				setLoad,
			}}
		>
			{children}
		</AudioPlayerContext.Provider>
	);
};
