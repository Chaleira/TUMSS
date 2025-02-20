import { Router } from "express";
import { playlistController } from "../controllers/playlist.controller";

const router = Router();

router.get("/findById/:id", playlistController.findPlaylistById);
router.get("/findByUserId/:userId", playlistController.findPlaylistsByUserId);

router.post("/create", playlistController.createPlaylist);
router.post("/addSong", playlistController.addSongToPlaylist);

router.delete("/removeSong", playlistController.removeSongFromPlaylist);

export default router;
