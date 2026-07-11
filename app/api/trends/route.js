import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Number of days selected by the user
    const days = Number(searchParams.get("days")) || 7;

    // Optional theme filter
    const selectedTheme = searchParams.get("theme") || "";

    const workspaceId = 1;

    // Get all themes for the dropdown

const allThemeRecords = await prisma.feedback.findMany({
  where: {
    workspaceId,
  },

  select: {
    theme: true,
  },

  distinct: ["theme"],

  orderBy: {
    theme: "asc",
  },
});

const allThemes = allThemeRecords
  .map((item) => item.theme || "General")
  .filter(
    (theme, index, array) =>
      array.indexOf(theme) === index,
  );

    // Current date
    const now = new Date();

    // Beginning of the current period
    const currentStart = new Date();

    currentStart.setDate(now.getDate() - days);

    // Beginning of the previous period
    const previousStart = new Date();

    previousStart.setDate(now.getDate() - days * 2);

    // Get feedback from the current and previous periods
    const feedback = await prisma.feedback.findMany({
      where: {
        workspaceId,

        createdAt: {
          gte: previousStart,
          lte: now,
        },

        ...(selectedTheme && {
          theme: selectedTheme,
        }),
      },

      select: {
        id: true,
        theme: true,
        createdAt: true,
      },

      orderBy: {
        createdAt: "asc",
      },
    });

    // Current-period feedback
    const currentFeedback = feedback.filter(
      (item) => new Date(item.createdAt) >= currentStart,
    );

    // Previous-period feedback
    const previousFeedback = feedback.filter(
      (item) =>
        new Date(item.createdAt) >= previousStart &&
        new Date(item.createdAt) < currentStart,
    );

    const currentCount = currentFeedback.length;

    const previousCount = previousFeedback.length;

    // Percentage change
    let percentageChange = 0;

    if (previousCount > 0) {
      percentageChange =
        ((currentCount - previousCount) / previousCount) * 100;
    } else if (currentCount > 0) {
      percentageChange = 100;
    }

    // Group current feedback by date
    const groupedByDate = {};

    currentFeedback.forEach((item) => {
      const date = new Date(item.createdAt)
        .toISOString()
        .split("T")[0];

      if (!groupedByDate[date]) {
        groupedByDate[date] = 0;
      }

      groupedByDate[date]++;
    });

    // Calculate average daily feedback volume

const dailyCounts = Object.values(groupedByDate);

const averageDailyVolume =
  dailyCounts.length > 0
    ? dailyCounts.reduce(
        (total, count) => total + count,
        0,
      ) / dailyCounts.length
    : 0;

// Mark a date as a spike when its volume is
// at least 50% greater than the daily average

const trendData = Object.entries(groupedByDate).map(
  ([date, count]) => ({
    date,

    count,

    isSpike:
      averageDailyVolume > 0 &&
      count >= averageDailyVolume * 1.5,
  }),
);
    // Group current feedback by theme
    const groupedByTheme = {};

    currentFeedback.forEach((item) => {
      const theme = item.theme || "General";

      if (!groupedByTheme[theme]) {
        groupedByTheme[theme] = 0;
      }

      groupedByTheme[theme]++;
    });

    const themeData = Object.entries(groupedByTheme)
      .map(([theme, count]) => ({
        theme,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    // Spike detection
  const isSpike =
  previousCount > 0
    ? currentCount >= previousCount * 1.5
    : currentCount >= 5;

    return NextResponse.json({
      success: true,
      allThemes,
      period: {
        days,
        currentStart,
        previousStart,
        endDate: now,
      },

      summary: {
        currentCount,
        previousCount,
        percentageChange: Number(
          percentageChange.toFixed(1),
        ),
        isSpike,
      },

      trendData,

      themeData,
    });
  } catch (error) {
    console.error("Trends API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}