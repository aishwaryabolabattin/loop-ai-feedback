import prisma from "@/lib/prisma";

// ========================================
// Day 16: Calculate VoC Report Statistics
// ========================================

export async function calculateVocStatistics({
  workspaceId = 1,
  startDate,
  endDate,
}) {
  // Check whether dates are available.

  if (!startDate || !endDate) {
    throw new Error(
      "Start date and end date are required.",
    );
  }

  // ========================================
  // Step 1: Load feedback from the database
  // ========================================

  const feedback =
    await prisma.feedback.findMany({
      where: {
        workspaceId,

        createdAt: {
          gte: new Date(startDate),

          lte: new Date(endDate),
        },
      },

      select: {
        id: true,

        message: true,

        sentiment: true,

        status: true,

        theme: true,

        channel: true,

        summary: true,

        confidence: true,

        createdAt: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  // ========================================
  // Step 2: Calculate total feedback
  // ========================================

  const totalFeedback =
    feedback.length;

  // ========================================
  // Step 3: Calculate sentiment statistics
  // ========================================

  const positiveCount =
    feedback.filter(
      (item) =>
        item.sentiment
          ?.trim()
          .toUpperCase() ===
        "POSITIVE",
    ).length;

  const neutralCount =
    feedback.filter(
      (item) =>
        item.sentiment
          ?.trim()
          .toUpperCase() ===
        "NEUTRAL",
    ).length;

  const negativeCount =
    feedback.filter(
      (item) =>
        item.sentiment
          ?.trim()
          .toUpperCase() ===
        "NEGATIVE",
    ).length;

  // ========================================
  // Step 4: Calculate sentiment percentages
  // ========================================

  const sentimentPercentages = {
    positive:
      calculatePercentage(
        positiveCount,
        totalFeedback,
      ),

    neutral:
      calculatePercentage(
        neutralCount,
        totalFeedback,
      ),

    negative:
      calculatePercentage(
        negativeCount,
        totalFeedback,
      ),
  };

  // ========================================
  // Step 5: Calculate theme statistics
  // ========================================

  const themeMap = {};

  feedback.forEach((item) => {
    const theme =
      item.theme?.trim() ||
      "General";

    themeMap[theme] =
      (themeMap[theme] || 0) +
      1;
  });

  const topThemes =
    Object.entries(themeMap)
      .map(
        ([theme, count]) => ({
          theme,

          count,

          percentage:
            calculatePercentage(
              count,
              totalFeedback,
            ),
        }),
      )
      .sort(
        (firstTheme, secondTheme) =>
          secondTheme.count -
          firstTheme.count,
      );

  // ========================================
  // Step 6: Calculate channel statistics
  // ========================================

  const channelMap = {};

  feedback.forEach((item) => {
    const channel =
      item.channel?.trim() ||
      "Unknown";

    channelMap[channel] =
      (channelMap[channel] ||
        0) + 1;
  });

  const channels =
    Object.entries(channelMap)
      .map(
        ([channel, count]) => ({
          channel,

          count,

          percentage:
            calculatePercentage(
              count,
              totalFeedback,
            ),
        }),
      )
      .sort(
        (
          firstChannel,
          secondChannel,
        ) =>
          secondChannel.count -
          firstChannel.count,
      );

  // ========================================
  // Step 7: Calculate status statistics
  // ========================================

  const statusMap = {};

  feedback.forEach((item) => {
    const status =
      item.status?.trim() ||
      "Unknown";

    statusMap[status] =
      (statusMap[status] || 0) +
      1;
  });

  const statuses =
    Object.entries(statusMap)
      .map(
        ([status, count]) => ({
          status,

          count,

          percentage:
            calculatePercentage(
              count,
              totalFeedback,
            ),
        }),
      )
      .sort(
        (firstStatus, secondStatus) =>
          secondStatus.count -
          firstStatus.count,
      );

  // ========================================
  // Step 8: Return all calculated statistics
  // ========================================

  return {
    totalFeedback,

    sentiment: {
      positive: positiveCount,

      neutral: neutralCount,

      negative: negativeCount,

      percentages:
        sentimentPercentages,
    },

    topThemes,

    channels,

    statuses,

    feedback,
  };
}

// ========================================
// Percentage helper function
// ========================================

function calculatePercentage(
  count,
  total,
) {
  if (total === 0) {
    return 0;
  }

  return Number(
    (
      (count / total) *
      100
    ).toFixed(1),
  );
}