import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

import {
  createEmbedding,
  createFeedbackEmbeddingText,
  EMBEDDING_MODEL,
} from "@/lib/embeddings";

// ==================================
// Day 15: Backfill old embeddings
// ==================================

export async function POST() {
  try {
    // Find feedback records that do not have embeddings.
    const feedbackRecords = await prisma.feedback.findMany({
      where: {
        embedding: {
          equals: null,
        },
      },

      orderBy: {
        createdAt: "asc",
      },
    });

    // If every feedback record already has an embedding.
    if (feedbackRecords.length === 0) {
      return NextResponse.json({
        success: true,
        message: "All feedback records already have embeddings.",
        totalFound: 0,
        updated: 0,
        failed: 0,
      });
    }

    let updated = 0;
    let failed = 0;

    const errors = [];

    // Generate an embedding for every old feedback record.
    for (const feedback of feedbackRecords) {
      try {
        // Combine the feedback fields into one text value.
        const embeddingText =
          createFeedbackEmbeddingText({
            message: feedback.message,
            sentiment: feedback.sentiment,
            theme: feedback.theme,
            summary: feedback.summary,
            channel: feedback.channel,
          });

        // Generate the OpenAI embedding.
        const embedding =
          await createEmbedding(embeddingText);

        // Save the embedding in the database.
        await prisma.feedback.update({
          where: {
            id: feedback.id,
          },

          data: {
            embedding,

            embeddedAt: new Date(),

            embeddingModel: EMBEDDING_MODEL,
          },
        });

        updated++;

        console.log(
          `Embedding created for feedback ID: ${feedback.id}`,
        );
      } catch (feedbackError) {
        failed++;

        console.error(
          `Embedding failed for feedback ID ${feedback.id}:`,
          feedbackError,
        );

        errors.push({
          id: feedback.id,
          error:
            feedbackError.message ||
            "Embedding generation failed.",
        });
      }
    }

    return NextResponse.json({
      success: failed === 0,

      message:
        failed === 0
          ? "Embedding backfill completed successfully."
          : "Embedding backfill completed with some errors.",

      totalFound: feedbackRecords.length,

      updated,

      failed,

      errors,
    });
  } catch (error) {
    console.error(
      "Embedding backfill error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error.message ||
          "Failed to backfill embeddings.",
      },
      {
        status: 500,
      },
    );
  }
}