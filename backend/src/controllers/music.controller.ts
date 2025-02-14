import { Request, Response } from "express";
import { fetchMusicFromYouTube, downloadVideoAndSaveToFile } from "../services/music.service";

export const searchMusic = async (req: Request, res: Response): Promise<void> => {
  const query = req.query.q;

  if (!query) {
    res.status(400).json({ message: 'Query parameter is required.' });
    return;
  }

  try {
    const videos = await fetchMusicFromYouTube(query as string);
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
        const filePath = await downloadVideoAndSaveToFile(videoUrl, videoId);
        res.sendFile(filePath);
    } catch (error) {
      console.error('Error while downloading video:', error);
      res.status(500).json({ message: 'Error downloading video.' });
    }
  };