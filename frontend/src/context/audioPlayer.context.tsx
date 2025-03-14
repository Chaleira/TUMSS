import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { Audio } from "expo-av";
import { getYouTubeVideoID } from "@utils/parseUrl.utils";
import { API_MUSIC_STREAM } from "@config/config.index";
import * as SecureStore from "expo-secure-store";
import { API_ENDPOINT, AUTH_TOKEN, MAIN_SEARCH_URL } from "@config/config.index";
import { Music } from "types/music.types";

// Define types
interface AudioPlayerContextType {
	selectTrack: (song: Music, navigation: any) => Promise<void>;
	loadTrack: (song: Music) => Promise<void>;
	playTrack: () => Promise<void>;
	stopTrack: () => Promise<void>;
	unloadTrack: () => Promise<void>;
	isPlaying: boolean;
	currentTrack: {title: string, thumbnail: string} | null;
	sliderValue: number;
	setSliderValue: (value: number) => void;
	load: boolean;
}

// Create Context
export const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const soundRef = useRef<Audio.Sound | null>(null); // Persistent sound instance
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTrack, setCurrentTrack] = useState<Music | null>(null);
	const [sliderValue, setSliderValue] = useState(0);
	// const [load, setLoad] = useState<boolean>(false);
	let load: boolean = false;

	// Function to load a track
	const loadTrack = async (song: Music) => {
		try {
			// Unload any existing track
			if (soundRef.current) {
				await soundRef.current.unloadAsync();
				soundRef.current = null;
			}

			let parsedUri = song.fileId.includes(MAIN_SEARCH_URL) ? getYouTubeVideoID(song.fileId) : song.fileId;

			const token = await SecureStore.getItemAsync(AUTH_TOKEN);
			if (!token)
				throw new Error("No token found");
			
			const { sound } = await Audio.Sound.createAsync({ uri: API_MUSIC_STREAM + parsedUri, headers: { Authorization: `Bearer ${token}` } }, { shouldPlay: true });

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

	const selectTrack = async (song: Music, navigation: any): Promise<void> => {
		if (load) return;
		load = true;

		await loadTrack(song);
		navigation.navigate("Player");
		// await playTrack();
		load = false;
	};

	return (
		<AudioPlayerContext.Provider value={{ loadTrack, playTrack, stopTrack, unloadTrack, isPlaying, currentTrack, sliderValue, setSliderValue, selectTrack, load }}>
			{children}
		</AudioPlayerContext.Provider>
	);
};
