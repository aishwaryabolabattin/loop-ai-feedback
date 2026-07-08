import Anthropic from "@anthropic-ai/sdk";
import { feedbackSchema } from "./feedbackSchema";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function classifyFeedback(message) {
  try {
    const prompt = `
You are an AI customer feedback classifier.

Return ONLY valid JSON.

Schema:

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

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-latest",
      max_tokens: 300,

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text = response.content[0].text;

    const json = JSON.parse(text);

    return feedbackSchema.parse(json);

  } catch (error) {

    console.error("Claude Error:", error);

    return {
      sentiment: "NEUTRAL",
      theme: "General",
      status: "NEW",
      summary: "Unable to classify feedback.",
      confidence: 0,
    };
  }
}