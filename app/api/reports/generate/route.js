import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import {
  calculateVocStatistics,
} from "@/lib/vocStatistics";

import {
  generateVocNarrative,
} from "@/lib/vocNarrative";

// ========================================
// Day 16: Generate Voice-of-Customer Report
// ========================================

export async function POST(request) {
  try {
    // ========================================
    // Step 1: Read the request data
    // ========================================

    const body = await request.json();

    const workspaceId = 1;

    // Use 30 days when no period is selected.

    const numberOfDays =
      Number(body.days) || 30;

    // Validate the selected number of days.

    if (
      numberOfDays !== 7 &&
      numberOfDays !== 30 &&
      numberOfDays !== 90
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Please select a valid report period: 7, 30, or 90 days.",
        },
        {
          status: 400,
        },
      );
    }

    // ========================================
    // Step 2: Create the report date range
    // ========================================

    const endDate = new Date();

    // Include the complete current day.

    endDate.setHours(
      23,
      59,
      59,
      999,
    );

    const startDate =
      new Date(endDate);

    // Include today in the selected period.

    startDate.setDate(
      startDate.getDate() -
        numberOfDays +
        1,
    );

    // Start from the beginning of the first day.

    startDate.setHours(
      0,
      0,
      0,
      0,
    );

    // ========================================
    // Step 3: Create the report information
    // ========================================

    const period =
      `LAST_${numberOfDays}_DAYS`;

    const title =
      body.title?.trim() ||
      `Voice-of-Customer Report — Last ${numberOfDays} Days`;

    // ========================================
    // Step 4: Calculate real database statistics
    // ========================================

    const statistics =
      await calculateVocStatistics({
        workspaceId,

        startDate,

        endDate,
      });

    // Do not generate an empty report.

    if (
      statistics.totalFeedback === 0
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            `No customer feedback was found during the last ${numberOfDays} days.`,
        },
        {
          status: 400,
        },
      );
    }

    // ========================================
    // Step 5: Generate the AI narrative
    // ========================================

    const generatedNarrative =
      await generateVocNarrative({
        title,

        period:
          `Last ${numberOfDays} Days`,

        statistics,
      });

    // ========================================
    // Step 6: Save the report in PostgreSQL
    // ========================================

    const report =
      await prisma.vocReport.create({
        data: {
          title,

          period,

          startDate,

          endDate,

          totalFeedback:
            statistics.totalFeedback,

          positiveCount:
            statistics.sentiment
              .positive,

          neutralCount:
            statistics.sentiment
              .neutral,

          negativeCount:
            statistics.sentiment
              .negative,

          // Save calculated statistics as JSON.

          statistics: {
            sentimentPercentages:
              statistics.sentiment
                .percentages,

            topThemes:
              statistics.topThemes,

            channels:
              statistics.channels,

            statuses:
              statistics.statuses,
          },

          // Save AI-generated report content.

          narrative:
            generatedNarrative
              .narrative,

          keyInsights:
            generatedNarrative
              .keyInsights,

          recommendations:
            generatedNarrative
              .recommendations,

          status: "COMPLETED",

          workspaceId,
        },
      });

    // ========================================
    // Step 7: Return the saved report
    // ========================================

    return NextResponse.json(
      {
        success: true,

        message:
          "Voice-of-Customer report generated and saved successfully.",

        report,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "Generate VoC report error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error.message ||
          "The Voice-of-Customer report could not be generated.",
      },
      {
        status: 500,
      },
    );
  }
}