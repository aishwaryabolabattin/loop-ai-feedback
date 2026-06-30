import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Temporary for Day 4
    const role = "ADMIN";       // Later: session.user.role
    const workspaceId = 1;      // Later: session.user.workspaceId

    // Only ADMIN can access this API
    if (role !== "ADMIN") {
      return NextResponse.json(
        { message: "Access Denied" },
        { status: 403 }
      );
    }

    const members = await prisma.user.findMany({
      where: {
        workspaceId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(members);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}