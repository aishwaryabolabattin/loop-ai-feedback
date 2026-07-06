import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
// GET Feedback (Pagination + Search)

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;

const limit = Number(searchParams.get("limit")) || 10;

const search = searchParams.get("search") || "";

const sentiment = searchParams.get("sentiment") || "";

const status = searchParams.get("status") || "";

const channel = searchParams.get("channel") || "";

const theme = searchParams.get("theme") || "";

const startDate = searchParams.get("startDate");

const endDate = searchParams.get("endDate");

const skip = (page - 1) * limit;

const workspaceId = 1;

const where = {
  workspaceId,

  ...(sentiment && {
    sentiment,
  }),

  ...(status && {
    status,
  }),

  ...(channel && {
    channel,
  }),

  ...(theme && {
    theme,
  }),

  ...(startDate &&
    endDate && {
      createdAt: {
        gte: new Date(startDate),

        lte: new Date(endDate),
      },
    }),

  OR: [
    {
      message: {
        contains: search,
        mode: "insensitive",
      },
    },

    {
      theme: {
        contains: search,
        mode: "insensitive",
      },
    },

    {
      channel: {
        contains: search,
        mode: "insensitive",
      },
    },
  ],
};

    const totalRecords = await prisma.feedback.count({
      where,
    });

    const totalPages = Math.ceil(totalRecords / limit);

    const feedback = await prisma.feedback.findMany({
      where,

      include: {
        user: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      skip,

      take: limit,
    });

    return NextResponse.json({
      feedback,
      totalPages,
      totalRecords,
      currentPage: page,
    });

  } catch (error) {

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
// CREATE Feedback

export async function POST(request) {
  try {
    const body = await request.json();

    const workspaceId = 1;
    const userId = 1;

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
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );

  }
}


// UPDATE STATUS

export async function PATCH(request) {
  try {

    const body = await request.json();

    const updated = await prisma.feedback.update({

      where: {
        id: body.id,
      },

      data: {
        status: body.status,
      },

    });

    return NextResponse.json(updated);

  } catch (error) {

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );

  }
}
// DELETE Feedback

export async function DELETE(request) {

  try {

    const { searchParams } = new URL(request.url);

    const id = Number(searchParams.get("id"));

    await prisma.feedback.delete({

      where: {
        id,
      },

    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );

  }

}
// EDIT Feedback

export async function PUT(request) {

  try {

    const body = await request.json();

    const feedback = await prisma.feedback.update({

      where: {
        id: body.id,
      },

      data: {

        message: body.message,
        sentiment: body.sentiment,
        status: body.status,
        theme: body.theme,
        channel: body.channel,

      },

    });

    return NextResponse.json(feedback);

  } catch (error) {

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );

  }

}