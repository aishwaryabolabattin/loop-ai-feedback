"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TrendChart({ data = [] }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        padding: "25px",
        borderRadius: "18px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.07)",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          color: "#111827",
        }}
      >
        📈 Feedback Volume Over Time
      </h2>

      <p
        style={{
          color: "#6B7280",
          marginBottom: "25px",
        }}
      >
        Number of feedback records received each day
      </p>

      {data.length === 0 ? (
        <div
          style={{
            padding: "70px",
            textAlign: "center",
            color: "#9CA3AF",
          }}
        >
          📭 No trend data is available.
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "350px",
          }}
        >
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

              <YAxis allowDecimals={false} />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="count"
                stroke="#4F46E5"
                strokeWidth={3}
                activeDot={{
                  r: 7,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
