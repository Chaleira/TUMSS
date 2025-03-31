import { Response } from "express";
import { AuthenticatedRequest } from "../types/request.types";
import { playlistService } from "../services/playlist.service";
import { JwtPayload } from "jsonwebtoken";

export const playlistController = {
	createPlaylist: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
		const { name } = req.body;
		const user = req.user as JwtPayload;
		const userId = user.id;

		if (!name || !userId) {
			res.status(400).json({ message: "Name and userId are required." });
			return;
		}
		try {
			const playlist = await playlistService.createPlaylist(name, userId);
			res.status(201).json(playlist);
		} catch (error: any) {
			console.error(error.message);
			res.status(500).json({ message: error.message });
		}
	},

	deletePlaylist: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
		const { id } = req.body;
		const user = req.user as JwtPayload;
		const userId = user.id;
		if (!id || !userId) {
			res.status(400).json({ message: "Id and userId are required." });
			return;
		}
		try {
			await playlistService.deletePlaylist(parseInt(id), userId);
			res.status(200).json({ message: "Playlist deleted successfully." });
		}
		catch (error: any) {
			console.error(error.message);
			res.status(500).json({ message: error.message });
		}
	},

	findPlaylistById: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
		const { id } = req.params;

		if (!id) {
			res.status(400).json({ message: "Id is required." });
			return;
		}
		try {
			const playlist = await playlistService.findPlaylistById(parseInt(id));
			if (!playlist) {
				res.status(404).json({ message: "Playlist not found." });
				return;
			}

			res.status(200).json(playlist);
		} catch (error: any) {
			console.error(error.message);
			res.status(500).json({ message: "Error finding playlist." });
		}
	},

	findPlaylistsByUserId: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
		const { userId } = req.params;

		if (!userId) {
			res.status(400).json({ message: "UserId is required." });
			return;
		}

		try {
			const playlists = await playlistService.findPlaylistsByUserId(parseInt(userId));
			if (!playlists) {
				res.status(404).json({ message: "Playlists not found." });
				return;
			}

			res.status(200).json(playlists);
		} catch (error: any) {
			console.error(error.message);
			res.status(500).json({ message: "Error finding playlists." });
		}
	},

	addSongToPlaylist: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
		const { playlistId, songId } = req.body;

		if (!playlistId || !songId) {
			res.status(400).json({ message: "PlaylistId and songId are required." });
			return;
		}

		try {
			await playlistService.addSongToPlaylist(playlistId, songId);
			res.status(201).json({ message: "Song added to playlist.", playlistId, songId });
		} catch (error: any) {
			console.error(error.message);
			res.status(500).json({ message: error.message });
		}
	},

	removeSongFromPlaylist: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
		const { playlistId, songId } = req.body;

		if (!playlistId || !songId) {
			res.status(400).json({ message: "PlaylistId and songId are required." });
			return;
		}

		try {
			await playlistService.removeSongFromPlaylist(playlistId, songId);
			res.status(200).json({ message: "Song removed from playlist.", playlistId, songId });
		} catch (error: any) {
			console.error(error.message);
			res.status(500).json({ message: error.message });
		}
	},

	getPlaylistSongs: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
		const { playlistId } = req.params;

		if (!playlistId) {
			res.status(400).json({ message: "Playlist Id is required." });
			return;
		}

		try {
			const songs = await playlistService.getPlaylistSongs(parseInt(playlistId));
			if (!songs) {
				res.status(404).json({ message: "Songs not found." });
				return;
			}

			res.status(200).json(songs);
		} catch (error: any) {
			console.error(error.message);
			res.status(500).json({ message: "Error getting playlist songs." });
		}
	}
};
