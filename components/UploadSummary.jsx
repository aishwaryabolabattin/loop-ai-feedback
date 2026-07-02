"use client";

export default function UploadSummary({
  total = 0,
  imported = 0,
  failed = 0,
  skipped = 0,
}) {
  const cards = [
    {
      title: "Total Rows",
      value: total,
      icon: "📄",
      color: "#4F46E5",
      bg: "#EEF2FF",
    },
    {
      title: "Imported",
      value: imported,
      icon: "✅",
      color: "#10B981",
      bg: "#ECFDF5",
    },
    {
      title: "Failed",
      value: failed,
      icon: "❌",
      color: "#EF4444",
      bg: "#FEF2F2",
    },
    {
      title: "Skipped",
      value: skipped,
      icon: "⏭️",
      color: "#F59E0B",
      bg: "#FFF7ED",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginTop: "30px",
        marginBottom: "30px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "25px",
            boxShadow: "0 12px 30px rgba(0,0,0,.08)",
            transition: ".3s",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
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
                  color: "#6B7280",
                  fontSize: "14px",
                  marginBottom: "10px",
                }}
              >
                {card.title}
              </p>

              <h2
                style={{
                  color: card.color,
                  fontSize: "40px",
                  margin: 0,
                  fontWeight: "700",
                }}
              >
                {card.value}
              </h2>
            </div>

            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "18px",
                background: card.bg,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "34px",
              }}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
