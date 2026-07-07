"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function TopThemesChart({ data }) {
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
        📊 Top Feedback Themes
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="theme" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="count" fill="#4F46E5" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
