import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { classifyFeedback } from "@/lib/ai";

export async function POST() {
  try {
    const feedbackList = await prisma.feedback.findMany();

    let updated = 0;

    for (const item of feedbackList) {
      const ai = await classifyFeedback(item.message);

      await prisma.feedback.update({
        where: {
          id: item.id,
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