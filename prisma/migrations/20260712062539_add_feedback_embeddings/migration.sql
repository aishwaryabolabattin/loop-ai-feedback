-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "embeddedAt" TIMESTAMP(3),
ADD COLUMN     "embedding" JSONB,
ADD COLUMN     "embeddingModel" TEXT;
