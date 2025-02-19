import { Request, Response } from "express";
import fs from "fs";
import { musicService } from "../services/music.service";

export const searchMusic = async (req: Request, res: Response): Promise<void> => {
  const query = req.query.q;

  if (!query) {
    res.status(400).json({ message: 'Query parameter is required.' });
    return;
  }

  try {
    const videos = await musicService.fetchMusicFromYouTube(query as string);
    res.json(videos);
  } catch (error) {
    console.error('Error while searching for music:', error);
    res.status(500).json({ message: 'Error fetching videos from YouTube.' });
  }
};

export const streamMusic = async (req: Request, res: Response): Promise<void> => {
    const { videoId } = req.params;
  
    try {
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const filePathMp3 = await musicService.downloadVideoAndSaveToFile(videoUrl, videoId);

        const stat = fs.statSync(filePathMp3);
        const fileSize = stat.size;

        res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Content-Length': fileSize,
        });

        const stream = fs.createReadStream(filePathMp3);
        stream.pipe(res);
    } catch (error) {
      console.error('Error while downloading video:', error);
      res.status(500).json({ message: 'Error downloading video.' });
    }
  };