"use client";

export default function DashboardStats({ stats }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
        gap: "20px",
        marginBottom: "35px",
      }}
    >
      <StatCard
        title="Total Feedback"
        value={stats.totalFeedback || 0}
        color="#4F46E5"
        icon="💬"
      />

      <StatCard
        title="Positive"
        value={stats.positive || 0}
        color="#10B981"
        icon="😊"
      />

      <StatCard
        title="Negative"
        value={stats.negative || 0}
        color="#EF4444"
        icon="😞"
      />

      <StatCard
        title="Pending"
        value={stats.pending || 0}
        color="#F59E0B"
        icon="⏳"
      />
    </div>
  );
}

function StatCard({ title, value, color, icon }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "25px",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
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
              marginBottom: "10px",
              fontWeight: "600",
            }}
          >
            {title}
          </p>

          <h2
            style={{
              color,
              fontSize: "34px",
              margin: 0,
            }}
          >
            {value}
          </h2>
        </div>

        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "15px",
            background: color,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontSize: "28px",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
