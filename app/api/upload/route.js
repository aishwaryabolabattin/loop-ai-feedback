import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();

    const { feedbacks } = body;

    if (!feedbacks || !Array.isArray(feedbacks)) {
      return NextResponse.json(
        {
          success: false,
          message: "No feedback records found.",
        },
        { status: 400 }
      );
    }

    let imported = 0;
    let failed = 0;

    const errors = [];

    for (let i = 0; i < feedbacks.length; i++) {
      const row = feedbacks[i];

      try {
        // Validation
        if (
          !row.customer ||
          !row.message ||
          !row.sentiment ||
          !row.status ||
          !row.channel
        ) {
          failed++;

          errors.push({
            row: i + 1,
            error: "Missing required fields",
          });

          continue;
        }

        // Save into database
        await prisma.feedback.create({
          data: {
            customer: row.customer,
            message: row.message,
            sentiment: row.sentiment.toUpperCase(),
            status: row.status.toUpperCase(),
            channel: row.channel,

            // Change these IDs according to your database
            workspaceId: 1,
            userId: 1,
          },
        });

        imported++;
      } catch (error) {
        failed++;

        errors.push({
          row: i + 1,
          error: error.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      total: feedbacks.length,
      imported,
      failed,
      skipped: 0,
      errors,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}