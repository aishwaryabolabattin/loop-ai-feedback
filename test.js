import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config({ path: ".env.local" });

console.log("API Key:", process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function test() {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Say Hello",
    });

    console.log(result.text);
  } catch (error) {
    console.error(error);
  }
}

test();