import e, {Request, Response} from 'express';
import { playlistService } from '../services/playlist.service';

export const playlistController = {

	createPlaylist: async (req: Request, res: Response): Promise<void> => {
	const {name} = req.body;
	// @ts-ignore
	const userId = req.user.id;
	console.log(userId);

	if (!name || !userId) {
		res.status(400).json({ message: 'Name and userId are required.' });
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

	findPlaylistById: async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;

	if (!id) {
		res.status(400).json({ message: 'Id is required.' });
		return;
	}
	try {
		const playlist = await playlistService.findPlaylistById(parseInt(id));
		if (!playlist) {
			res.status(404).json({ message: 'Playlist not found.' });
			return;
		}

		res.status(200).json(playlist);
	} catch (error: any) {
		console.error(error.message);
		res.status(500).json({ message: 'Error finding playlist.' });
	}
	
	},

	findPlaylistsByUserId: async (req: Request, res: Response): Promise<void> => {
	const { userId } = req.params;

	if (!userId) {
		res.status(400).json({ message: 'UserId is required.' });
		return;
	}

	try {
		const playlists = await playlistService.findPlaylistsByUserId(parseInt(userId));
		if (!playlists) {
			res.status(404).json({ message: 'Playlists not found.' });
			return;
		}

		res.status(200).json(playlists);
	} catch (error: any) {
		console.error(error.message);
		res.status(500).json({ message: 'Error finding playlists.' });
	}
	},

	addSongToPlaylist: async (req: Request, res: Response): Promise<void> => {
	const { playlistId, songId } = req.body;

	if (!playlistId || !songId) {
		res.status(400).json({ message: 'PlaylistId and songId are required.' });
		return;
	}

	try {
		await playlistService.addSongToPlaylist(playlistId, songId);
		res.status(201).json({ message: 'Song added to playlist.', playlistId, songId });
	} catch (error: any) {
		console.error(error.message);
		res.status(500).json({ message: error.message });
	}
	},

	removeSongFromPlaylist: async (req: Request, res: Response): Promise<void> => {
	const { playlistId, songId } = req.body;

	if (!playlistId || !songId) {
		res.status(400).json({ message: 'PlaylistId and songId are required.' });
		return;
	}

	try {
		await playlistService.removeSongFromPlaylist(playlistId, songId);
		res.status(200).json({ message: 'Song removed from playlist.', playlistId, songId });
	} catch (error: any) {
		console.error(error.message);
		res.status(500).json({ message: error.message });
	}
	}
}