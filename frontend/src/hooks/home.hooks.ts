import { getAllMusic } from "@api/music.api";
import { useEffect, useState } from "react";


export const useHome = () => {
	const [songs, setSongs] = useState<{title: string; artist: string; thumbnail: string; fileId: string;}[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchSongs = async () => {
		setLoading(true);
		try {
			const response = await getAllMusic();
			setSongs(response);
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

	return { songs, loading };
}