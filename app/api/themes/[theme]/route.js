import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    // In newer Next.js versions, params may be asynchronous.
    const resolvedParams = await params;

    // Read and decode the selected theme from the URL.
    const theme = decodeURIComponent(
      resolvedParams.theme
    );

    // Validate the theme.
    if (!theme || theme.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          error: "Theme is required.",
        },
        {
          status: 400,
        }
      );
    }

    // Find feedback records belonging to the selected theme.
    const feedback = await prisma.feedback.findMany({
      where: {
        theme: {
          equals: theme,
          mode: "insensitive",
        },
      },

      include: {
        user: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    // Return selected theme feedback.
    return NextResponse.json({
      success: true,
      theme,
      count: feedback.length,
      feedback,
    });
  } catch (error) {
    console.error(
      "Theme drill-down API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error.message ||
          "Failed to load theme feedback.",
      },
      {
        status: 500,
      }
    );
  }
}