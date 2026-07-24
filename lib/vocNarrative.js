import OpenAI from "openai";

// ========================================
// Create the OpenAI client
// ========================================

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// ========================================
// Day 16: Generate VoC AI Narrative
// ========================================

export async function generateVocNarrative({
  title,
  period,
  statistics,
}) {
  // Check whether statistics are available.

  if (!statistics) {
    throw new Error(
      "Voice-of-Customer statistics are required.",
    );
  }

  // ========================================
  // Send statistics to OpenAI
  // ========================================

  const completion =
    await openai.chat.completions.create({
      model: "inclusionai/ling-3.0-flash:free",

      // Low temperature provides more consistent reports.

      temperature: 0.2,

      // Ask OpenAI to return valid JSON.

      response_format: {
        type: "json_object",
      },

      messages: [
        {
          role: "system",

          content: `
You are Ask LOOP's Voice-of-Customer reporting analyst.

Generate a clear and professional management report using
only the customer-feedback statistics provided by the user.

Return valid JSON using exactly this structure:

{
  "narrative": "A clear executive summary of the customer-feedback results.",
  "keyInsights": [
    "First important customer insight",
    "Second important customer insight",
    "Third important customer insight"
  ],
  "recommendations": [
    "First practical recommendation",
    "Second practical recommendation",
    "Third practical recommendation"
  ]
}

Rules:

1. Use only the statistics supplied by the user.

2. Do not invent customer comments, counts, percentages,
themes, channels, or trends.

3. Mention the total amount of feedback.

4. Explain the important sentiment distribution.

5. Mention the most important customer themes.

6. Mention important status or channel information when useful.

7. Generate three to five key insights.

8. Generate three to five practical recommendations.

9. Keep the executive summary professional and easy to understand.

10. Do not include Markdown headings in the narrative.

11. Return only valid JSON.
          `.trim(),
        },

        {
          role: "user",

          content: JSON.stringify({
            reportTitle:
              title ||
              "Voice-of-Customer Report",

            reportPeriod:
              period ||
              "Selected Period",

            totalFeedback:
              statistics.totalFeedback,

            sentiment:
              statistics.sentiment,

            topThemes:
              statistics.topThemes,

            channels:
              statistics.channels,

            statuses:
              statistics.statuses,
          }),
        },
      ],
    });

  // ========================================
  // Read the generated response
  // ========================================

  const generatedContent =
    completion.choices[0]?.message
      ?.content;

  if (!generatedContent) {
    throw new Error(
      "OpenAI did not generate the Voice-of-Customer report.",
    );
  }

  // ========================================
  // Convert the JSON text to JavaScript
  // ========================================

  let generatedReport;

  try {
    generatedReport =
      JSON.parse(generatedContent);
  } catch (error) {
    console.error(
      "VoC narrative JSON error:",
      error,
    );

    throw new Error(
      "The generated Voice-of-Customer report has an invalid format.",
    );
  }

  // ========================================
  // Validate the generated report
  // ========================================

  const narrative =
    typeof generatedReport.narrative ===
    "string"
      ? generatedReport.narrative.trim()
      : "";

  const keyInsights =
    Array.isArray(
      generatedReport.keyInsights,
    )
      ? generatedReport.keyInsights
          .filter(
            (insight) =>
              typeof insight ===
                "string" &&
              insight.trim(),
          )
          .map((insight) =>
            insight.trim(),
          )
      : [];

  const recommendations =
    Array.isArray(
      generatedReport.recommendations,
    )
      ? generatedReport.recommendations
          .filter(
            (recommendation) =>
              typeof recommendation ===
                "string" &&
              recommendation.trim(),
          )
          .map(
            (recommendation) =>
              recommendation.trim(),
          )
      : [];

  if (!narrative) {
    throw new Error(
      "The executive summary was not generated.",
    );
  }

  // ========================================
  // Return the final narrative information
  // ========================================

  return {
    narrative,

    keyInsights,

    recommendations,
  };
}