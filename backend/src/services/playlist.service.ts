import { Sequelize } from "sequelize";
import Playlist from "../models/playlist.model";
import PlaylistSong from "../models/playlistSong.model";
import Song from "../models/song.model";

export const playlistService = (() => {
	// This is a private method
	// const privateMethod = () => {
	// 	// Do something
	// };

	return {
		createPlaylist: async (name: string, userId: number): Promise<Playlist> => {
			try {
				const playlist: Playlist = await Playlist.create({
					name,
					userId,
				});
				return playlist;
			} catch (error: any) {
				console.error(error.message);
				throw new Error("Error creating Playlist");
			}
		},

		findPlaylistById: async (id: number): Promise<Playlist | null> => {
			try {
				const playlist = await Playlist.findOne({
					where: {
						id,
					},
				});
				return playlist;
			} catch (error: any) {
				console.error(error.message);
				throw new Error("Error Finding Playlist");
			}
		},

		findPlaylistsByUserId: async (userId: number): Promise<Playlist[] | null> => {
			try {
				const playlists: Playlist[] = await Playlist.findAll({
					where: {
						userId,
					},
				});
				return playlists;
			} catch (error: any) {
				console.error(error.message);
				throw new Error("Error finding Playlists");
			}
		},

		addSongToPlaylist: async (playlistId: number, songId: number): Promise<void> => {
			try {
				await PlaylistSong.create({
					playlistId,
					songId,
				});
			} catch (error: any) {
				if (error.name === "SequelizeForeignKeyConstraintError") throw new Error("Invalid playlistId or songId. One of them does not exist.");

				if (error.name === "SequelizeUniqueConstraintError") throw new Error("This song is already in the playlist.");

				throw new Error("An unexpected error occurred.");
			}
		},

		removeSongFromPlaylist: async (playlistId: number, songId: number): Promise<void> => {
			try {
				await PlaylistSong.destroy({
					where: {
						playlistId,
						songId,
					},
				});
			} catch (error: any) {
				if (error.name === "SequelizeForeignKeyConstraintError") throw new Error("Invalid playlistId or songId. One of them does not exist.");
				if (error.name === "SequelizeUniqueConstraintError") throw new Error("This song is not in the playlist.");
				throw new Error("An unexpected error occurred.");
			}
		},

		getPlaylistSongs: async (playlistId: number): Promise<Song[] | null> => {
			try {
				const playlistSongs = await PlaylistSong.findAll({
					where: { playlistId },
					order: [['createdAt', 'ASC']],
				});

				const songIds = playlistSongs.map((playlistSong) => playlistSong.songId);

				const songs = await Song.findAll({
					where: { id: songIds },
				});

				const orderedSongs = songIds.map((id) => songs.find((song) => song.id === id)!);

				return orderedSongs;
			} catch (error: any) {
				console.error(error.message);
				throw new Error("Error getting playlist songs");
			}
		}
	};
})();
