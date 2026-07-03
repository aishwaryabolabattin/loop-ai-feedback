"use client";

export default function FeedbackBadge({ type, value }) {
  let background = "#E5E7EB";
  let color = "#374151";
  let icon = "🏷️";

  if (type === "sentiment") {
    switch (value) {
      case "POSITIVE":
        background = "#DCFCE7";
        color = "#166534";
        icon = "😊";
        break;

      case "NEGATIVE":
        background = "#FEE2E2";
        color = "#991B1B";
        icon = "😞";
        break;

      case "NEUTRAL":
        background = "#FEF3C7";
        color = "#92400E";
        icon = "😐";
        break;

      default:
        break;
    }
  }

  if (type === "status") {
    switch (value) {
      case "NEW":
        background = "#DBEAFE";
        color = "#1D4ED8";
        icon = "🆕";
        break;

      case "REVIEW":
        background = "#FEF3C7";
        color = "#92400E";
        icon = "👀";
        break;

      case "ACTIONED":
        background = "#DCFCE7";
        color = "#166534";
        icon = "✅";
        break;

      case "CLOSED":
        background = "#EDE9FE";
        color = "#6D28D9";
        icon = "✔️";
        break;

      default:
        break;
    }
  }

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 14px",
        borderRadius: "30px",
        background,
        color,
        fontWeight: "700",
        fontSize: "13px",
        letterSpacing: ".3px",
      }}
    >
      <span>{icon}</span>

      {value}
    </span>
  );
}
