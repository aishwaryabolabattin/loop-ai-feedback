"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = {
  Positive: "#22C55E",
  Negative: "#EF4444",
  Neutral: "#F59E0B",
};

export default function SentimentPieChart({ data = [] }) {
  const total = data.reduce((sum, item) => sum + Number(item.value || 0), 0);

  const hasData = data.length > 0 && total > 0;

  return (
    <div style={chartCard}>
      <div style={chartHeading}>
        <div>
          <h2 style={chartTitle}>Sentiment Analysis</h2>

          <p style={chartDescription}>AI-classified customer sentiment</p>
        </div>

        <span style={chartIcon}>😊</span>
      </div>

      {!hasData ? (
        <EmptyChart />
      ) : (
        <div
          style={{
            width: "100%",
            height: "310px",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={4}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((item, index) => (
                  <Cell
                    key={`${item.name}-${index}`}
                    fill={COLORS[item.name] || "#6366F1"}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function EmptyChart() {
  return (
    <div style={emptyChart}>
      <div
        style={{
          fontSize: "35px",
          marginBottom: "12px",
        }}
      >
        🥧
      </div>

      <p
        style={{
          margin: 0,
        }}
      >
        No sentiment information is available.
      </p>
    </div>
  );
}

const chartCard = {
  padding: "25px",
  borderRadius: "18px",
  background: "#FFFFFF",
  border: "1px solid #E5E7EB",
  boxShadow: "0 8px 25px rgba(15,23,42,0.06)",
};

const chartHeading = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "15px",
  marginBottom: "25px",
};

const chartTitle = {
  margin: 0,
  color: "#111827",
  fontSize: "20px",
};

const chartDescription = {
  margin: "7px 0 0",
  color: "#6B7280",
  fontSize: "13px",
};

const chartIcon = {
  fontSize: "27px",
};

const emptyChart = {
  minHeight: "310px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "13px",
  background: "#F9FAFB",
  color: "#6B7280",
  textAlign: "center",
};
