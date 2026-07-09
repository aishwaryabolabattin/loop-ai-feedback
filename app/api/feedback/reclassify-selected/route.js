import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { classifyFeedback } from "@/lib/ai";

export async function POST(request) {
  try {
    const { ids } = await request.json();

    if (!ids || ids.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No feedback selected.",
        },
        {
          status: 400,
        }
      );
    }

    let updated = 0;

    for (const id of ids) {
      const feedback = await prisma.feedback.findUnique({
        where: {
          id,
        },
      });

      if (!feedback) continue;

      const ai = await classifyFeedback(feedback.message);

      await prisma.feedback.update({
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

      updated++;
    }

    return NextResponse.json({
      success: true,
      updated,
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