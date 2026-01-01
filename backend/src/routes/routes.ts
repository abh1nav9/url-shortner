import { Router } from "express";
import { shortenUrl, redirectUrl } from "../controllers/urlControllers.js";

const router = Router();

// API route
router.post("/shorten", shortenUrl);

// Redirect route (no /api prefix)
router.get("/:code", redirectUrl);

export default router;
