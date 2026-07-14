"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VocReportCard from "@/components/VocReportCard";

export default function ReportsPage() {
  // Selected report period
  const [selectedDays, setSelectedDays] = useState(30);

  // Saved reports from the database
  const [reports, setReports] = useState([]);

  // Loading states
  const [loadingReports, setLoadingReports] = useState(true);

  const [generatingReport, setGeneratingReport] = useState(false);

  // Success and error messages
  const [successMessage, setSuccessMessage] = useState("");

  const [error, setError] = useState("");

  // ========================================
  // Load all saved reports
  // ========================================

  const loadReports = useCallback(async () => {
    try {
      setLoadingReports(true);
      setError("");

      const response = await fetch("/api/reports", {
        method: "GET",

        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Saved reports could not be loaded.");
      }

      setReports(Array.isArray(result.reports) ? result.reports : []);
    } catch (requestError) {
      console.error("Load reports error:", requestError);

      setError(requestError.message || "Saved reports could not be loaded.");
    } finally {
      setLoadingReports(false);
    }
  }, []);

  // Load reports when the page opens.
  useEffect(() => {
    loadReports();
  }, [loadReports]);

  // ========================================
  // Generate a new VoC report
  // ========================================

  async function handleGenerateReport() {
    try {
      setGeneratingReport(true);

      setError("");

      setSuccessMessage("");

      const response = await fetch("/api/reports/generate", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          days: selectedDays,

          title: `Voice-of-Customer Report — Last ${selectedDays} Days`,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "The report could not be generated.");
      }

      setSuccessMessage(
        "Voice-of-Customer report generated and saved successfully.",
      );

      // Reload saved reports.
      await loadReports();
    } catch (requestError) {
      console.error("Generate report error:", requestError);

      setError(requestError.message || "The report could not be generated.");
    } finally {
      setGeneratingReport(false);
    }
  }

  return (
    <div style={pageLayout}>
      {/* Dashboard Sidebar */}

      <Sidebar />

      {/* Right-side content */}

      <div style={rightContent}>
        <Header />

        <main style={mainContent}>
          {/* Page heading */}

          <div style={pageHeading}>
            <div>
              <h1 style={heading}>📄 Voice-of-Customer Reports</h1>

              <p style={headingDescription}>
                Generate AI-powered customer-feedback reports using pre-computed
                statistics, insights, and recommendations.
              </p>
            </div>
          </div>

          {/* Generate Report Card */}

          <section style={generateCard}>
            <div style={generateHeading}>
              <div style={reportIcon}>📊</div>

              <div>
                <h2 style={sectionHeading}>Generate New Report</h2>

                <p style={sectionDescription}>
                  Select a reporting period to analyze customer feedback and
                  generate a Voice-of-Customer report.
                </p>
              </div>
            </div>

            {/* Period selection */}

            <div style={periodGrid}>
              {reportPeriods.map((reportPeriod) => {
                const isSelected = selectedDays === reportPeriod.days;

                return (
                  <button
                    key={reportPeriod.days}
                    type="button"
                    disabled={generatingReport}
                    onClick={() => {
                      setSelectedDays(reportPeriod.days);

                      setError("");

                      setSuccessMessage("");
                    }}
                    style={{
                      ...periodButton,

                      border: isSelected
                        ? "2px solid #4F46E5"
                        : "1px solid #E5E7EB",

                      background: isSelected ? "#EEF2FF" : "#FFFFFF",

                      color: isSelected ? "#4338CA" : "#374151",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "27px",
                      }}
                    >
                      {reportPeriod.icon}
                    </span>

                    <strong
                      style={{
                        fontSize: "16px",
                      }}
                    >
                      {reportPeriod.label}
                    </strong>

                    <span
                      style={{
                        color: "#6B7280",
                        fontSize: "13px",
                      }}
                    >
                      {reportPeriod.description}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected-period information */}

            <div style={selectedPeriodBox}>
              <div>
                <strong
                  style={{
                    color: "#374151",
                  }}
                >
                  Selected period:
                </strong>

                <span
                  style={{
                    marginLeft: "8px",

                    color: "#4F46E5",

                    fontWeight: "800",
                  }}
                >
                  Last {selectedDays} Days
                </span>
              </div>

              <button
                type="button"
                disabled={generatingReport}
                onClick={handleGenerateReport}
                style={{
                  ...generateButton,

                  opacity: generatingReport ? 0.65 : 1,

                  cursor: generatingReport ? "not-allowed" : "pointer",
                }}
              >
                {generatingReport
                  ? "⏳ Generating Report..."
                  : "✨ Generate Report"}
              </button>
            </div>
          </section>

          {/* Generating message */}

          {generatingReport && (
            <section style={loadingCard}>
              <div style={loadingIcon}>📊</div>

              <h3
                style={{
                  margin: 0,

                  color: "#111827",
                }}
              >
                Creating your Voice-of-Customer report...
              </h3>

              <p
                style={{
                  marginBottom: 0,

                  color: "#6B7280",

                  lineHeight: "1.7",
                }}
              >
                LOOP is calculating feedback statistics, generating the AI
                narrative, and saving the report.
              </p>
            </section>
          )}

          {/* Success message */}

          {successMessage && (
            <div style={successCard}>
              <strong>✅ Report generated</strong>

              <p
                style={{
                  marginTop: "7px",

                  marginBottom: 0,
                }}
              >
                {successMessage}
              </p>
            </div>
          )}

          {/* Error message */}

          {error && (
            <div style={errorCard}>
              <strong>⚠️ Unable to complete the request</strong>

              <p
                style={{
                  marginTop: "7px",

                  marginBottom: 0,
                }}
              >
                {error}
              </p>
            </div>
          )}

          {/* Saved reports section */}

          <section
            style={{
              marginTop: "35px",
            }}
          >
            <div style={savedReportsHeading}>
              <div>
                <h2
                  style={{
                    margin: 0,

                    color: "#111827",

                    fontSize: "24px",
                  }}
                >
                  📚 Saved Reports
                </h2>

                <p
                  style={{
                    marginTop: "7px",

                    marginBottom: 0,

                    color: "#6B7280",
                  }}
                >
                  View previously generated Voice-of-Customer reports.
                </p>
              </div>

              <div style={reportCount}>
                {reports.length} {reports.length === 1 ? "Report" : "Reports"}
              </div>
            </div>

            {/* Loading saved reports */}

            {loadingReports ? (
              <div style={emptyCard}>
                <div
                  style={{
                    fontSize: "35px",
                  }}
                >
                  ⏳
                </div>

                <h3
                  style={{
                    color: "#111827",
                  }}
                >
                  Loading saved reports...
                </h3>
              </div>
            ) : reports.length === 0 ? (
              /* Empty state */

              <div style={emptyCard}>
                <div
                  style={{
                    fontSize: "48px",
                  }}
                >
                  📄
                </div>

                <h3
                  style={{
                    marginBottom: "5px",

                    color: "#111827",
                  }}
                >
                  No reports generated yet
                </h3>

                <p
                  style={{
                    margin: 0,

                    color: "#6B7280",
                  }}
                >
                  Select a report period and click Generate Report to create
                  your first Voice-of-Customer report.
                </p>
              </div>
            ) : (
              /* Saved report cards */

              <div style={reportGrid}>
                {reports.map((report) => (
                  <article key={report.id} style={reportCard}>
                    {/* Report title */}

                    <div style={cardTop}>
                      <div style={cardReportIcon}>📄</div>

                      <span style={statusBadge}>{report.status}</span>
                    </div>

                    <h3 style={reportTitle}>{report.title}</h3>

                    <p style={reportPeriod}>📅 {formatPeriod(report.period)}</p>

                    {/* Total feedback */}

                    <div style={totalFeedbackBox}>
                      <span>Total Feedback</span>

                      <strong>{report.totalFeedback}</strong>
                    </div>

                    {/* Sentiment information */}

                    <div style={sentimentGrid}>
                      <div style={positiveBox}>
                        <span>😊 Positive</span>

                        <strong>{report.positiveCount}</strong>
                      </div>

                      <div style={neutralBox}>
                        <span>😐 Neutral</span>

                        <strong>{report.neutralCount}</strong>
                      </div>

                      <div style={negativeBox}>
                        <span>😞 Negative</span>

                        <strong>{report.negativeCount}</strong>
                      </div>
                    </div>

                    {/* Report date */}

                    <div style={cardFooter}>
                      <div>
                        <small
                          style={{
                            color: "#9CA3AF",
                          }}
                        >
                          Generated
                        </small>

                        <div
                          style={{
                            marginTop: "3px",

                            color: "#4B5563",

                            fontSize: "13px",

                            fontWeight: "600",
                          }}
                        >
                          {formatDate(report.createdAt)}
                        </div>
                      </div>

                      <Link href={`/reports/${report.id}`} style={viewButton}>
                        View Report →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

// ========================================
// Report periods
// ========================================

const reportPeriods = [
  {
    days: 7,

    label: "Last 7 Days",

    description: "Weekly customer-feedback report",

    icon: "📅",
  },

  {
    days: 30,

    label: "Last 30 Days",

    description: "Monthly customer-feedback report",

    icon: "📊",
  },

  {
    days: 90,

    label: "Last 90 Days",

    description: "Quarterly customer-feedback report",

    icon: "📈",
  },
];

// ========================================
// Helper functions
// ========================================

function formatPeriod(period) {
  if (!period) {
    return "Selected Period";
  }

  return period.replace("LAST_", "Last ").replace("_DAYS", " Days");
}

function formatDate(date) {
  if (!date) {
    return "Unknown";
  }

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",

    month: "short",

    year: "numeric",
  });
}

// ========================================
// Page styles
// ========================================

const pageLayout = {
  display: "flex",

  minHeight: "100vh",

  background: "#F3F4F6",
};

const rightContent = {
  flex: 1,

  display: "flex",

  flexDirection: "column",

  minWidth: 0,
};

const mainContent = {
  flex: 1,

  padding: "35px",

  background: "#F3F4F6",
};

const pageHeading = {
  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",

  marginBottom: "30px",
};

const heading = {
  margin: 0,

  color: "#111827",

  fontSize: "32px",
};

const headingDescription = {
  marginTop: "10px",

  marginBottom: 0,

  color: "#6B7280",

  fontSize: "16px",

  lineHeight: "1.6",
};

const generateCard = {
  padding: "30px",

  borderRadius: "20px",

  background: "#FFFFFF",

  boxShadow: "0 12px 35px rgba(0,0,0,0.07)",
};

const generateHeading = {
  display: "flex",

  alignItems: "center",

  gap: "16px",

  marginBottom: "25px",
};

const reportIcon = {
  width: "55px",

  height: "55px",

  borderRadius: "16px",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  flexShrink: 0,

  background: "#EEF2FF",

  fontSize: "26px",
};

const sectionHeading = {
  margin: 0,

  color: "#111827",

  fontSize: "22px",
};

const sectionDescription = {
  marginTop: "7px",

  marginBottom: 0,

  color: "#6B7280",

  lineHeight: "1.6",
};

const periodGrid = {
  display: "grid",

  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",

  gap: "15px",
};

const periodButton = {
  minHeight: "135px",

  padding: "20px",

  borderRadius: "15px",

  display: "flex",

  flexDirection: "column",

  alignItems: "flex-start",

  justifyContent: "center",

  gap: "9px",

  cursor: "pointer",

  textAlign: "left",

  fontFamily: "inherit",
};

const selectedPeriodBox = {
  marginTop: "25px",

  padding: "18px",

  borderRadius: "14px",

  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",

  gap: "20px",

  flexWrap: "wrap",

  background: "#F8FAFC",

  border: "1px solid #E5E7EB",
};

const generateButton = {
  padding: "14px 22px",

  border: "none",

  borderRadius: "12px",

  background: "#4F46E5",

  color: "#FFFFFF",

  fontWeight: "800",

  fontSize: "15px",
};

const loadingCard = {
  marginTop: "25px",

  padding: "35px",

  borderRadius: "18px",

  background: "#FFFFFF",

  textAlign: "center",

  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
};

const loadingIcon = {
  marginBottom: "13px",

  fontSize: "40px",
};

const successCard = {
  marginTop: "25px",

  padding: "20px",

  border: "1px solid #BBF7D0",

  borderRadius: "14px",

  background: "#F0FDF4",

  color: "#166534",
};

const errorCard = {
  marginTop: "25px",

  padding: "20px",

  border: "1px solid #FECACA",

  borderRadius: "14px",

  background: "#FEF2F2",

  color: "#B91C1C",
};

const savedReportsHeading = {
  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",

  gap: "20px",

  marginBottom: "20px",
};

const reportCount = {
  padding: "9px 14px",

  borderRadius: "20px",

  background: "#EEF2FF",

  color: "#4338CA",

  fontWeight: "800",

  fontSize: "13px",
};

const emptyCard = {
  padding: "50px",

  borderRadius: "18px",

  background: "#FFFFFF",

  textAlign: "center",

  boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
};

const reportGrid = {
  display: "grid",

  gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",

  gap: "22px",
};

const reportCard = {
  padding: "25px",

  borderRadius: "18px",

  border: "1px solid #E5E7EB",

  background: "#FFFFFF",

  boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
};

const cardTop = {
  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",

  marginBottom: "18px",
};

const cardReportIcon = {
  width: "48px",

  height: "48px",

  borderRadius: "14px",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  background: "#EEF2FF",

  fontSize: "23px",
};

const statusBadge = {
  padding: "7px 11px",

  borderRadius: "20px",

  background: "#DCFCE7",

  color: "#166534",

  fontSize: "11px",

  fontWeight: "800",
};

const reportTitle = {
  marginBottom: "8px",

  color: "#111827",

  fontSize: "19px",

  lineHeight: "1.5",
};

const reportPeriod = {
  marginTop: 0,

  marginBottom: "20px",

  color: "#6B7280",

  fontSize: "14px",
};

const totalFeedbackBox = {
  padding: "16px",

  borderRadius: "13px",

  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",

  background: "#F8FAFC",

  color: "#374151",

  marginBottom: "15px",
};

const sentimentGrid = {
  display: "grid",

  gridTemplateColumns: "repeat(3, 1fr)",

  gap: "9px",
};

const positiveBox = {
  padding: "12px 8px",

  borderRadius: "11px",

  display: "flex",

  flexDirection: "column",

  gap: "6px",

  background: "#F0FDF4",

  color: "#166534",

  textAlign: "center",

  fontSize: "12px",
};

const neutralBox = {
  padding: "12px 8px",

  borderRadius: "11px",

  display: "flex",

  flexDirection: "column",

  gap: "6px",

  background: "#FFFBEB",

  color: "#92400E",

  textAlign: "center",

  fontSize: "12px",
};

const negativeBox = {
  padding: "12px 8px",

  borderRadius: "11px",

  display: "flex",

  flexDirection: "column",

  gap: "6px",

  background: "#FEF2F2",

  color: "#B91C1C",

  textAlign: "center",

  fontSize: "12px",
};

const cardFooter = {
  marginTop: "20px",

  paddingTop: "18px",

  borderTop: "1px solid #E5E7EB",

  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",

  gap: "15px",
};

const viewButton = {
  padding: "10px 14px",

  borderRadius: "10px",

  background: "#4F46E5",

  color: "#FFFFFF",

  textDecoration: "none",

  fontWeight: "700",

  fontSize: "13px",
};
