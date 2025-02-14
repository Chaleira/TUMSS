import { Router } from "express";
import { searchMusic, streamMusic } from "../controllers/music.controller";

const router = Router();

router.get("/search", searchMusic);
router.get("/stream/:videoId", streamMusic);

export default router;
