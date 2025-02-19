import axios from "axios";
import fs from "fs";
import path from "path";
import { youtube_api_key, DOWNLOADS_FOLDER } from "../config/config.index";
import { exec } from "child_process";
import { google } from 'googleapis';
import Song from "../models/song.model";

export const musicService = {

    fetchMusicFromYouTube: async (query: string): Promise<any[]> => {
      const maxResults = 10;

      try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
          params: {
            part: 'snippet',
            q: query + ' oficial music',
            type: 'video',
            maxResults,
            videoCategoryId: 10, // Music category
            key: youtube_api_key,
          },
        });

        return response.data.items.map((item: any) => ({
          title: item.snippet.title,
          videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          thumbnail: item.snippet.thumbnails.high.url,
        }));
      } catch (error) {
        throw new Error('Error fetching videos from YouTube');
      }
    },

    downloadVideoAndSaveToFile: async (videoUrl: string, videoId: string): Promise<string> => {
        const fileName = videoId;
        const filePath = path.join(DOWNLOADS_FOLDER, fileName);
        const filePathMp3 = `${filePath}.mp3`;

        if (!fs.existsSync(DOWNLOADS_FOLDER))
            fs.mkdirSync(DOWNLOADS_FOLDER);

        if (fs.existsSync(filePathMp3))
            return filePathMp3;

        return new Promise((resolve, reject) => {
            const pythonCommand = `./venv/bin/python3 src/utils/download_video.py "${videoUrl}" "${DOWNLOADS_FOLDER}" "${fileName}"`;

            exec(pythonCommand, async (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${stderr}`);
                    reject("Error downloading video");
                    return;
                }
                const song = await musicService.getMusicInfo(videoId);
                Song.create({ title: song.cleanedTitle, artist: song.artist, fileName: `${fileName}.mp3` });
                resolve(filePathMp3);
            });
        });
    },

    getMusicInfo: async (videoId: string) => {
        try {
          const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
            params: {
              part: 'snippet',
              id: videoId,
              key: youtube_api_key,
            },
          });
          const video = response.data.items[0].snippet;
          const title = video.title;
          const artist = video.channelTitle;

          const normalizedArtist = artist.toLowerCase();
          let normalizedTitle = title.toLowerCase();

          const artistWords = normalizedArtist.split(/\s|[-]+/);
          let cleanedTitle = normalizedTitle;

          artistWords.forEach((word : string) => {
            const wordRegex = new RegExp(`\\b${word}\\b`, 'g');
            cleanedTitle = cleanedTitle.replace(wordRegex, '').trim();
          });

          cleanedTitle = cleanedTitle.replace(/[\s\-]+/g, ' ').trim();
          if (cleanedTitle.length > 0) {
            cleanedTitle = cleanedTitle.charAt(0).toUpperCase() + cleanedTitle.slice(1);
          }

          return { cleanedTitle, artist };
        } catch (error) {
          console.error('Error fetching video info:', error);
          throw error;
        }
      
    }
}