import api from "./client.api";

export const getPlaylist = async (id: string) => {
	try {
		const response = await api.get(`/playlist/findById/${id}`);
		return response.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		throw error;
	}
}

export const getUserPlaylists = async (userId: string) => {
	try {
		const response = await api.get(`/playlist/findByUserId/${userId}`);
		return response.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		throw error;
	}
}

export const createPlaylist = async (name: string) => {
	try {
		const response = await api.post("/playlist/create", { name });
		return response.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		throw error;
	}
}

export const addSongToPlaylist = async (songId: string, playlistId: string) => {
	try {
		const response = await api.post("/playlist/addSong", { songId, playlistId });
		return response.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		throw error;
	}
}

export const removeSongFromPlaylist = async (songId: string, playlistId: string) => {
	try {
		const response = await api.post("/playlist/removeSong", { songId, playlistId });
		return response.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		throw error;
	}
}
