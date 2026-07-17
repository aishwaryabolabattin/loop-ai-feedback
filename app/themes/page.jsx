"use client";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import ThemeCard from "@/components/ThemeCard";

export default function ThemesPage() {
  // Store all themes
  const [themes, setThemes] = useState([]);

  // Store total feedback count
  const [totalFeedback, setTotalFeedback] = useState(0);

  // Store selected theme name
  const [selectedTheme, setSelectedTheme] = useState("");

  // Store feedback belonging to selected theme
  const [themeFeedback, setThemeFeedback] = useState([]);

  // Loading state for theme cards
  const [loading, setLoading] = useState(true);

  // Loading state for selected theme feedback
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  // Search selected theme feedback
  const [feedbackSearch, setFeedbackSearch] = useState("");

  // Filter selected theme feedback by sentiment
  const [sentimentFilter, setSentimentFilter] = useState("");

  // Filter selected theme feedback by status
  const [statusFilter, setStatusFilter] = useState("");

  // Error message
  const [error, setError] = useState("");

  // ==================================
  // Load all themes
  // ==================================

  const loadThemes = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/themes");

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to load themes.");
      }

      setThemes(Array.isArray(result.themes) ? result.themes : []);

      setTotalFeedback(result.totalFeedback || 0);
    } catch (error) {
      console.error(error);

      setError(error.message);

      setThemes([]);
    } finally {
      setLoading(false);
    }
  };

  // ==================================
  // Load feedback for selected theme
  // ==================================

  const loadThemeFeedback = async (themeName) => {
    try {
      setSelectedTheme(themeName);

      setFeedbackSearch("");

      setSentimentFilter("");

      setStatusFilter("");

      setFeedbackLoading(true);

      setError("");

      const response = await fetch(
        `/api/themes/${encodeURIComponent(themeName)}`,
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Failed to load feedback for this theme.",
        );
      }

      setThemeFeedback(Array.isArray(result.feedback) ? result.feedback : []);
    } catch (error) {
      console.error(error);

      setError(error.message);

      setThemeFeedback([]);
    } finally {
      setFeedbackLoading(false);
    }
  };

  // Load themes when page opens
  useEffect(() => {
    loadThemes();
  }, []);

  // ==================================
  // Filter selected theme feedback
  // ==================================

  const filteredThemeFeedback = themeFeedback.filter((item) => {
    const searchText = feedbackSearch.toLowerCase();

    const matchesSearch =
      item.message?.toLowerCase().includes(searchText) ||
      item.summary?.toLowerCase().includes(searchText) ||
      item.channel?.toLowerCase().includes(searchText);

    const matchesSentiment =
      sentimentFilter === "" || item.sentiment === sentimentFilter;

    const matchesStatus = statusFilter === "" || item.status === statusFilter;

    return matchesSearch && matchesSentiment && matchesStatus;
  });

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* Dashboard Sidebar */}

      <Sidebar />

      {/* Right-side dashboard area */}

      <div
        style={{
          flex: 1,
          marginLeft: "300px",
          width: "calc(100% - 300px)",
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
          {/* Page heading */}

          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <h1
              style={{
                margin: 0,
                color: "#111827",
                fontSize: "34px",
              }}
            >
              🎯 Feedback Themes
            </h1>

            <p
              style={{
                color: "#6B7280",
                marginTop: "10px",
              }}
            >
              View grouped customer feedback and explore feedback belonging to
              each theme.
            </p>
          </div>

          {/* Total feedback */}

          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "16px",
              marginBottom: "25px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
            }}
          >
            <strong
              style={{
                color: "#4F46E5",
                fontSize: "18px",
              }}
            >
              Total Feedback: {totalFeedback}
            </strong>
          </div>

          {/* Error */}

          {error && (
            <div
              style={{
                background: "#FEE2E2",
                color: "#B91C1C",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              {error}
            </div>
          )}

          {/* Loading */}

          {loading ? (
            <p
              style={{
                color: "#6B7280",
              }}
            >
              Loading themes...
            </p>
          ) : themes.length === 0 ? (
            <div
              style={{
                background: "#ffffff",
                padding: "50px",
                borderRadius: "18px",
                textAlign: "center",
                color: "#6B7280",
              }}
            >
              📭 No themes are available.
            </div>
          ) : (
            // Theme cards

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              {themes.map((item) => (
                <ThemeCard
                  key={item.name}
                  theme={item.name}
                  count={item.count}
                  percentage={item.percentage}
                  onView={() => {
                    loadThemeFeedback(item.name);
                  }}
                />
              ))}
            </div>
          )}

          {/* Selected theme feedback */}

          {selectedTheme && (
            <div
              style={{
                marginTop: "40px",
                background: "#ffffff",
                padding: "25px",
                borderRadius: "20px",
                boxShadow: "0 12px 35px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <h2
                    style={{
                      margin: 0,
                      color: "#111827",
                    }}
                  >
                    📋 {selectedTheme} Feedback
                  </h2>

                  <p
                    style={{
                      color: "#6B7280",
                      marginBottom: 0,
                    }}
                  >
                    Feedback records belonging to the {selectedTheme} theme.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedTheme("");
                    setThemeFeedback([]);
                  }}
                  style={{
                    background: "#FEE2E2",
                    color: "#B91C1C",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  ✕ Close
                </button>
              </div>

              {/* Search and filter section */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
                  gap: "15px",
                  background: "#F8FAFC",
                  padding: "20px",
                  borderRadius: "14px",
                  marginBottom: "20px",
                }}
              >
                {/* Search feedback */}

                <input
                  type="text"
                  placeholder="🔍 Search message or summary..."
                  value={feedbackSearch}
                  onChange={(event) => {
                    setFeedbackSearch(event.target.value);
                  }}
                  style={filterInput}
                />

                {/* Sentiment filter */}

                <select
                  value={sentimentFilter}
                  onChange={(event) => {
                    setSentimentFilter(event.target.value);
                  }}
                  style={filterInput}
                >
                  <option value="">All Sentiments</option>

                  <option value="POSITIVE">😊 Positive</option>

                  <option value="NEGATIVE">😞 Negative</option>

                  <option value="NEUTRAL">😐 Neutral</option>
                </select>

                {/* Status filter */}

                <select
                  value={statusFilter}
                  onChange={(event) => {
                    setStatusFilter(event.target.value);
                  }}
                  style={filterInput}
                >
                  <option value="">All Statuses</option>

                  <option value="NEW">New</option>

                  <option value="REVIEW">Review</option>

                  <option value="ACTIONED">Actioned</option>

                  <option value="CLOSED">Closed</option>
                </select>

                {/* Reset filters */}

                <button
                  type="button"
                  onClick={() => {
                    setFeedbackSearch("");
                    setSentimentFilter("");
                    setStatusFilter("");
                  }}
                  style={resetButton}
                >
                  ↻ Reset Filters
                </button>
              </div>

              {/* Filtered feedback count */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: "#6B7280",
                  }}
                >
                  Showing{" "}
                  <strong
                    style={{
                      color: "#4F46E5",
                    }}
                  >
                    {filteredThemeFeedback.length}
                  </strong>{" "}
                  of <strong>{themeFeedback.length}</strong> feedback records
                </p>
              </div>

              {/* Selected feedback loading */}

              {feedbackLoading ? (
                <p
                  style={{
                    color: "#6B7280",
                  }}
                >
                  Loading feedback...
                </p>
              ) : filteredThemeFeedback.length === 0 ? (
                <div
                  style={{
                    background: "#F9FAFB",
                    padding: "35px",
                    borderRadius: "12px",
                    textAlign: "center",
                    color: "#6B7280",
                  }}
                >
                  <div
                    style={{
                      fontSize: "35px",
                      marginBottom: "10px",
                    }}
                  >
                    📭
                  </div>

                  <strong>No matching feedback found</strong>

                  <p
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    Change the filters or click Reset Filters.
                  </p>
                </div>
              ) : (
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
                          background: "#F8FAFC",
                        }}
                      >
                        <th style={tableHeading}>Message</th>

                        <th style={tableHeading}>Sentiment</th>

                        <th style={tableHeading}>Status</th>

                        <th style={tableHeading}>Channel</th>

                        <th style={tableHeading}>Summary</th>

                        <th style={tableHeading}>Confidence</th>

                        <th style={tableHeading}>Date</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredThemeFeedback.map((item) => (
                        <tr
                          key={item.id}
                          style={{
                            borderBottom: "1px solid #E5E7EB",
                          }}
                        >
                          <td style={tableData}>{item.message}</td>

                          <td style={tableData}>
                            <span style={getSentimentStyle(item.sentiment)}>
                              {item.sentiment === "POSITIVE"
                                ? "😊 Positive"
                                : item.sentiment === "NEGATIVE"
                                  ? "😞 Negative"
                                  : "😐 Neutral"}
                            </span>
                          </td>

                          <td style={tableData}>
                            <span style={getStatusStyle(item.status)}>
                              {item.status}
                            </span>
                          </td>

                          <td style={tableData}>{item.channel}</td>

                          <td style={tableData}>{item.summary || "-"}</td>

                          <td style={tableData}>
                            {item.confidence !== null &&
                            item.confidence !== undefined
                              ? `${Math.round(item.confidence * 100)}%`
                              : "-"}
                          </td>

                          <td style={tableData}>
                            {new Date(item.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
// Table heading style

const tableHeading = {
  padding: "15px",
  textAlign: "left",
  color: "#374151",
  borderBottom: "2px solid #E5E7EB",
  whiteSpace: "nowrap",
};

// Table data style

const tableData = {
  padding: "15px",
  color: "#374151",
  verticalAlign: "top",
};

// Filter input style

const filterInput = {
  width: "100%",
  padding: "13px",
  border: "1px solid #D1D5DB",
  borderRadius: "10px",
  background: "#FFFFFF",
  color: "#374151",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};

// Reset filter button style

const resetButton = {
  padding: "13px 18px",
  border: "none",
  borderRadius: "10px",
  background: "#4F46E5",
  color: "#FFFFFF",
  fontWeight: "700",
  cursor: "pointer",
};

// Sentiment badge style

const getSentimentStyle = (sentiment) => {
  const commonStyle = {
    display: "inline-block",
    padding: "7px 12px",
    borderRadius: "20px",
    fontWeight: "700",
    fontSize: "12px",
    whiteSpace: "nowrap",
  };

  if (sentiment === "POSITIVE") {
    return {
      ...commonStyle,
      background: "#DCFCE7",
      color: "#15803D",
    };
  }

  if (sentiment === "NEGATIVE") {
    return {
      ...commonStyle,
      background: "#FEE2E2",
      color: "#B91C1C",
    };
  }

  return {
    ...commonStyle,
    background: "#FEF3C7",
    color: "#B45309",
  };
};

// Status badge style

const getStatusStyle = (status) => {
  const commonStyle = {
    display: "inline-block",
    padding: "7px 12px",
    borderRadius: "20px",
    fontWeight: "700",
    fontSize: "12px",
    whiteSpace: "nowrap",
  };

  if (status === "NEW") {
    return {
      ...commonStyle,
      background: "#DBEAFE",
      color: "#1D4ED8",
    };
  }

  if (status === "REVIEW") {
    return {
      ...commonStyle,
      background: "#FEF3C7",
      color: "#B45309",
    };
  }

  if (status === "ACTIONED") {
    return {
      ...commonStyle,
      background: "#E0E7FF",
      color: "#4338CA",
    };
  }

  if (status === "CLOSED") {
    return {
      ...commonStyle,
      background: "#DCFCE7",
      color: "#15803D",
    };
  }

  return {
    ...commonStyle,
    background: "#F3F4F6",
    color: "#4B5563",
  };
};
