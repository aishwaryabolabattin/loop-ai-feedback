import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const workspaces = await prisma.workspace.findMany();
  const users = await prisma.user.findMany();

  return NextResponse.json({
    workspaces,
    users,
  });
}