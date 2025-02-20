import { Router } from "express";
import { musicController } from "../controllers/music.controller";

const router = Router();

router.get("/search", musicController.searchMusic);
router.get("/stream/:videoId", musicController.streamMusic);

router.post("/create", musicController.createMusic);

export default router;
