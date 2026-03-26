import Analysis from "../models/Analysis.js";
import Resume from "../models/Resume.js";
import { analyzeResume } from "../services/groqService.js";

export const analyzeResumeController = async (req, res) => {
  try {
    const { resumeId, targetRole } = req.body;

    if (!resumeId || !targetRole) {
      return res
        .status(400)
        .json({ message: "Resume ID and target role are required" });
    }

    const resume = await Resume.findOne({ _id: resumeId, userId: req.user.id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const existingAnalysis = await Analysis.findOne({ resumeId, targetRole });
    if (existingAnalysis) {
      return res.status(200).json({
        message: "Analysis retrieved from cache",
        analysis: existingAnalysis,
      });
    }

    const { extractedData, gapData } = await analyzeResume(
      resume.rawText,
      targetRole,
    );

    const analysis = await Analysis.create({
      userId: req.user.id,
      resumeId,
      targetRole,
      extractedData,
      gapData,
    });

    res.status(201).json({
      message: "Analysis complete",
      analysis,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!analysis) {
      return res.status(404).json({ message: "Analysis not found" });
    }

    res.status(200).json({ analysis });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
