import express, { Request, Response } from "express";
import cors from "cors";
import { port } from "./config/config.index";
import musicRoutes from "./routes/music.routes";
import userRoutes from "./routes/user.routes";
import playlistRoutes from "./routes/playlist.routes";
import { authenticateUser } from "./middlewares/auth.middleware";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());
const downloadsPath = path.join(__dirname, "downloads");
app.use("/downloads", express.static(downloadsPath));

app.use("/user", userRoutes);
app.use("/music", authenticateUser, musicRoutes);
app.use("/playlist", authenticateUser, playlistRoutes);
app.get("/", authenticateUser, (req: Request, res: Response) => {
	console.log("🎵 Welcome to the music app!");
	res.send("🎵 Welcome to the music app!");
});

app.listen(port, () => console.log(`🎵 Server running on http://localhost:${port}`));
