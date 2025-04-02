import { getAllMusic } from "@api/music.api";
import { useEffect, useState } from "react";
import { useAudioPlayer } from "./player.hooks";
import { set } from "lodash";
import { Music } from "types/music.types";


export const useHome = () => {
	const { playlist, setPlaylist } = useAudioPlayer();
	const [loading, setLoading] = useState(false);
	const [homePlaylist, setHomePlaylist] = useState<Music[]>([]);

	const fetchSongs = async () => {
		setLoading(true);
		try {
			const response = await getAllMusic();
			setHomePlaylist(response);
			if (playlist.music?.length === 0)
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

	return { loading, homePlaylist };
}