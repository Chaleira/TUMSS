import { Response } from "express";
import { AuthenticatedRequest } from "../types/request.types";
import fs from "fs";
import { musicService } from "../services/music.service";

export const musicController = {
	searchMusic: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
		const query = req.query.q;

		if (!query) {
			res.status(400).json({ message: "Query parameter is required." });
			return;
		}

		try {
			const videos = await musicService.fetchMusicFromYouTube(query as string);
			res.status(200).json(videos);
		} catch (error: any) {
			console.error(error.message);
			res.status(500).json({ message: error.message });
		}
	},

	streamMusic: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
		console.log("Streming music");
		const { videoId } = req.params;

		console.log("videoId", videoId);
		try {
			const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
			const filePathMp3 = await musicService.downloadVideoAndSaveToFile(videoUrl, videoId);

			const stat = fs.statSync(filePathMp3);
			const fileSize = stat.size;

			res.writeHead(200, {
				"Content-Type": "audio/mpeg",
				"Content-Length": fileSize,
			});

			const stream = fs.createReadStream(filePathMp3);
			stream.pipe(res);
		} catch (error: any) {
			console.error(error?.message);
			res.status(500).json({ message: error?.message });
		}
	},

	createMusic: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
		const { videoId } = req.body;

		if (!videoId) {
			res.status(400).json({ message: "Title and fileId are required." });
			console.error("Title and fileId are required.");
			return;
		}

		try {
			const music = await musicService.createMusic(videoId);
			if (!music) {
				res.status(500).json({ message: "Error creating music." });
				return;
			}

			res.status(201).json(music);
		} catch (error: any) {
			console.error(error.message);
			res.status(500).json({ message: error.message });
		}
	},

	getAllMusic: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
		try {
			const songs = await musicService.getAllSongs();
			res.status(200).json(songs);
		} catch (error: any) {
			console.error(error.message);
			res.status(500).json({ message: error.message });
		}
	}
};
