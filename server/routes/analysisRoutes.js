import express from "express";
import {
  analyzeResumeController,
  getAnalysis,
} from "../controllers/analysisController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/multerConfig.js";

const router = express.Router();

router.post(
  "/resume",
  protect,
  upload.single("jobDocument"),
  analyzeResumeController,
);
router.get("/:id", protect, getAnalysis);

export default router;
