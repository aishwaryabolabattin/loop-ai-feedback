"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function FeedbackVolumeChart({ data }) {
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
        📈 Feedback Volume
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="total"
            stroke="#4F46E5"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
