import { z } from "zod";

export const feedbackSchema = z.object({
  sentiment: z.enum([
    "POSITIVE",
    "NEGATIVE",
    "NEUTRAL",
  ]),

  theme: z.string(),

  status: z.enum([
    "NEW",
    "REVIEW",
    "IN_PROGRESS",
    "ACTIONED",
    "RESOLVED",
  ]),

  summary: z.string(),

  confidence: z.number().min(0).max(1),
});