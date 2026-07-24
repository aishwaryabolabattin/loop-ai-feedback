import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    success: true,
    message: "Embedding backfill is disabled because embeddings are no longer used.",
  });
}