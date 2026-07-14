-- CreateTable
CREATE TABLE "VocReport" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalFeedback" INTEGER NOT NULL,
    "positiveCount" INTEGER NOT NULL DEFAULT 0,
    "neutralCount" INTEGER NOT NULL DEFAULT 0,
    "negativeCount" INTEGER NOT NULL DEFAULT 0,
    "statistics" JSONB NOT NULL,
    "narrative" TEXT NOT NULL,
    "keyInsights" JSONB NOT NULL,
    "recommendations" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'COMPLETED',
    "workspaceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VocReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VocReport" ADD CONSTRAINT "VocReport_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
