import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    stats: {
      totalFeedback: 120,
      positive: 75,
      negative: 30,
      pending: 15,
    },

    volumeData: [
      { month: "Jan", total: 25 },
      { month: "Feb", total: 32 },
      { month: "Mar", total: 18 },
      { month: "Apr", total: 40 },
      { month: "May", total: 28 },
      { month: "Jun", total: 55 },
    ],

    sentimentData: [
      { name: "Positive", value: 60 },
      { name: "Negative", value: 25 },
      { name: "Neutral", value: 15 },
    ],

    themeData: [
      { theme: "Delivery", count: 25 },
      { theme: "Quality", count: 18 },
      { theme: "Support", count: 12 },
      { theme: "Price", count: 8 },
      { theme: "Packaging", count: 5 },
    ],
  });
}