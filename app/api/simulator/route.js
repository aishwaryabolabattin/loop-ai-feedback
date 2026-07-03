import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { fakeFeedback } from "@/lib/fakeFeedback";

export async function POST() {
  try {
    const workspaceId = 1; // Default Workspace
    const userId = 1; // Default Admin User

    // Random number of feedback records (5–10)
    const count = Math.floor(Math.random() * 6) + 5;

    const imported = [];

    for (let i = 0; i < count; i++) {
      const randomFeedback =
        fakeFeedback[Math.floor(Math.random() * fakeFeedback.length)];

      const feedback = await prisma.feedback.create({
        data: {
          message: randomFeedback.message,
          sentiment: randomFeedback.sentiment,
          status: randomFeedback.status,
          theme: randomFeedback.theme,
          channel: randomFeedback.channel,
          workspaceId,
          userId,
        },
      });

      imported.push(feedback);
    }

    return NextResponse.json({
      success: true,
      message: `${count} feedback records generated successfully.`,
      total: count,
      feedback: imported,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate feedback.",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}