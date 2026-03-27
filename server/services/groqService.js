import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const analyzeResume = async (resumeText, targetRole) => {
  const completion1 = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `You are an expert resume analyzer. Analyze the following resume text and extract information in JSON format.

Resume Text:
${resumeText}

Return ONLY a valid JSON object with this exact structure, no markdown, no explanation, no code blocks:
{
  "name": "candidate name or Unknown",
  "email": "email or null",
  "phone": "phone or null",
  "summary": "brief 2-3 sentence professional summary of the candidate",
  "education": [
    {
      "degree": "degree name",
      "institution": "institution name",
      "year": "year or duration"
    }
  ],
  "experience": [
    {
      "title": "job title",
      "company": "company name",
      "duration": "duration",
      "description": "brief description"
    }
  ],
  "skills": ["skill1", "skill2", "skill3"]
}`,
      },
    ],
    temperature: 0.3,
  });

  const text1 = completion1.choices[0].message.content;
  const cleanText1 = text1.replace(/```json|```/g, "").trim();
  const extractedData = JSON.parse(cleanText1);

  const completion2 = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `You are an expert career advisor. Based on the target job role "${targetRole}", analyze the following candidate skills and identify gaps.

Candidate's current skills: ${JSON.stringify(extractedData.skills)}

Return ONLY a valid JSON object with this exact structure, no markdown, no explanation, no code blocks:
{
  "targetRole": "${targetRole}",
  "matchScore": 75,
  "missingSkills": ["skill1", "skill2"],
  "strongSkills": ["skill1", "skill2"],
  "recommendations": [
    {
      "skill": "skill name",
      "reason": "why this skill is important",
      "resource": "suggested learning resource"
    }
  ],
  "summary": "brief overall assessment"
}`,
      },
    ],
    temperature: 0.3,
  });

  const text2 = completion2.choices[0].message.content;
  const cleanText2 = text2.replace(/```json|```/g, "").trim();
  const gapData = JSON.parse(cleanText2);

  return {
    extractedData,
    gapData,
  };
};

export const generateLatex = async (extractedData) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `You are a LaTeX expert. Generate a professional, clean and complete LaTeX resume template using the following candidate data.

Candidate Data:
${JSON.stringify(extractedData, null, 2)}

Requirements:
- Use the article document class
- Use common packages: geometry, fontenc, inputenc, hyperref, titlesec, enumitem, xcolor
- Define a clean professional layout with blue color accents (use color #2563EB)
- Include all sections: Contact Info, Summary, Education, Experience, Skills
- Make it ATS friendly and professional
- The LaTeX must be complete and compilable on Overleaf without any modifications
- Do NOT include any explanation or markdown, return ONLY the raw LaTeX code starting with \\documentclass`,
      },
    ],
    temperature: 0.3,
    max_tokens: 3000,
  });

  const text = completion.choices[0].message.content;
  const cleanText = text.replace(/```latex|```/g, "").trim();
  return cleanText;
};
