import express from "express";
import {
  uploadResume,
  getResumeHistory,
  generateLatexTemplate,
} from "../controllers/resumeController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/multerConfig.js";

const router = express.Router();

router.post("/upload", protect, upload.single("resume"), uploadResume);
router.get("/history", protect, getResumeHistory);
router.post("/generate-latex", protect, generateLatexTemplate);

export default router;
