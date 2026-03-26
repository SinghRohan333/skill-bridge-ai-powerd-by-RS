import express from "express";
import {
  analyzeResumeController,
  getAnalysis,
} from "../controllers/analysisController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/resume", protect, analyzeResumeController);
router.get("/:id", protect, getAnalysis);

export default router;
