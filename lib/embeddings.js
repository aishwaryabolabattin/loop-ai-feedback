export async function createEmbedding() {
  return [];
}

export function createFeedbackEmbeddingText(feedback) {
  return [
    `Message: ${feedback.message || ""}`,
    `Theme: ${feedback.theme || ""}`,
    `Sentiment: ${feedback.sentiment || ""}`,
    `Summary: ${feedback.summary || ""}`,
    `Channel: ${feedback.channel || ""}`,
  ].join("\n");
}