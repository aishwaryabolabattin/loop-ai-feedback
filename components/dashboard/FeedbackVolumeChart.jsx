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

export default function FeedbackVolumeChart({ data = [] }) {
  return (
    <div style={chartCard}>
      <div style={chartHeading}>
        <div>
          <h2 style={chartTitle}>Feedback Volume</h2>

          <p style={chartDescription}>Real feedback records grouped by month</p>
        </div>

        <span style={chartIcon}>📈</span>
      </div>

      {data.length === 0 ? (
        <EmptyChart message="No feedback-volume information is available." />
      ) : (
        <div
          style={{
            width: "100%",
            height: "310px",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 15,
                right: 20,
                left: -15,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" />

              <XAxis
                dataKey="month"
                tick={{
                  fill: "#6B7280",
                  fontSize: 12,
                }}
              />

              <YAxis
                allowDecimals={false}
                tick={{
                  fill: "#6B7280",
                  fontSize: 12,
                }}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="total"
                name="Total Feedback"
                stroke="#4F46E5"
                strokeWidth={3}
                dot={{
                  r: 5,
                  fill: "#4F46E5",
                }}
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

function EmptyChart({ message }) {
  return (
    <div style={emptyChart}>
      <div
        style={{
          fontSize: "35px",
          marginBottom: "12px",
        }}
      >
        📊
      </div>

      <p
        style={{
          margin: 0,
        }}
      >
        {message}
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
