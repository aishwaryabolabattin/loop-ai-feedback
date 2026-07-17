"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AnalyticsPage() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F3F4F6",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          marginLeft: "300px",
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Header />

        <main
          style={{
            flex: 1,
            padding: "35px",
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              marginBottom: "10px",
            }}
          >
            📊 Analytics Dashboard
          </h1>

          <p
            style={{
              color: "#6B7280",
              marginBottom: "30px",
            }}
          >
            Analyze customer feedback performance and business insights.
          </p>

          {/* Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: "20px",
            }}
          >
            <Card title="Total Feedback" value="3" color="#4F46E5" icon="💬" />

            <Card title="Positive" value="2" color="#10B981" icon="😊" />

            <Card title="Negative" value="1" color="#EF4444" icon="😞" />

            <Card
              title="Average Rating"
              value="4.7"
              color="#F59E0B"
              icon="⭐"
            />
          </div>

          {/* Analytics */}
          <div
            style={{
              marginTop: "35px",
              background: "#fff",
              padding: "30px",
              borderRadius: "18px",
              boxShadow: "0 10px 25px rgba(0,0,0,.08)",
            }}
          >
            <h2>📈 Analytics Overview</h2>

            <p style={{ color: "#6B7280" }}>Here you can display:</p>

            <ul
              style={{
                color: "#374151",
                lineHeight: "35px",
              }}
            >
              <li>Sentiment Distribution Chart</li>
              <li>Feedback by Channel</li>
              <li>Theme Analysis</li>
              <li>Monthly Feedback Trend</li>
              <li>Customer Satisfaction Score</li>
            </ul>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

function Card({ title, value, color, icon }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "18px",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3>{title}</h3>

          <h1
            style={{
              color,
              fontSize: "40px",
            }}
          >
            {value}
          </h1>
        </div>

        <div
          style={{
            fontSize: "40px",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
