import fs from "fs";
import mammoth from "mammoth";
import Resume from "../models/Resume.js";
import { createRequire } from "module";
import { generateLatex } from "../services/groqService.js";
import Analysis from "../models/Analysis.js";

const require = createRequire(import.meta.url);

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

const extractTextFromFile = async (filePath, fileType) => {
  if (fileType === "pdf") {
    return await extractTextFromPDF(filePath);
  } else if (fileType === "docx") {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  }
};

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const originalName = req.file.originalname;
    const fileSize = req.file.size;
    const mimeType = req.file.mimetype;

    const fileType = mimeType === "application/pdf" ? "pdf" : "docx";

    const rawText = await extractTextFromFile(filePath, fileType);

    if (!rawText || rawText.trim().length === 0) {
      fs.unlinkSync(filePath);
      return res.status(400).json({
        message:
          "Could not extract text from file. Please make sure your resume has readable text.",
      });
    }

    const resume = await Resume.create({
      userId: req.user.id,
      fileName: originalName,
      fileType,
      rawText,
      fileSize,
    });

    fs.unlinkSync(filePath);

    res.status(201).json({
      message: "Resume uploaded and parsed successfully",
      resume: {
        id: resume._id,
        fileName: resume.fileName,
        fileType: resume.fileType,
        fileSize: resume.fileSize,
        createdAt: resume.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getResumeHistory = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id })
      .select("-rawText")
      .sort({ createdAt: -1 });

    res.status(200).json({ resumes });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const generateLatexTemplate = async (req, res) => {
  try {
    const { analysisId } = req.body;

    if (!analysisId) {
      return res.status(400).json({ message: "Analysis ID is required" });
    }

    const analysis = await Analysis.findOne({
      _id: analysisId,
      userId: req.user.id,
    });

    if (!analysis) {
      return res.status(404).json({ message: "Analysis not found" });
    }

    if (analysis.latexTemplate) {
      return res.status(200).json({
        message: "LaTeX template retrieved from cache",
        latex: analysis.latexTemplate,
      });
    }

    const latex = await generateLatex(analysis.extractedData);

    analysis.latexTemplate = latex;
    await analysis.save();

    res.status(200).json({
      message: "LaTeX template generated successfully",
      latex,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
