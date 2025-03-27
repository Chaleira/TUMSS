import axios from "axios";
import fs from "fs";
import path from "path";
import { youtube_api_key, DOWNLOADS_FOLDER } from "../config/config.index";
import { exec } from "child_process";
import Song from "../models/song.model";

export const musicService = (() => {
	// This is a private method
	const getSongByFileId = async (fileId: string): Promise<Song | null> => {
		try {
			const song = await Song.findOne({
				where: {
					fileId,
				},
			});
			if (!song) {
				return null;
			}
			return song;
		} catch (error: any) {
			console.error(error.message);
			throw new Error("Error finding Song");
		}
	};

	const getMusicInfo = async (videoId: string): Promise<{ title: string; thumbnail: string }> => {
		try {
			const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
				params: {
					part: "snippet",
					id: videoId,
					key: youtube_api_key,
				},
			});
			const video = response.data.items[0].snippet;
			const title = video.title;
			// const artist = video.channelTitle;
			const thumbnail = video.thumbnails.high.url || video.thumbnails.default.url;

			return {title, thumbnail };
		} catch (error: any) {
			console.error(error.message);
			throw new Error("Error fetching video info");
		}
	};

	// const normalizeTitle = (title: string, artist: string): { title: string; artist: string } => {
	// 	try {
	// 		const normalizedArtist: string = artist.toLowerCase();
	// 		let normalizedTitle: string = title.toLowerCase();

	// 		const redex = new RegExp(`\\b${normalizedArtist}\\b`, "g");
	// 		let splitTitle = normalizedTitle.split("-");
	// 		let cleanedTitle = splitTitle[1].replace(redex, "").trim();

	// 		let cleanedArtist = normalizedArtist.charAt(0).toUpperCase() + normalizedArtist.slice(1);
	// 		cleanedTitle = cleanedTitle.charAt(0).toUpperCase() + cleanedTitle.slice(1);
	// 		return { title: cleanedTitle, artist: cleanedArtist };
	// 	} catch (error: any) {
	// 		console.error(error.message);
	// 		throw new Error("Error normalizing title and artist name");
	// 	}
	// };

	// After this return statement, all methods are public
	return {
		fetchMusicFromYouTube: async (query: string): Promise<Song[]> => {
			const maxResults = 1;

			try {
				const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
					params: {
						part: "snippet",
						q: query + " oficial music",
						type: "video",
						maxResults,
						videoCategoryId: 10, // Music category
						key: youtube_api_key,
					},
				});
				return response.data.items.map((item: any) => ({
					title: item.snippet.title,
					fileId: item.id.videoId,
					thumbnail: item.snippet.thumbnails.high.url,
				}));
			} catch (error: any) {
				console.error(error.message);
				throw new Error("Error fetching videos from YouTube");
			}
		},

		downloadVideoAndSaveToFile: async (videoUrl: string, videoId: string): Promise<string> => {
			const fileName = videoId;
			const filePath = path.join(DOWNLOADS_FOLDER, fileName);
			const filePathMp3 = `${filePath}.mp3`;

			try {
				if (!fs.existsSync(DOWNLOADS_FOLDER)) fs.mkdirSync(DOWNLOADS_FOLDER);

				if (fs.existsSync(filePathMp3)) return filePathMp3;

				return new Promise((resolve, reject) => {
					const pythonCommand = `./venv/bin/python3 src/utils/download_video.py "${videoUrl}" "${DOWNLOADS_FOLDER}" "${fileName}"`;

					exec(pythonCommand, async (error, stdout, stderr) => {
						if (error) reject();
						musicService.createMusic(videoId);
						resolve(filePathMp3);
					});
				});
			} catch (error: any) {
				console.error(error.message);
				throw new Error("Error downloading video");
			}
		},

		createMusic: async (videoId: string): Promise<Song | null> => {
			try {
				const checkSong = await getSongByFileId(videoId);
				if (checkSong !== null) return checkSong;
				const songInfo = await getMusicInfo(videoId);
				const song = await Song.create({
					title: songInfo.title,
					// artist: songInfo.artist,
					fileId: videoId,
					thumbnail: songInfo.thumbnail,
				});
				return song;
			} catch (error: any) {
				console.error(error.message);
				throw new Error("Error creating music");
			}
		},

		getAllSongs: async (): Promise<Song[]> => {
			try {
				const songs = await Song.findAll(); // Fetch all songs
				return songs;
			} catch (error: any) {
				console.error(error.message);
				throw new Error("Error retrieving songs");
			}
		},
	};
})();
