import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

console.log("Groq Key being used:", process.env.GROQ_API_KEY);

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const completion = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [{ role: "user", content: "Say hello in one sentence" }],
});

console.log(completion.choices[0].message.content);
