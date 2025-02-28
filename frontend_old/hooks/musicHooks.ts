import { searchMusic, streamMusic } from "@api/music";

export const useMusicActions = () => {
	const search = async (searchTerm: string) => {
		try {
			const data = await searchMusic(searchTerm);
			return data;
		} catch (error: any) {
			console.log('Search error:', error.message);
			return [];
		}
	}

	const stream = async (videoId: string) => {
		try {
			const data = await streamMusic(videoId);
			return data;
		}
		catch (error: any) {
			console.log('Stream error:', error.message);
			return [];
		}
	};

	return { search, stream };
}