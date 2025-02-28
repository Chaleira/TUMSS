import api from "./client.api";

export const searchMusic = async (query: string) => {
	try {
		const response = await api.get(`/music/search?q=${query}`);
		return response.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		throw error;
	}
}

export const createMusic = async (videoId: string) => {
	try {
		const response = await api.post("/music/create", videoId);
		return response.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		throw error;
	}
}

export const streamMusic = async (musicId: string) => {
	try {
		const response = await api.get(`/music/stream/${musicId}`);
		return response.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		throw error;
	}
}