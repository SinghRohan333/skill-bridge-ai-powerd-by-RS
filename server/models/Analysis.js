import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    targetRole: {
      type: String,
      default: null,
    },
    analysisMode: {
      type: String,
      enum: ["role", "document"],
      default: "role",
    },
    jobDocumentText: {
      type: String,
      default: null,
    },
    extractedData: {
      name: String,
      email: String,
      phone: String,
      summary: String,
      education: [
        {
          degree: String,
          institution: String,
          year: String,
        },
      ],
      experience: [
        {
          title: String,
          company: String,
          duration: String,
          description: String,
        },
      ],
      skills: [String],
    },
    gapData: {
      targetRole: String,
      matchScore: Number,
      missingSkills: [String],
      strongSkills: [String],
      recommendations: [
        {
          skill: String,
          reason: String,
          resource: String,
        },
      ],
      summary: String,
    },
    latexTemplate: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Analysis = mongoose.model("Analysis", analysisSchema);

export default Analysis;
