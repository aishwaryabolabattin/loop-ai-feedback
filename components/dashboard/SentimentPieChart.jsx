"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#10B981", // Positive
  "#EF4444", // Negative
  "#F59E0B", // Neutral
];

export default function SentimentPieChart({ data }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "18px",
        padding: "25px",
        boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        height: "420px",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: "20px",
          color: "#111827",
        }}
      >
        😊 Sentiment Distribution
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
