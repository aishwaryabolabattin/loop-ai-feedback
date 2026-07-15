"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import FeedbackVolumeChart from "@/components/dashboard/FeedbackVolumeChart";
import SentimentPieChart from "@/components/dashboard/SentimentPieChart";
import TopThemesChart from "@/components/dashboard/TopThemesChart";
import DashboardStats from "@/components/dashboard/DashboardStats";

export default function DashboardPage() {
  // Real dashboard statistics

  const [stats, setStats] = useState({
    totalFeedback: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
    pending: 0,
    resolved: 0,
    averageConfidence: 0,
    topTheme: "No themes",
    topThemeCount: 0,
  });

  // Real chart information

  const [volumeData, setVolumeData] = useState([]);

  const [sentimentData, setSentimentData] = useState([]);

  const [themeData, setThemeData] = useState([]);

  // Real recent feedback

  const [recentFeedback, setRecentFeedback] = useState([]);

  // Loading and error states

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Load dashboard information

  const loadDashboard = async () => {
    try {
      setLoading(true);

      setError("");

      const response = await fetch("/api/dashboard", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(
          data.error || "Dashboard information could not be loaded.",
        );
      }

      // Store real API information

      setStats(
        data.stats || {
          totalFeedback: 0,
          positive: 0,
          negative: 0,
          neutral: 0,
          pending: 0,
          resolved: 0,
          averageConfidence: 0,
          topTheme: "No themes",
          topThemeCount: 0,
        },
      );

      setVolumeData(data.volumeData || []);

      setSentimentData(data.sentimentData || []);

      setThemeData(data.themeData || []);

      setRecentFeedback(data.recentFeedback || []);
    } catch (error) {
      console.error("Dashboard loading error:", error);

      setError(error.message || "Dashboard information could not be loaded.");
    } finally {
      setLoading(false);
    }
  };

  // Load dashboard when page opens

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F8FAFC",
      }}
    >
      {/* Sidebar */}

      <Sidebar />

      {/* Right-side dashboard content */}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Header />

        <main
          style={{
            flex: 1,
            padding: "30px",
          }}
        >
          {/* Dashboard heading */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              marginBottom: "30px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                Dashboard
              </h1>

              <p
                style={{
                  margin: "8px 0 0",
                  color: "#6B7280",
                }}
              >
                Real-time AI customer feedback insights
              </p>
            </div>

            {/* Refresh button */}

            <button
              type="button"
              onClick={loadDashboard}
              disabled={loading}
              style={{
                padding: "12px 18px",
                border: "none",
                borderRadius: "10px",
                background: "#4F46E5",
                color: "#FFFFFF",
                fontWeight: "700",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "⏳ Loading..." : "🔄 Refresh Dashboard"}
            </button>
          </div>

          {/* API error */}

          {error && (
            <div
              style={{
                padding: "16px",
                marginBottom: "22px",
                borderRadius: "12px",
                background: "#FEF2F2",
                border: "1px solid #FECACA",
                color: "#B91C1C",
                fontWeight: "700",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Real statistics cards */}

          <DashboardStats stats={stats} />

          {/* Real dashboard charts */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
              gap: "25px",
              marginBottom: "35px",
            }}
          >
            <FeedbackVolumeChart data={volumeData} />

            <SentimentPieChart data={sentimentData} />

            <TopThemesChart data={themeData} />
          </div>

          {/* Real recent feedback */}

          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "18px",
              padding: "25px",
              boxShadow: "0 10px 30px rgba(0,0,0,.08)",
              overflowX: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "15px",
                marginBottom: "22px",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    color: "#111827",
                  }}
                >
                  Recent Feedback
                </h2>

                <p
                  style={{
                    margin: "7px 0 0",
                    color: "#6B7280",
                    fontSize: "14px",
                  }}
                >
                  Latest AI-classified customer feedback
                </p>
              </div>

              <span
                style={{
                  padding: "8px 12px",
                  borderRadius: "999px",
                  background: "#EEF2FF",
                  color: "#4F46E5",
                  fontWeight: "700",
                  fontSize: "13px",
                }}
              >
                {recentFeedback.length} records
              </span>
            </div>

            {/* Loading message */}

            {loading ? (
              <div
                style={{
                  padding: "35px",
                  textAlign: "center",
                  color: "#6B7280",
                }}
              >
                ⏳ Loading recent feedback...
              </div>
            ) : recentFeedback.length === 0 ? (
              /* Empty database message */

              <div
                style={{
                  padding: "35px",
                  textAlign: "center",
                  borderRadius: "12px",
                  background: "#F9FAFB",
                  color: "#6B7280",
                }}
              >
                No feedback records are available.
              </div>
            ) : (
              /* Real feedback table */

              <table
                style={{
                  width: "100%",
                  minWidth: "850px",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "#F9FAFB",
                    }}
                  >
                    <th style={tableHeading}>Message</th>

                    <th style={tableHeading}>AI Theme</th>

                    <th style={tableHeading}>Sentiment</th>

                    <th style={tableHeading}>Status</th>

                    <th style={tableHeading}>Channel</th>

                    <th style={tableHeading}>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {recentFeedback.map((feedback) => (
                    <tr
                      key={feedback.id}
                      style={{
                        borderBottom: "1px solid #E5E7EB",
                      }}
                    >
                      <td style={tableCell}>
                        <div
                          style={{
                            maxWidth: "310px",
                          }}
                        >
                          <strong
                            style={{
                              display: "block",
                              color: "#111827",
                              marginBottom: "5px",
                            }}
                          >
                            {feedback.summary || feedback.message}
                          </strong>

                          {feedback.summary &&
                            feedback.summary !== feedback.message && (
                              <span
                                style={{
                                  color: "#6B7280",
                                  fontSize: "13px",
                                }}
                              >
                                {shortenText(feedback.message, 85)}
                              </span>
                            )}
                        </div>
                      </td>

                      <td style={tableCell}>
                        <span
                          style={{
                            padding: "7px 10px",
                            borderRadius: "8px",
                            background: "#EEF2FF",
                            color: "#4F46E5",
                            fontWeight: "700",
                            fontSize: "13px",
                          }}
                        >
                          🏷️ {feedback.theme || "General"}
                        </span>
                      </td>

                      <td style={tableCell}>
                        <span style={getSentimentStyle(feedback.sentiment)}>
                          {getSentimentIcon(feedback.sentiment)}{" "}
                          {formatText(feedback.sentiment)}
                        </span>
                      </td>

                      <td style={tableCell}>
                        <span style={getStatusStyle(feedback.status)}>
                          {formatText(feedback.status)}
                        </span>
                      </td>

                      <td style={tableCell}>{feedback.channel || "Unknown"}</td>

                      <td style={tableCell}>
                        {formatDate(feedback.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

// Shorten long feedback messages

function shortenText(text, maximumLength) {
  if (!text) {
    return "";
  }

  if (text.length <= maximumLength) {
    return text;
  }

  return `${text.slice(0, maximumLength)}...`;
}

// Convert IN_PROGRESS into In Progress

function formatText(value) {
  if (!value) {
    return "Unknown";
  }

  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

// Format feedback date

function formatDate(date) {
  if (!date) {
    return "Not available";
  }

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Sentiment icon

function getSentimentIcon(sentiment) {
  const value = sentiment?.toUpperCase();

  if (value === "POSITIVE") {
    return "😊";
  }

  if (value === "NEGATIVE") {
    return "😞";
  }

  return "😐";
}

// Sentiment colour

function getSentimentStyle(sentiment) {
  const value = sentiment?.toUpperCase();

  const baseStyle = {
    display: "inline-block",
    padding: "7px 11px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "13px",
  };

  if (value === "POSITIVE") {
    return {
      ...baseStyle,
      background: "#DCFCE7",
      color: "#166534",
    };
  }

  if (value === "NEGATIVE") {
    return {
      ...baseStyle,
      background: "#FEE2E2",
      color: "#B91C1C",
    };
  }

  return {
    ...baseStyle,
    background: "#FEF3C7",
    color: "#92400E",
  };
}

// Feedback status colour

function getStatusStyle(status) {
  const value = status?.toUpperCase();

  const baseStyle = {
    display: "inline-block",
    padding: "7px 11px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "13px",
  };

  if (value === "RESOLVED") {
    return {
      ...baseStyle,
      background: "#DCFCE7",
      color: "#166534",
    };
  }

  if (value === "IN_PROGRESS" || value === "IN PROGRESS") {
    return {
      ...baseStyle,
      background: "#DBEAFE",
      color: "#1D4ED8",
    };
  }

  return {
    ...baseStyle,
    background: "#FEF3C7",
    color: "#92400E",
  };
}

// Table styles

const tableHeading = {
  padding: "15px",
  textAlign: "left",
  color: "#374151",
  fontSize: "13px",
  whiteSpace: "nowrap",
};

const tableCell = {
  padding: "17px 15px",
  color: "#4B5563",
  verticalAlign: "top",
  fontSize: "14px",
};
