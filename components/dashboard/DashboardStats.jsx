"use client";

export default function DashboardStats({ stats }) {
  const cards = [
    {
      title: "Total Feedback",
      value: stats?.totalFeedback ?? 0,
      icon: "💬",
      description: "All feedback records",
    },

    {
      title: "Positive",
      value: stats?.positive ?? 0,
      icon: "😊",
      description: "Positive AI sentiment",
    },

    {
      title: "Negative",
      value: stats?.negative ?? 0,
      icon: "😞",
      description: "Negative AI sentiment",
    },

    {
      title: "Pending",
      value: stats?.pending ?? 0,
      icon: "⏳",
      description: "Feedback requiring action",
    },

    {
      title: "AI Confidence",
      value: `${stats?.averageConfidence ?? 0}%`,
      icon: "🤖",
      description: "Average classification confidence",
    },

    {
      title: "Top Theme",
      value: stats?.topTheme || "No themes",
      icon: "🏷️",
      description: `${stats?.topThemeCount ?? 0} feedback records`,
    },
  ];

  return (
    <div
      style={{
        display: "grid",

        gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",

        gap: "20px",

        marginBottom: "35px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          style={{
            padding: "24px",

            borderRadius: "17px",

            background: "#FFFFFF",

            border: "1px solid #E5E7EB",

            boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
          }}
        >
          <div
            style={{
              fontSize: "29px",

              marginBottom: "15px",
            }}
          >
            {card.icon}
          </div>

          <p
            style={{
              margin: 0,

              color: "#6B7280",

              fontWeight: "700",
            }}
          >
            {card.title}
          </p>

          <h2
            style={{
              margin: "12px 0 8px",

              color: "#4F46E5",

              fontSize: card.title === "Top Theme" ? "23px" : "33px",

              overflowWrap: "anywhere",
            }}
          >
            {card.value}
          </h2>

          <p
            style={{
              margin: 0,

              color: "#9CA3AF",

              fontSize: "13px",
            }}
          >
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
}
