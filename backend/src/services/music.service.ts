import axios from "axios";
import ytdl from "ytdl-core-discord";
import fs from "fs";
import path from "path";
import { youtube_api_key, search_website, DOWNLOADS_FOLDER } from "../config/config.index";

export const fetchMusicFromYouTube = async (query: string): Promise<any[]> => {
  const maxResults = 10;

  try {
    const response = await axios.get(search_website, {
      params: {
        part: 'snippet',
        q: query + ' music',
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
};


// THIS IS NOT WORKING
// THE FILE IS CREATED AND HAS THINGS INSIDE BUT THE MEDIA PLAYER SAYS IT'S EMPTY
export const downloadVideoAndSaveToFile = async (videoUrl: string, videoId: string): Promise<string> => {
    const filePath = path.join(DOWNLOADS_FOLDER, `${videoId}.webm`);
  
    if (fs.existsSync(filePath)) {
        console.log("Video already downloaded!");
      return filePath;
    }

    console.log("Downloading video...");
    const videoStream = await ytdl(videoUrl, {
      filter: 'audioonly',
      quality: 'highest',
    });

    const writeStream = fs.createWriteStream(filePath);
    
    videoStream.pipe(writeStream);
    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => {
        console.log("Download Complete!");    
        resolve(filePath)
    });
      writeStream.on('error', reject);
    });
  };
