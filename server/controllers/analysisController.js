import Analysis from "../models/Analysis.js";
import Resume from "../models/Resume.js";
import {
  analyzeResume,
  analyzeResumeWithJobDoc,
} from "../services/groqService.js";
import fs from "fs";
import mammoth from "mammoth";

const extractTextFromPDF = async (filePath) => {
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const data = new Uint8Array(fs.readFileSync(filePath));
  const loadingTask = pdfjsLib.getDocument({ data });
  const pdf = await loadingTask.promise;
  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    fullText += pageText + "\n";
  }
  return fullText;
};

const extractTextFromFile = async (filePath, mimeType) => {
  if (mimeType === "application/pdf") {
    return await extractTextFromPDF(filePath);
  } else {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  }
};

export const analyzeResumeController = async (req, res) => {
  try {
    const resumeId = req.body?.resumeId;
    const targetRole = req.body?.targetRole;
    const analysisMode = req.body?.analysisMode || "role";

    if (!resumeId) {
      return res.status(400).json({ message: "Resume ID is required" });
    }

    if (analysisMode === "role" && !targetRole) {
      return res
        .status(400)
        .json({ message: "Target role is required for role based analysis" });
    }

    if (analysisMode === "document" && !req.file) {
      return res
        .status(400)
        .json({
          message:
            "Job description document is required for document based analysis",
        });
    }

    const resume = await Resume.findOne({ _id: resumeId, userId: req.user.id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    let extractedData,
      gapData,
      jobDocumentText = null;

    if (analysisMode === "document") {
      const filePath = req.file.path;
      const mimeType = req.file.mimetype;
      jobDocumentText = await extractTextFromFile(filePath, mimeType);
      fs.unlinkSync(filePath);

      if (!jobDocumentText || jobDocumentText.trim().length === 0) {
        return res
          .status(400)
          .json({
            message: "Could not extract text from job description document",
          });
      }

      const result = await analyzeResumeWithJobDoc(
        resume.rawText,
        jobDocumentText,
      );
      extractedData = result.extractedData;
      gapData = result.gapData;
    } else {
      const existingAnalysis = await Analysis.findOne({ resumeId, targetRole });
      if (existingAnalysis) {
        return res.status(200).json({
          message: "Analysis retrieved from cache",
          analysis: existingAnalysis,
        });
      }

      const result = await analyzeResume(resume.rawText, targetRole);
      extractedData = result.extractedData;
      gapData = result.gapData;
    }

    const analysis = await Analysis.create({
      userId: req.user.id,
      resumeId,
      targetRole: analysisMode === "role" ? targetRole : null,
      analysisMode,
      jobDocumentText,
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
