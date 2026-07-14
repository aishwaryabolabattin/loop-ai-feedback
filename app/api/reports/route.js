import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

// ========================================
// Day 16: Load Saved VoC Reports
// ========================================

export async function GET() {
  try {
    // Current workspace
    const workspaceId = 1;

    // ========================================
    // Load all saved reports
    // ========================================

    const reports =
      await prisma.vocReport.findMany({
        where: {
          workspaceId,
        },

        // Display the newest report first.
        orderBy: {
          createdAt: "desc",
        },

        // Return the fields required by
        // the Reports page and report cards.
        select: {
          id: true,

          title: true,

          period: true,

          startDate: true,

          endDate: true,

          totalFeedback: true,

          positiveCount: true,

          neutralCount: true,

          negativeCount: true,

          status: true,

          createdAt: true,

          updatedAt: true,
        },
      });

    // ========================================
    // Return all saved reports
    // ========================================

    return NextResponse.json({
      success: true,

      totalReports: reports.length,

      reports,
    });
  } catch (error) {
    console.error(
      "Load saved VoC reports error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error.message ||
          "Saved Voice-of-Customer reports could not be loaded.",
      },
      {
        status: 500,
      },
    );
  }
}