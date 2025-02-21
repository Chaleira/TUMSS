import dotenv from "dotenv";
import path from "path";

dotenv.config();

export const jwt_secret = process.env.JWT_SECRET as string;
if (!jwt_secret) {
	console.error("No JWT secret set. Set JWT_SECRET environment variable.");
	process.exit(1);
}

export const youtube_api_key = process.env.YOUTUBE_API_KEY as string;
if (!youtube_api_key) {
	console.error("No YouTube API key set. Set YOUTUBE_API_KEY environment variable.");
	process.exit(1);
}

export const DOWNLOADS_FOLDER = path.resolve(__dirname, "../../downloads");

export const port = process.env.PORT || 3000;
