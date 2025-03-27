import axios from "axios";
import fs from "fs";
import path from "path";
import { youtube_api_key, DOWNLOADS_FOLDER } from "../config/config.index";
import { exec } from "child_process";
import Song from "../models/song.model";
import puppeteer from "puppeteer";
// import cheerio from "cheerio";

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

	// const getMusicInfo = async (videoId: string): Promise<{ title: string; thumbnail: string }> => {
	// 	try {
	// 		const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
	// 			params: {
	// 				part: "snippet",
	// 				id: videoId,
	// 				key: youtube_api_key,
	// 			},
	// 		});
	// 		const video = response.data.items[0].snippet;
	// 		const title = video.title;
	// 		// const artist = video.channelTitle;
	// 		const thumbnail = video.thumbnails.high.url || video.thumbnails.default.url;

	// 		return {title, thumbnail };
	// 	} catch (error: any) {
	// 		console.error(error.message);
	// 		throw new Error("Error fetching video info");
	// 	}
	// };

	const getMusicInfo = async (videoId: string): Promise<{ title: string; thumbnail: string }> => {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

		try {
			await page.goto(videoUrl, { waitUntil: "domcontentloaded" });
			console.log("Video URL", videoUrl);

			await page.waitForSelector('meta[property="og:title"]');

			console.log("Titleaaa");
			const videoDetails = await page.evaluate((videoId) => {
				const titleElement = document.querySelector('meta[property="og:title"]');
				const title = titleElement ? titleElement.getAttribute("content") || "Unknown Title" : "Unknown Title";
				const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

				return { title, thumbnail };
			}, videoId);

			return videoDetails;
		} catch (error: any) {
			console.error(error.message);
			throw new Error("Error fetching video info");
		}
	};

	// After this return statement, all methods are public
	return {
		fetchMusicFromYouTube: async (query: string): Promise<any[]> => {
			const browser = await puppeteer.launch({ headless: true });
			const page = await browser.newPage();
			const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query + " official music")}`;

			try {
				// Go to the YouTube search page
				await page.goto(searchUrl, { waitUntil: "domcontentloaded" });

				// Wait for the first video results to load
				await page.waitForSelector("ytd-video-renderer");

				// Extract video data from the page
				const results = await page.evaluate(() => {
					const videoElements = document.querySelectorAll("ytd-video-renderer");
					return Array.from(videoElements)
						.map((video) => {
							const titleElement = video.querySelector("#video-title");

							const title = titleElement ? titleElement.textContent?.trim() : "Unknown Title";
							const fileId = titleElement instanceof HTMLAnchorElement ? new URL(titleElement.href).searchParams.get("v") : "";
							const thumbnail = `https://i.ytimg.com/vi/${fileId}/hqdefault.jpg`;

							return {
								title,
								fileId,
								thumbnail,
							};
						})
						.filter((video) => video.fileId); // Filter out any videos without fileId
				});

				// console.log("Results", results);
				return results; // Return only the first result
			} catch (error: any) {
				console.error("Error scraping YouTube:", error.message);
				throw new Error("Error scraping YouTube");
			} finally {
				await browser.close();
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
