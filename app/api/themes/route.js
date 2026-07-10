import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Group all feedback records according to their theme
    const groupedThemes = await prisma.feedback.groupBy({
      by: ["theme"],

      _count: {
        id: true,
      },

      orderBy: {
        _count: {
          id: "desc",
        },
      },
    });

    // Count all feedback records
    const totalFeedback = await prisma.feedback.count();

    // Convert Prisma data into simple theme data
    const themes = groupedThemes.map((item) => {
      const count = item._count.id;

      const percentage =
        totalFeedback > 0
          ? Number(
              ((count / totalFeedback) * 100).toFixed(1)
            )
          : 0;

      return {
        name: item.theme || "Uncategorized",
        count,
        percentage,
      };
    });

    return NextResponse.json({
      success: true,
      themes,
      totalFeedback,
    });
  } catch (error) {
    console.error("Theme clustering API error:", error);

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