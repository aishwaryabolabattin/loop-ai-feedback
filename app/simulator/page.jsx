"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SimulatorPage() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [feedback, setFeedback] = useState([]);

  async function generateFeedback() {
    try {
      setLoading(true);

      const response = await fetch("/api/simulator", {
        method: "POST",
      });

      const data = await response.json();

      if (data.success) {
        setSummary(data);
        setFeedback(data.feedback);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const positive = feedback.filter(
    (item) => item.sentiment === "POSITIVE",
  ).length;

  const negative = feedback.filter(
    (item) => item.sentiment === "NEGATIVE",
  ).length;

  const neutral = feedback.filter(
    (item) => item.sentiment === "NEUTRAL",
  ).length;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />

        <main
          style={{
            flex: 1,
            background: "#F3F4F6",
            padding: "35px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "35px",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "36px",
                  color: "#111827",
                }}
              >
                🚀 Feedback Simulator
              </h1>

              <p
                style={{
                  color: "#6B7280",
                  marginTop: "10px",
                }}
              >
                Simulate customer feedback from multiple channels.
              </p>
            </div>

            <button
              onClick={generateFeedback}
              disabled={loading}
              style={{
                padding: "16px 30px",
                border: "none",
                borderRadius: "14px",
                background: "#4F46E5",
                color: "#fff",
                fontWeight: "700",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              {loading ? "Generating..." : "🚀 Generate Feedback"}
            </button>
          </div>
          {/* Summary Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
              marginBottom: "35px",
            }}
          >
            <Card
              title="Generated"
              value={summary?.total || 0}
              color="#4F46E5"
              icon="📊"
            />

            <Card title="Positive" value={positive} color="#10B981" icon="😊" />

            <Card title="Negative" value={negative} color="#EF4444" icon="😞" />

            <Card title="Neutral" value={neutral} color="#F59E0B" icon="😐" />
          </div>
          {/* Success Message */}
          {summary && (
            <div
              style={{
                background: "#DCFCE7",
                color: "#166534",
                padding: "18px",
                borderRadius: "12px",
                marginBottom: "30px",
                fontWeight: "700",
              }}
            >
              ✅ {summary.message}
            </div>
          )}
          {/* Part 1 Ends Here */}
          {/* Generated Feedback Table */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: "18px",
              padding: "25px",
              boxShadow: "0 12px 30px rgba(0,0,0,.08)",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: "20px",
                color: "#111827",
              }}
            >
              📋 Recently Generated Feedback
            </h2>

            <div
              style={{
                overflowX: "auto",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "#EEF2FF",
                    }}
                  >
                    <th style={th}>Message</th>
                    <th style={th}>Theme</th>
                    <th style={th}>Channel</th>
                    <th style={th}>Sentiment</th>
                    <th style={th}>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {feedback.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        style={{
                          textAlign: "center",
                          padding: "40px",
                          color: "#6B7280",
                        }}
                      >
                        Click "Generate Feedback" to simulate data.
                      </td>
                    </tr>
                  ) : (
                    feedback.map((item) => (
                      <tr
                        key={item.id}
                        style={{
                          borderBottom: "1px solid #E5E7EB",
                        }}
                      >
                        <td style={td}>{item.message}</td>

                        <td style={td}>{item.theme}</td>

                        <td style={td}>{item.channel}</td>

                        <td style={td}>
                          {item.sentiment === "POSITIVE" && "😊 Positive"}
                          {item.sentiment === "NEGATIVE" && "😞 Negative"}
                          {item.sentiment === "NEUTRAL" && "😐 Neutral"}
                        </td>

                        <td style={td}>{item.status}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>{" "}
          {/* closes white card */}
        </main>

        <Footer />
      </div>
    </div>
  );
}
/* ========================= */
/* Card Component */
/* ========================= */

function Card({ title, value, color, icon }) {
  return (
    <div
      style={{
        background: "#ffffff",
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
          <div
            style={{
              color: "#6B7280",
              fontWeight: "600",
            }}
          >
            {title}
          </div>

          <h1
            style={{
              color,
              marginTop: "12px",
              fontSize: "38px",
            }}
          >
            {value}
          </h1>
        </div>

        <div
          style={{
            width: "65px",
            height: "65px",
            background: color,
            color: "#fff",
            borderRadius: "18px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "30px",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

/* ========================= */
/* Table Styles */
/* ========================= */

const th = {
  padding: "15px",
  textAlign: "left",
  color: "#111827",
  fontWeight: "700",
};

const td = {
  padding: "15px",
  color: "#374151",
};
