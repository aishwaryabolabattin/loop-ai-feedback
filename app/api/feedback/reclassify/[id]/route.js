import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { classifyFeedback } from "@/lib/ai";

export async function POST(request, { params }) {
  try {
    const id = Number(params.id);

    const feedback = await prisma.feedback.findUnique({
      where: {
        id,
      },
    });

    if (!feedback) {
      return NextResponse.json(
        {
          success: false,
          error: "Feedback not found",
        },
        {
          status: 404,
        }
      );
    }

    const ai = await classifyFeedback(feedback.message);

    const updatedFeedback = await prisma.feedback.update({
      where: {
        id,
      },
      data: {
        sentiment: ai.sentiment,
        status: ai.status,
        theme: ai.theme,
        summary: ai.summary,
        confidence: ai.confidence,
      },
    });

    return NextResponse.json({
      success: true,
      feedback: updatedFeedback,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}