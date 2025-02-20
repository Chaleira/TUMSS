import express, {Request, Response} from "express";
import cors from "cors";
import { port } from "./config/config.index";
import musicRoutes from "./routes/music.routes";
import userRoutes from "./routes/user.routes";
import playlistRoutes from "./routes/playlist.routes";
import { authenticateUser } from "./middlewares/auth.middleware";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/music", authenticateUser,musicRoutes);
app.use("/playlist", authenticateUser, playlistRoutes);
app.get("/", authenticateUser, (req: Request, res: Response) => {res.send("🎵 Welcome to the music app!")});

app.listen(port, () => console.log(`🎵 Server running on http://localhost:${port}`));
