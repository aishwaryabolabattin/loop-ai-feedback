import OpenAI from "openai";
import { feedbackSchema } from "./feedbackSchema";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function classifyFeedback(message) {
  try {
    const prompt = `
You are an AI customer feedback classifier.

Return ONLY valid JSON.

{
  "sentiment":"POSITIVE | NEGATIVE | NEUTRAL",
  "theme":"string",
  "status":"NEW",
  "summary":"string",
  "confidence":0.95
}

Customer Feedback:
${message}
`;

    const completion = await client.chat.completions.create({
      model: "inclusionai/ling-3.0-flash:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text = completion.choices[0]?.message?.content || "{}";
    const json = JSON.parse(text);

    return feedbackSchema.parse(json);
  } catch (error) {
    console.error("Classification Error:", error);

    return {
      sentiment: "NEUTRAL",
      theme: "General",
      status: "NEW",
      summary: "Unable to classify feedback.",
      confidence: 0,
    };
  }
}