import OpenAI from "openai";

// Create the OpenAI client.
// The API key is read securely from .env.local.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// OpenAI model used to generate embeddings.
export const EMBEDDING_MODEL = "text-embedding-3-small";

/**
 * Converts text into an embedding vector.
 */
export async function createEmbedding(text) {
  // Prevent empty text from being sent to OpenAI.
  if (!text || !text.trim()) {
    throw new Error("Text is required to create an embedding.");
  }

  // Request an embedding from OpenAI.
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text.trim(),
  });

  // Return the numerical embedding array.
  return response.data[0].embedding;
}

/**
 * Combines important feedback fields into one text value.
 */
export function createFeedbackEmbeddingText(feedback) {
  return [
    `Message: ${feedback.message || ""}`,
    `Theme: ${feedback.theme || ""}`,
    `Sentiment: ${feedback.sentiment || ""}`,
    `Summary: ${feedback.summary || ""}`,
    `Channel: ${feedback.channel || ""}`,
  ].join("\n");
}