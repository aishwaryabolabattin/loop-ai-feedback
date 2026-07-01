import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all feedback
export async function GET() {
  try {
    const workspaceId = 1; // Temporary

    const feedback = await prisma.feedback.findMany({
      where: {
        workspaceId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// CREATE feedback
export async function POST(request) {
  try {
    const body = await request.json();

    const workspaceId = 1; // Temporary
    const userId = 1; // Temporary Admin

    const feedback = await prisma.feedback.create({
      data: {
        message: body.message,
        sentiment: body.sentiment,
        status: body.status,
        theme: body.theme,
        channel: body.channel,
        workspaceId,
        userId,
      },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}