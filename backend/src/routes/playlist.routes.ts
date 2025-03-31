import { Router } from "express";
import { playlistController } from "../controllers/playlist.controller";

const router = Router();

router.get("/findById/:id", playlistController.findPlaylistById);
router.get("/findByUserId/:userId", playlistController.findPlaylistsByUserId);
router.get("/getPlaylistSongs/:playlistId", playlistController.getPlaylistSongs);

router.post("/create", playlistController.createPlaylist);
router.post("/addSong", playlistController.addSongToPlaylist);

router.post("/removeSong", playlistController.removeSongFromPlaylist);

export default router;
