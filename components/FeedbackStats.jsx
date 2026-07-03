"use client";

export default function FeedbackStats({
  total = 0,
  positive = 0,
  negative = 0,
  pending = 0,
}) {
  const cards = [
    {
      title: "Total Feedback",
      value: total,
      icon: "📊",
      color: "#4F46E5",
      background: "#EEF2FF",
      description: "Overall feedback received",
    },
    {
      title: "Positive",
      value: positive,
      icon: "😊",
      color: "#10B981",
      background: "#ECFDF5",
      description: "Satisfied customers",
    },
    {
      title: "Negative",
      value: negative,
      icon: "😞",
      color: "#EF4444",
      background: "#FEF2F2",
      description: "Need attention",
    },
    {
      title: "Pending",
      value: pending,
      icon: "⏳",
      color: "#F59E0B",
      background: "#FFF7ED",
      description: "Awaiting action",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
        gap: "22px",
        marginBottom: "35px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "25px",
            boxShadow: "0 12px 35px rgba(0,0,0,.08)",
            transition: "0.3s",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
            e.currentTarget.style.boxShadow = "0 20px 45px rgba(79,70,229,.20)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,.08)";
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  color: "#6B7280",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {card.title}
              </p>

              <h1
                style={{
                  margin: "15px 0 8px",
                  color: card.color,
                  fontSize: "42px",
                  fontWeight: "800",
                }}
              >
                {card.value}
              </h1>

              <small
                style={{
                  color: "#9CA3AF",
                  fontSize: "13px",
                }}
              >
                {card.description}
              </small>
            </div>

            <div
              style={{
                width: "75px",
                height: "75px",
                borderRadius: "20px",
                background: card.background,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "36px",
              }}
            >
              {card.icon}
            </div>
          </div>

          <div
            style={{
              marginTop: "20px",
              height: "6px",
              borderRadius: "10px",
              background: "#F3F4F6",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width:
                  total > 0
                    ? `${Math.min((card.value / total) * 100, 100)}%`
                    : "0%",
                height: "100%",
                background: card.color,
                borderRadius: "10px",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
