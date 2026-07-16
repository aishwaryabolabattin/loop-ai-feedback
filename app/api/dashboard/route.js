import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const workspaceId = 1;

    // Load all feedback from the database

    const feedback = await prisma.feedback.findMany({
      where: {
        workspaceId,
      },

      select: {
        id: true,
        message: true,
        sentiment: true,
        status: true,
        theme: true,
        channel: true,
        confidence: true,
        summary: true,
        createdAt: true,
      },

      orderBy: {
        createdAt: "asc",
      },
    });

    // =================================
    // Dashboard statistics
    // =================================

    const totalFeedback = feedback.length;

    const positive = feedback.filter(
      (item) =>
        item.sentiment?.toUpperCase() === "POSITIVE",
    ).length;

    const negative = feedback.filter(
      (item) =>
        item.sentiment?.toUpperCase() === "NEGATIVE",
    ).length;

    const neutral = feedback.filter(
      (item) =>
        item.sentiment?.toUpperCase() === "NEUTRAL",
    ).length;

    const pending = feedback.filter((item) => {
      const status = item.status?.toUpperCase();

      return (
        status === "NEW" ||
        status === "PENDING" ||
        status === "IN_PROGRESS" ||
        status === "IN PROGRESS"
      );
    }).length;

    const resolved = feedback.filter(
      (item) =>
        item.status?.toUpperCase() === "RESOLVED",
    ).length;

    // =================================
    // Average AI confidence
    // =================================

    const confidenceValues = feedback
      .map((item) => Number(item.confidence))
      .filter(
        (value) =>
          Number.isFinite(value) && value >= 0,
      );

    let averageConfidence =
      confidenceValues.length > 0
        ? confidenceValues.reduce(
            (total, value) => total + value,
            0,
          ) / confidenceValues.length
        : 0;

    // Convert 0.90 into 90%

    if (averageConfidence <= 1) {
      averageConfidence =
        averageConfidence * 100;
    }

    averageConfidence = Number(
      averageConfidence.toFixed(1),
    );

    // =================================
    // Feedback volume by month
    // =================================

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const volumeMap = {};

    feedback.forEach((item) => {
      const date = new Date(item.createdAt);

      const month =
        monthNames[date.getMonth()];

      const year =
        date.getFullYear();

      const key =
        `${year}-${date.getMonth()}`;

      if (!volumeMap[key]) {
        volumeMap[key] = {
          month,
          year,
          total: 0,
        };
      }

      volumeMap[key].total += 1;
    });

    const volumeData =
      Object.values(volumeMap);

    // =================================
    // Sentiment chart data
    // =================================

    const sentimentData = [
      {
        name: "Positive",
        value: positive,
      },

      {
        name: "Negative",
        value: negative,
      },

      {
        name: "Neutral",
        value: neutral,
      },
    ];

    // =================================
    // AI theme chart data
    // =================================

    const themeCounts = {};

    feedback.forEach((item) => {
      const theme =
        item.theme?.trim() || "General";

      themeCounts[theme] =
        (themeCounts[theme] || 0) + 1;
    });

    const themeData = Object.entries(
      themeCounts,
    )
      .map(([theme, count]) => ({
        theme,
        count,
      }))
      .sort(
        (firstTheme, secondTheme) =>
          secondTheme.count -
          firstTheme.count,
      )
      .slice(0, 5);

    // =================================
    // Top AI-generated theme
    // =================================

    const topTheme =
      themeData.length > 0
        ? themeData[0]
        : {
            theme: "No themes",
            count: 0,
          };

    // =================================
    // Recent feedback
    // =================================

    const recentFeedback = [...feedback]
      .reverse()
      .slice(0, 5)
      .map((item) => ({
        id: item.id,

        message: item.message,

        summary:
          item.summary || item.message,

        sentiment:
          item.sentiment || "NEUTRAL",

        status:
          item.status || "NEW",

        theme:
          item.theme || "General",

        channel:
          item.channel || "Unknown",

        confidence:
          item.confidence,

        createdAt:
          item.createdAt,
      }));

    // =================================
    // Send data to dashboard
    // =================================

    return NextResponse.json(
  {
    success: true,
    message: "Dashboard loaded successfully.",

    stats: {
      totalFeedback,
      positive,
      negative,
      neutral,
      pending,
      resolved,
      averageConfidence,
      topTheme: topTheme.theme,
      topThemeCount: topTheme.count,
    },

    volumeData,
    sentimentData,
    themeData,
    recentFeedback,
  },
  {
    status: 200,
  }
);
  } catch (error) {
    console.error(
      "Dashboard API error:",
      error,
    );

   return NextResponse.json(
  {
    success: false,
    message:
      error.message ||
      "Dashboard data could not be loaded.",
  },
  {
    status: 500,
  }
);
  }
}