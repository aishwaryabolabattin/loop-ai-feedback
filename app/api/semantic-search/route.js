import {
  NextResponse,
} from "next/server";

import {
  retrieveRelevantFeedback,
} from "@/lib/semanticSearch";

export async function POST(request) {
  try {
    const body =
      await request.json();

    const question =
      body.question;

    if (
      !question ||
      !question.trim()
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Question is required.",
        },
        {
          status: 400,
        },
      );
    }

    const results =
      await retrieveRelevantFeedback(
        question,
        {
          workspaceId: 1,

          limit: 5,

          minimumSimilarity: 0.2,
        },
      );

    return NextResponse.json({
      success: true,

      question,

      totalResults:
        results.length,

      results,
    });
  } catch (error) {
    console.error(
      "Semantic search error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error.message ||
          "Semantic search failed.",
      },
      {
        status: 500,
      },
    );
  }
}