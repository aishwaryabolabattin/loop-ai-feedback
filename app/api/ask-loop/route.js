import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

import {
  retrieveRelevantFeedback,
} from "@/lib/semanticSearch";

// Create OpenAI client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
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

    const prompt = `
You are Ask LOOP, an AI customer-feedback analyst.

Answer the user's question using ONLY the customer feedback below.

Rules:
1. Use only the provided feedback.
2. Do not invent information.
3. Add citations like [1], [2], [3].
4. If information is insufficient, clearly say so.

Question:
${question}

Customer Feedback:
${context}
`;

const result = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt,
});

    // ==================================
    // Step 4: Read AI answer
    // ==================================

    const answer =
  result.text ||
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