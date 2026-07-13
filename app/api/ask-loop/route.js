import OpenAI from "openai";
import { NextResponse } from "next/server";

import {
  retrieveRelevantFeedback,
} from "@/lib/semanticSearch";

// Create OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ==================================
// Day 15: Ask LOOP API
// ==================================

export async function POST(request) {
  try {
    // Read data sent from Ask LOOP page
    const body = await request.json();

    const question = body.question?.trim();

    // Check whether question is empty
    if (!question) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a question.",
        },
        {
          status: 400,
        },
      );
    }

    // ==================================
    // Step 1: Find relevant feedback
    // ==================================

    const relevantFeedback =
      await retrieveRelevantFeedback(
        question,
        {
          workspaceId: 1,
          limit: 5,
          minimumSimilarity: 0.2,
        },
      );

    // If no relevant feedback is found
    if (relevantFeedback.length === 0) {
      return NextResponse.json({
        success: true,
        question,
        answer:
          "I could not find enough relevant customer feedback to answer this question.",
        citations: [],
      });
    }

    // ==================================
    // Step 2: Create feedback context
    // ==================================

    const context = relevantFeedback
      .map((feedback, index) => {
        return `
[${index + 1}]
Feedback ID: ${feedback.id}
Message: ${feedback.message}
Theme: ${feedback.theme}
Sentiment: ${feedback.sentiment}
Status: ${feedback.status}
Summary: ${feedback.summary || "Not available"}
Channel: ${feedback.channel}
        `.trim();
      })
      .join("\n\n");

    // ==================================
    // Step 3: Generate grounded answer
    // ==================================

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4o-mini",

        temperature: 0.2,

        messages: [
          {
            role: "system",

            content: `
You are Ask LOOP, an AI customer-feedback analyst.

Answer the user's question using only the customer feedback records provided in the context.

Rules:

1. Use only the provided customer feedback.

2. Do not use outside information.

3. Do not invent customer feedback or unsupported facts.

4. Add citation numbers such as [1], [2], or [3] after every supported statement.

5. Use only citation numbers available in the provided feedback context.

6. Keep the answer clear, concise, and professional.

7. If the feedback does not contain enough information, clearly state that there is insufficient information.
            `.trim(),
          },

          {
            role: "user",

            content: `
Question:

${question}

Customer feedback context:

${context}

Provide a grounded answer with citations.
            `.trim(),
          },
        ],
      });

    // ==================================
    // Step 4: Read AI answer
    // ==================================

    const answer =
      completion.choices[0]?.message?.content?.trim() ||
      "Ask LOOP could not generate an answer.";

    // ==================================
    // Step 5: Prepare citation records
    // ==================================

    const citations = relevantFeedback.map(
      (feedback, index) => {
        return {
          citationNumber: index + 1,

          id: feedback.id,

          message: feedback.message,

          theme: feedback.theme,

          sentiment: feedback.sentiment,

          status: feedback.status,

          channel: feedback.channel,

          summary: feedback.summary,

          confidence: feedback.confidence,

          similarity: feedback.similarity,

          createdAt: feedback.createdAt,
        };
      },
    );

    // ==================================
    // Step 6: Return answer and sources
    // ==================================

    return NextResponse.json({
      success: true,

      question,

      answer,

      citations,
    });
  } catch (error) {
    console.error(
      "Ask LOOP API Error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error.message ||
          "Ask LOOP could not answer the question.",
      },
      {
        status: 500,
      },
    );
  }
}