"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrendChart from "@/components/TrendChart";

export default function TrendsPage() {
  // ==============================
  // States
  // ==============================

  const [trendData, setTrendData] = useState([]);

  const [themeData, setThemeData] = useState([]);

  const [allThemes, setAllThemes] = useState([]);

  const [summary, setSummary] = useState({
    currentCount: 0,
    previousCount: 0,
    percentageChange: 0,
    isSpike: false,
  });

  const [days, setDays] = useState(7);

  const [selectedTheme, setSelectedTheme] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==============================
  // Load Trends
  // ==============================

  const loadTrends = async () => {
    try {
      setLoading(true);

      setError("");

      const response = await fetch(
        `/api/trends?days=${days}&theme=${encodeURIComponent(selectedTheme)}`,
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to load trend information.");
      }

      setTrendData(result.trendData || []);

      setThemeData(result.themeData || []);

      setAllThemes(result.allThemes || []);

      setSummary(
        result.summary || {
          currentCount: 0,
          previousCount: 0,
          percentageChange: 0,
          isSpike: false,
        },
      );
    } catch (error) {
      console.error("Failed to load trends:", error);

      setError(error.message);

      setTrendData([]);

      setThemeData([]);

      setSummary({
        currentCount: 0,
        previousCount: 0,
        percentageChange: 0,
        isSpike: false,
      });
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Load when filters change
  // ==============================

  useEffect(() => {
    loadTrends();
  }, [days, selectedTheme]);

  // ==============================
  // Percentage information
  // ==============================

  const isIncrease = summary.percentageChange > 0;

  const isDecrease = summary.percentageChange < 0;

  // ==============================
  // Page
  // ==============================

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
          {/* ============================== */}
          {/* Page heading */}
          {/* ============================== */}

          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <h1
              style={{
                margin: 0,
                color: "#111827",
                fontSize: "36px",
              }}
            >
              📈 Feedback Trends
            </h1>

            <p
              style={{
                color: "#6B7280",
                fontSize: "16px",
                marginTop: "10px",
              }}
            >
              Track theme volume over time and identify unusual feedback spikes.
            </p>
          </div>

          {/* ============================== */}
          {/* Filters */}
          {/* ============================== */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              padding: "22px",
              marginBottom: "25px",
              background: "#FFFFFF",
              borderRadius: "18px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            }}
          >
            {/* Period filter */}

            <div>
              <label style={filterLabel}>Select Period</label>

              <select
                value={days}
                onChange={(event) => setDays(Number(event.target.value))}
                style={filterInput}
              >
                <option value={7}>Last 7 Days</option>

                <option value={14}>Last 14 Days</option>

                <option value={30}>Last 30 Days</option>

                <option value={90}>Last 90 Days</option>
              </select>
            </div>

            {/* Theme filter */}

            <div>
              <label style={filterLabel}>Select Theme</label>

              <select
                value={selectedTheme}
                onChange={(event) => setSelectedTheme(event.target.value)}
                style={filterInput}
              >
                <option value="">All Themes</option>

                {allThemes.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset button */}

            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <button
                onClick={() => {
                  setDays(7);

                  setSelectedTheme("");
                }}
                style={resetButton}
              >
                ↻ Reset Filters
              </button>
            </div>
          </div>

          {/* ============================== */}
          {/* Error */}
          {/* ============================== */}

          {error && (
            <div
              style={{
                padding: "18px",
                marginBottom: "25px",
                borderRadius: "12px",
                background: "#FEE2E2",
                color: "#B91C1C",
                fontWeight: "600",
              }}
            >
              ❌ {error}
            </div>
          )}

          {/* ============================== */}
          {/* Loading */}
          {/* ============================== */}

          {loading ? (
            <div
              style={{
                padding: "80px",
                background: "#FFFFFF",
                borderRadius: "18px",
                textAlign: "center",
                color: "#6B7280",
              }}
            >
              ⏳ Loading feedback trends...
            </div>
          ) : (
            <>
              {/* ============================== */}
              {/* Statistics */}
              {/* ============================== */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "20px",
                  marginBottom: "25px",
                }}
              >
                {/* Current period */}

                <div style={statCard}>
                  <div style={statIcon}>📊</div>

                  <p style={statLabel}>Current Period</p>

                  <h2 style={statValue}>{summary.currentCount}</h2>

                  <small style={statDescription}>
                    Feedback in the last {days} days
                  </small>
                </div>

                {/* Previous period */}

                <div style={statCard}>
                  <div style={statIcon}>🕒</div>

                  <p style={statLabel}>Previous Period</p>

                  <h2 style={statValue}>{summary.previousCount}</h2>

                  <small style={statDescription}>
                    Feedback in the previous {days} days
                  </small>
                </div>

                {/* Percentage change */}

                <div style={statCard}>
                  <div style={statIcon}>
                    {isIncrease ? "📈" : isDecrease ? "📉" : "➖"}
                  </div>

                  <p style={statLabel}>Volume Change</p>

                  <h2
                    style={{
                      ...statValue,

                      color: isIncrease
                        ? "#DC2626"
                        : isDecrease
                          ? "#16A34A"
                          : "#4F46E5",
                    }}
                  >
                    {summary.percentageChange > 0 ? "+" : ""}
                    {summary.percentageChange}%
                  </h2>

                  <small style={statDescription}>
                    Compared with the previous period
                  </small>
                </div>

                {/* Spike status */}

                <div style={statCard}>
                  <div style={statIcon}>{summary.isSpike ? "🚨" : "✅"}</div>

                  <p style={statLabel}>Spike Detection</p>

                  <h2
                    style={{
                      ...statValue,

                      color: summary.isSpike ? "#DC2626" : "#16A34A",
                    }}
                  >
                    {summary.isSpike ? "Spike Found" : "Normal"}
                  </h2>

                  <small style={statDescription}>
                    Automatic volume monitoring
                  </small>
                </div>
              </div>

              {/* ============================== */}
              {/* Spike alert */}
              {/* ============================== */}

              {summary.isSpike && (
                <div
                  style={{
                    padding: "20px",
                    marginBottom: "25px",
                    borderRadius: "15px",
                    background: "#FEF2F2",
                    border: "1px solid #FECACA",
                    color: "#B91C1C",
                  }}
                >
                  <h3
                    style={{
                      marginTop: 0,
                      marginBottom: "8px",
                    }}
                  >
                    🚨 Feedback Volume Spike Detected
                  </h3>

                  <p
                    style={{
                      margin: 0,
                    }}
                  >
                    Feedback volume increased by{" "}
                    <strong>{summary.percentageChange}%</strong> compared with
                    the previous {days}-day period.
                  </p>
                </div>
              )}

              {/* ============================== */}
              {/* Trend chart */}
              {/* ============================== */}

              <TrendChart data={trendData} />

              {/* ============================== */}
              {/* Theme volume table */}
              {/* ============================== */}

              <div
                style={{
                  marginTop: "25px",
                  padding: "25px",
                  background: "#FFFFFF",
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
                  🏷 Theme Volume
                </h2>

                <p
                  style={{
                    color: "#6B7280",
                  }}
                >
                  Feedback count for every theme in the selected period
                </p>

                <div
                  style={{
                    overflowX: "auto",
                  }}
                >
                  <table
                    style={{
                      width: "100%",
                      marginTop: "20px",
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          background: "#F8FAFC",
                        }}
                      >
                        <th style={tableHeading}>Theme</th>

                        <th style={tableHeading}>Feedback Volume</th>

                        <th style={tableHeading}>Percentage</th>
                      </tr>
                    </thead>

                    <tbody>
                      {themeData.length === 0 ? (
                        <tr>
                          <td
                            colSpan="3"
                            style={{
                              padding: "45px",
                              textAlign: "center",
                              color: "#9CA3AF",
                            }}
                          >
                            📭 No theme information is available.
                          </td>
                        </tr>
                      ) : (
                        themeData.map((item) => {
                          const percentage =
                            summary.currentCount > 0
                              ? (
                                  (item.count / summary.currentCount) *
                                  100
                                ).toFixed(1)
                              : 0;

                          return (
                            <tr
                              key={item.theme}
                              style={{
                                borderBottom: "1px solid #E5E7EB",
                              }}
                            >
                              <td style={tableData}>
                                <strong>🏷 {item.theme}</strong>
                              </td>

                              <td style={tableData}>{item.count}</td>

                              <td style={tableData}>{percentage}%</td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

// ==============================
// Styles
// ==============================

const filterLabel = {
  display: "block",
  marginBottom: "8px",
  color: "#374151",
  fontWeight: "700",
};

const filterInput = {
  width: "100%",
  padding: "13px",
  border: "1px solid #D1D5DB",
  borderRadius: "10px",
  background: "#FFFFFF",
  color: "#374151",
  fontSize: "14px",
  outline: "none",
};

const resetButton = {
  width: "100%",
  padding: "13px 18px",
  border: "none",
  borderRadius: "10px",
  background: "#4F46E5",
  color: "#FFFFFF",
  fontWeight: "700",
  cursor: "pointer",
};

const statCard = {
  padding: "24px",
  background: "#FFFFFF",
  borderRadius: "18px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
};

const statIcon = {
  fontSize: "30px",
  marginBottom: "12px",
};

const statLabel = {
  margin: 0,
  color: "#6B7280",
  fontWeight: "600",
};

const statValue = {
  marginTop: "10px",
  marginBottom: "8px",
  color: "#4F46E5",
  fontSize: "32px",
};

const statDescription = {
  color: "#9CA3AF",
};

const tableHeading = {
  padding: "16px",
  textAlign: "left",
  color: "#374151",
  borderBottom: "2px solid #E5E7EB",
};

const tableData = {
  padding: "18px 16px",
  color: "#374151",
};
