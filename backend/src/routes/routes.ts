import { Router } from "express";
import { shortenUrl, redirectUrl } from "../controllers/urlControllers.js";
import { Register, Login } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

// Auth routes (specific)
router.post("/register", Register);
router.post("/login", Login);

// API routes (specific)
router.post("/shorten",authMiddleware, shortenUrl);

// Redirect route (generic — MUST be last)
router.get("/:code", redirectUrl);

export default router;
