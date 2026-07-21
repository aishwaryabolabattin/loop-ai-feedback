"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExportReportButton from "@/components/ExportReportButton";

export default function ReportDetailsPage() {
  const params = useParams();

  const reportId = params?.id;

  const [report, setReport] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReport() {
      try {
        setLoading(true);

        setError("");

        const response = await fetch(`/api/reports/${reportId}`, {
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.error || "The Voice-of-Customer report could not be loaded.",
          );
        }

        setReport(result.report);
      } catch (error) {
        console.error("Report loading error:", error);

        setError(error.message || "The report could not be loaded.");
      } finally {
        setLoading(false);
      }
    }

    if (reportId) {
      loadReport();
    }
  }, [reportId]);

  // Loading page

  if (loading) {
    return (
      <DashboardLayout>
        <div style={stateCard}>
          <div style={stateIcon}>⏳</div>

          <h2 style={stateTitle}>Loading VoC Report...</h2>

          <p style={stateText}>Loading the saved customer feedback report.</p>
        </div>
      </DashboardLayout>
    );
  }

  // Error page

  if (error || !report) {
    return (
      <DashboardLayout>
        <div style={errorCard}>
          <div style={stateIcon}>⚠️</div>

          <h2 style={errorTitle}>Report Could Not Be Loaded</h2>

          <p style={errorText}>
            {error || "Voice-of-Customer report was not found."}
          </p>

          <Link href="/reports" style={backButton}>
            ← Back to Reports
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  // Report data

  const statistics = report.statistics || {};

  const sentiment = statistics.sentiment || {};

  const topThemes = statistics.topThemes || [];

  const channels = statistics.channels || [];

  const statuses = statistics.statuses || [];

  const insights = convertToArray(report.keyInsights);

  const recommendations = convertToArray(report.recommendations);

  return (
    <DashboardLayout>
      {/* Top buttons */}

      <div style={topSection}>
        <Link href="/reports" style={topBackButton}>
          ← Back to Reports
        </Link>

        <div style={reportActions}>
          <ExportReportButton
            reportId="voc-report-content"
            reportTitle={report.title}
          />

          <button
            type="button"
            onClick={() => window.print()}
            style={printButton}
          >
            🖨️ Print Report
          </button>
        </div>
      </div>

      {/* Everything inside this
          container is exported */}

      <div id="voc-report-content" style={reportContainer}>
        {/* Report heading */}

        <section style={heroCard}>
          <div style={heroTop}>
            <div>
              <p style={reportLabel}>VOICE OF CUSTOMER</p>

              <h1 style={pageTitle}>
                {report.title || "Voice-of-Customer Report"}
              </h1>

              <p style={pageDescription}>
                AI-powered customer feedback analysis, insights, themes, and
                recommended actions.
              </p>
            </div>

            <span style={statusBadge}>✓ {report.status || "COMPLETED"}</span>
          </div>

          <div style={reportInformation}>
            <InformationBox
              icon="📅"
              label="Report Period"
              value={report.periodLabel || report.period || "All Time"}
            />

            <InformationBox
              icon="🕒"
              label="Generated"
              value={formatDate(report.createdAt)}
            />

            <InformationBox
              icon="💬"
              label="Feedback Analysed"
              value={report.totalFeedback ?? statistics.totalFeedback ?? 0}
            />
          </div>
        </section>

        {/* Main statistics */}

        <section style={statisticsGrid}>
          <StatisticCard
            icon="💬"
            label="Total Feedback"
            value={report.totalFeedback ?? statistics.totalFeedback ?? 0}
            description="Customer feedback records analysed"
          />

          <StatisticCard
            icon="😊"
            label="Positive"
            value={
              report.positiveCount ??
              sentiment.positive ??
              sentiment.POSITIVE ??
              0
            }
            description="Positive customer feedback"
          />

          <StatisticCard
            icon="😐"
            label="Neutral"
            value={
              report.neutralCount ?? sentiment.neutral ?? sentiment.NEUTRAL ?? 0
            }
            description="Neutral customer feedback"
          />

          <StatisticCard
            icon="😞"
            label="Negative"
            value={
              report.negativeCount ??
              sentiment.negative ??
              sentiment.NEGATIVE ??
              0
            }
            description="Negative customer feedback"
          />
        </section>

        {/* Executive summary */}

        <ReportSection icon="📝" title="Executive Summary">
          <p style={summaryText}>
            {report.narrative ||
              report.executiveSummary ||
              report.summary ||
              "No executive summary is available for this report."}
          </p>
        </ReportSection>

        {/* AI insights */}

        <ReportSection icon="💡" title="AI-Generated Key Insights">
          {insights.length > 0 ? (
            <div style={listContainer}>
              {insights.map((insight, index) => (
                <div key={index} style={insightItem}>
                  <span style={insightNumber}>{index + 1}</span>

                  <p style={listItemText}>{getItemText(insight)}</p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyMessage text="No key insights are available." />
          )}
        </ReportSection>

        {/* Top themes */}

        <ReportSection icon="🏷️" title="Top Customer Themes">
          {topThemes.length > 0 ? (
            <div style={themeList}>
              {topThemes.map((theme, index) => {
                const count = theme.count ?? 0;

                const percentage =
                  theme.percentage ??
                  calculatePercentage(
                    count,
                    report.totalFeedback ?? statistics.totalFeedback ?? 0,
                  );

                return (
                  <div
                    key={theme.theme || theme.name || index}
                    style={themeItem}
                  >
                    <div style={themeHeading}>
                      <div>
                        <strong style={themeName}>
                          {theme.theme || theme.name || "General"}
                        </strong>

                        <p style={themeCount}>{count} feedback records</p>
                      </div>

                      <strong style={percentageText}>{percentage}%</strong>
                    </div>

                    <div style={progressBackground}>
                      <div
                        style={{
                          ...progressBar,

                          width: `${Math.min(percentage, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyMessage text="No customer themes are available." />
          )}
        </ReportSection>

        {/* Channels and statuses */}

        <div style={twoColumnGrid}>
          <ReportSection icon="📢" title="Feedback Channels">
            {channels.length > 0 ? (
              <div style={dataList}>
                {channels.map((channel, index) => (
                  <DataRow
                    key={index}
                    label={channel.channel || channel.name || "Unknown"}
                    value={channel.count ?? channel.value ?? 0}
                  />
                ))}
              </div>
            ) : (
              <EmptyMessage text="No channel information is available." />
            )}
          </ReportSection>

          <ReportSection icon="📌" title="Feedback Status">
            {statuses.length > 0 ? (
              <div style={dataList}>
                {statuses.map((status, index) => (
                  <DataRow
                    key={index}
                    label={status.status || status.name || "Unknown"}
                    value={status.count ?? status.value ?? 0}
                  />
                ))}
              </div>
            ) : (
              <EmptyMessage text="No status information is available." />
            )}
          </ReportSection>
        </div>

        {/* Recommendations */}

        <ReportSection icon="🎯" title="Recommended Actions">
          {recommendations.length > 0 ? (
            <div style={recommendationList}>
              {recommendations.map((recommendation, index) => (
                <div key={index} style={recommendationItem}>
                  <span style={recommendationIcon}>✓</span>

                  <div>
                    <strong style={recommendationTitle}>
                      Action {index + 1}
                    </strong>

                    <p style={recommendationText}>
                      {getItemText(recommendation)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyMessage text="No recommendations are available." />
          )}
        </ReportSection>

        {/* Report footer */}

        <div style={reportFooter}>
          <strong>⟳ Project LOOP</strong>

          <span>AI Customer Feedback Intelligence</span>

          <span>Generated {formatDate(report.createdAt)}</span>
        </div>
      </div>
    </DashboardLayout>
  );
}

/* Dashboard layout */

function DashboardLayout({ children }) {
  return (
    <div style={layout}>
      <Sidebar />

      <div style={rightContent}>
        <Header />

        <main style={mainContent}>{children}</main>

        <Footer />
      </div>
    </div>
  );
}

/* Reusable information box */

function InformationBox({ icon, label, value }) {
  return (
    <div style={informationBox}>
      <span style={informationIcon}>{icon}</span>

      <div>
        <p style={informationLabel}>{label}</p>

        <strong style={informationValue}>{value}</strong>
      </div>
    </div>
  );
}

/* Reusable statistic card */

function StatisticCard({ icon, label, value, description }) {
  return (
    <div style={statisticCard}>
      <div style={statisticIcon}>{icon}</div>

      <p style={statisticLabel}>{label}</p>

      <h2 style={statisticValue}>{value}</h2>

      <p style={statisticDescription}>{description}</p>
    </div>
  );
}

/* Reusable report section */

function ReportSection({ icon, title, children }) {
  return (
    <section style={contentCard}>
      <div style={sectionHeading}>
        <span style={sectionIcon}>{icon}</span>

        <h2 style={sectionTitle}>{title}</h2>
      </div>

      {children}
    </section>
  );
}

/* Reusable data row */

function DataRow({ label, value }) {
  return (
    <div style={dataRow}>
      <span style={dataLabel}>{label}</span>

      <strong style={dataValue}>{value}</strong>
    </div>
  );
}

/* Empty state */

function EmptyMessage({ text }) {
  return <p style={emptyMessage}>{text}</p>;
}

/* Helper functions */

function formatDate(date) {
  if (!date) {
    return "Not available";
  }

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",

    month: "long",

    year: "numeric",
  });
}

function calculatePercentage(value, total) {
  if (!total) {
    return 0;
  }

  return Number(((value / total) * 100).toFixed(1));
}

function convertToArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (value && typeof value === "object") {
    return Object.values(value);
  }

  if (typeof value === "string") {
    return value
      .split("\n")
      .map((item) => item.replace(/^[-•*\d.)\s]+/, "").trim())
      .filter(Boolean);
  }

  return [];
}

function getItemText(item) {
  if (typeof item === "string") {
    return item;
  }

  if (item && typeof item === "object") {
    return (
      item.text ||
      item.insight ||
      item.recommendation ||
      item.description ||
      item.title ||
      JSON.stringify(item)
    );
  }

  return String(item);
}

/* Page styles */

const layout = {
  display: "flex",

  minHeight: "100vh",

  background: "#F3F4F6",
};

const rightContent = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minWidth: 0,

  marginLeft: "260px", // Sidebar width
};

const mainContent = {
  flex: 1,
  padding: "30px",
  background: "#F3F4F6",
  overflowX: "hidden",
};

const topSection = {
  display: "flex",

  alignItems: "center",

  justifyContent: "space-between",

  gap: "20px",

  marginBottom: "22px",

  flexWrap: "wrap",
};

const topBackButton = {
  display: "inline-flex",

  alignItems: "center",

  padding: "12px 18px",

  borderRadius: "10px",

  background: "#FFFFFF",

  color: "#4F46E5",

  textDecoration: "none",

  fontWeight: "800",

  border: "1px solid #E5E7EB",
};

const reportActions = {
  display: "flex",

  alignItems: "center",

  gap: "12px",

  flexWrap: "wrap",
};

const printButton = {
  padding: "13px 19px",

  border: "1px solid #D1D5DB",

  borderRadius: "11px",

  background: "#FFFFFF",

  color: "#374151",

  fontSize: "14px",

  fontWeight: "800",

  cursor: "pointer",
};

const reportContainer = {
  width: "100%",
  maxWidth: "1350px",
  margin: "0 auto",
};

const heroCard = {
  padding: "35px",

  borderRadius: "20px",

  background: "linear-gradient(135deg, #312E81, #4F46E5)",

  color: "#FFFFFF",

  marginBottom: "24px",

  boxShadow: "0 15px 35px rgba(79,70,229,0.20)",
};

const heroTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  flexWrap: "wrap",
};

const reportLabel = {
  margin: "0 0 10px",

  color: "#C7D2FE",

  fontWeight: "800",

  letterSpacing: "1.5px",

  fontSize: "12px",
};

const pageTitle = {
  margin: 0,

  fontSize: "34px",

  lineHeight: "1.25",
};

const pageDescription = {
  margin: "13px 0 0",

  color: "#E0E7FF",

  lineHeight: "1.7",
};

const statusBadge = {
  padding: "10px 15px",

  borderRadius: "999px",

  background: "rgba(255,255,255,0.18)",

  color: "#FFFFFF",

  fontWeight: "800",

  fontSize: "13px",
};

const reportInformation = {
  display: "grid",

  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",

  gap: "15px",

  marginTop: "30px",
};

const informationBox = {
  display: "flex",

  alignItems: "center",

  gap: "13px",

  padding: "17px",

  borderRadius: "13px",

  background: "rgba(255,255,255,0.13)",
};

const informationIcon = {
  fontSize: "24px",
};

const informationLabel = {
  margin: "0 0 5px",

  color: "#C7D2FE",

  fontSize: "12px",
};

const informationValue = {
  color: "#FFFFFF",

  fontSize: "15px",
};

const statisticsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
  gap: "20px",
};

const statisticCard = {
  padding: "25px",

  borderRadius: "17px",

  background: "#FFFFFF",

  border: "1px solid #E5E7EB",

  boxShadow: "0 8px 22px rgba(15,23,42,0.06)",
};

const statisticIcon = {
  fontSize: "29px",

  marginBottom: "15px",
};

const statisticLabel = {
  margin: 0,

  color: "#6B7280",

  fontWeight: "700",
};

const statisticValue = {
  margin: "12px 0 8px",

  color: "#4F46E5",

  fontSize: "34px",
};

const statisticDescription = {
  margin: 0,

  color: "#9CA3AF",

  fontSize: "13px",
};

const contentCard = {
  padding: "29px",

  borderRadius: "18px",

  background: "#FFFFFF",

  border: "1px solid #E5E7EB",

  marginBottom: "24px",

  boxShadow: "0 8px 22px rgba(15,23,42,0.05)",
};

const sectionHeading = {
  display: "flex",

  alignItems: "center",

  gap: "12px",

  marginBottom: "22px",
};

const sectionIcon = {
  fontSize: "25px",
};

const sectionTitle = {
  margin: 0,

  color: "#111827",

  fontSize: "21px",
};

const summaryText = {
  margin: 0,

  color: "#4B5563",

  fontSize: "15px",

  lineHeight: "1.9",

  whiteSpace: "pre-line",
};

const listContainer = {
  display: "grid",

  gap: "14px",
};

const insightItem = {
  display: "flex",

  alignItems: "flex-start",

  gap: "15px",

  padding: "17px",

  borderRadius: "13px",

  background: "#EEF2FF",
};

const insightNumber = {
  width: "31px",

  height: "31px",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  flexShrink: 0,

  borderRadius: "50%",

  background: "#4F46E5",

  color: "#FFFFFF",

  fontWeight: "800",
};

const listItemText = {
  margin: "4px 0 0",

  color: "#374151",

  lineHeight: "1.65",
};

const themeList = {
  display: "grid",

  gap: "20px",
};

const themeItem = {
  padding: "18px",

  borderRadius: "14px",

  border: "1px solid #E5E7EB",
};

const themeHeading = {
  display: "flex",

  alignItems: "center",

  justifyContent: "space-between",

  gap: "15px",

  marginBottom: "13px",
};

const themeName = {
  color: "#111827",

  fontSize: "16px",
};

const themeCount = {
  margin: "5px 0 0",

  color: "#6B7280",

  fontSize: "13px",
};

const percentageText = {
  color: "#4F46E5",
};

const progressBackground = {
  width: "100%",

  height: "9px",

  borderRadius: "999px",

  background: "#E5E7EB",

  overflow: "hidden",
};

const progressBar = {
  height: "100%",

  borderRadius: "999px",

  background: "linear-gradient(90deg, #4F46E5, #818CF8)",
};

const twoColumnGrid = {
  display: "grid",

  gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",

  gap: "24px",
};

const dataList = {
  display: "grid",

  gap: "12px",
};

const dataRow = {
  display: "flex",

  alignItems: "center",

  justifyContent: "space-between",

  padding: "14px 16px",

  borderRadius: "11px",

  background: "#F9FAFB",

  border: "1px solid #E5E7EB",
};

const dataLabel = {
  color: "#4B5563",

  fontWeight: "700",
};

const dataValue = {
  minWidth: "38px",

  padding: "7px 10px",

  borderRadius: "8px",

  background: "#EEF2FF",

  color: "#4F46E5",

  textAlign: "center",
};

const recommendationList = {
  display: "grid",

  gap: "15px",
};

const recommendationItem = {
  display: "flex",

  alignItems: "flex-start",

  gap: "15px",

  padding: "18px",

  borderRadius: "13px",

  background: "#F0FDF4",

  border: "1px solid #BBF7D0",
};

const recommendationIcon = {
  width: "31px",

  height: "31px",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  flexShrink: 0,

  borderRadius: "50%",

  background: "#16A34A",

  color: "#FFFFFF",

  fontWeight: "900",
};

const recommendationTitle = {
  color: "#166534",
};

const recommendationText = {
  margin: "6px 0 0",

  color: "#374151",

  lineHeight: "1.65",
};

const emptyMessage = {
  margin: 0,

  padding: "18px",

  borderRadius: "12px",

  background: "#F9FAFB",

  color: "#6B7280",

  textAlign: "center",
};

const reportFooter = {
  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",

  gap: "15px",

  padding: "22px",

  borderRadius: "15px",

  background: "#111827",

  color: "#D1D5DB",

  fontSize: "13px",

  flexWrap: "wrap",
};

const stateCard = {
  maxWidth: "650px",

  margin: "80px auto",

  padding: "55px",

  borderRadius: "20px",

  background: "#FFFFFF",

  textAlign: "center",

  boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
};

const errorCard = {
  ...stateCard,

  background: "#FEF2F2",

  border: "1px solid #FECACA",
};

const stateIcon = {
  fontSize: "42px",

  marginBottom: "15px",
};

const stateTitle = {
  margin: "0 0 10px",

  color: "#111827",
};

const stateText = {
  color: "#6B7280",

  lineHeight: "1.7",
};

const errorTitle = {
  margin: "0 0 10px",

  color: "#B91C1C",
};

const errorText = {
  color: "#7F1D1D",

  marginBottom: "25px",
};

const backButton = {
  display: "inline-block",

  padding: "13px 19px",

  borderRadius: "10px",

  background: "#4F46E5",

  color: "#FFFFFF",

  textDecoration: "none",

  fontWeight: "800",
};
