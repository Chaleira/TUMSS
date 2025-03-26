import { getAllMusic } from "@api/music.api";
import { useEffect, useState } from "react";
import { useAudioPlayer } from "./player.hooks";


export const useHome = () => {
	const { playlist, setPlaylist } = useAudioPlayer();
	const [loading, setLoading] = useState(false);

	const fetchSongs = async () => {
		setLoading(true);
		try {
			if (playlist.length > 0) return;
			const response = await getAllMusic();
			setPlaylist(response);
		} catch (error: any) {
			console.error("API Error:", error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchSongs();
	}
		, []);

	return { playlist, loading };
}