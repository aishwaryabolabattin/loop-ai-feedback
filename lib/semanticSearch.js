import prisma from "@/lib/prisma";

import {
  createEmbedding,
} from "@/lib/embeddings";

// ==================================
// Calculate cosine similarity
// ==================================

export function cosineSimilarity(
  vectorA,
  vectorB,
) {
  // Check whether both embeddings exist.
  if (
    !Array.isArray(vectorA) ||
    !Array.isArray(vectorB)
  ) {
    return 0;
  }

  // Both embeddings must have the same length.
  if (vectorA.length !== vectorB.length) {
    return 0;
  }

  // Empty embeddings cannot be compared.
  if (vectorA.length === 0) {
    return 0;
  }

  let dotProduct = 0;

  let magnitudeA = 0;

  let magnitudeB = 0;

  // Compare every number in both embeddings.
  for (
    let index = 0;
    index < vectorA.length;
    index++
  ) {
    dotProduct +=
      vectorA[index] * vectorB[index];

    magnitudeA +=
      vectorA[index] * vectorA[index];

    magnitudeB +=
      vectorB[index] * vectorB[index];
  }

  // Avoid division by zero.
  if (
    magnitudeA === 0 ||
    magnitudeB === 0
  ) {
    return 0;
  }

  return (
    dotProduct /
    (
      Math.sqrt(magnitudeA) *
      Math.sqrt(magnitudeB)
    )
  );
}

// ==================================
// Retrieve relevant feedback
// ==================================

export async function retrieveRelevantFeedback(
  question,
  options = {},
) {
  const {
    workspaceId = 1,
    limit = 5,
    minimumSimilarity = 0.2,
  } = options;

  // Validate the user's question.
  if (
    !question ||
    !question.trim()
  ) {
    throw new Error(
      "A question is required for semantic search.",
    );
  }

  // Create an embedding for the question.
  const questionEmbedding =
    await createEmbedding(
      question.trim(),
    );

  // Load feedback records that have embeddings.
  const feedbackRecords =
    await prisma.feedback.findMany({
      where: {
        workspaceId,

        embedding: {
          not: null,
        },
      },

      select: {
        id: true,

        message: true,

        sentiment: true,

        status: true,

        theme: true,

        channel: true,

        summary: true,

        confidence: true,

        createdAt: true,

        embedding: true,
      },
    });

  // Calculate a similarity score for every record.
  const scoredFeedback =
    feedbackRecords.map(
      (feedback) => {
        const similarity =
          cosineSimilarity(
            questionEmbedding,
            feedback.embedding,
          );

        return {
          id: feedback.id,

          message: feedback.message,

          sentiment:
            feedback.sentiment,

          status:
            feedback.status,

          theme:
            feedback.theme,

          channel:
            feedback.channel,

          summary:
            feedback.summary,

          confidence:
            feedback.confidence,

          createdAt:
            feedback.createdAt,

          similarity,
        };
      },
    );

  // Keep relevant records and sort them.
  const relevantFeedback =
    scoredFeedback
      .filter(
        (feedback) =>
          feedback.similarity >=
          minimumSimilarity,
      )
      .sort(
        (first, second) =>
          second.similarity -
          first.similarity,
      )
      .slice(0, limit);

  return relevantFeedback;
}