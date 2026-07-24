import prisma from "@/lib/prisma";

export async function retrieveRelevantFeedback(question, options = {}) {
  const { workspaceId = 1, limit = 5 } = options;

  const feedbackRecords = await prisma.feedback.findMany({
    where: {
      workspaceId,
    },
    take: limit,
    orderBy: {
      createdAt: "desc",
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
  });

  return feedbackRecords.map((feedback) => ({
    ...feedback,
    similarity: 1,
  }));
}