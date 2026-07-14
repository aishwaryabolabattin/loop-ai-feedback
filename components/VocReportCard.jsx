import Link from "next/link";

export default function VocReportCard({ report }) {
  // Do not display anything if report data is missing.

  if (!report) {
    return null;
  }

  return (
    <article style={reportCard}>
      {/* Top section */}

      <div style={cardTop}>
        <div style={cardReportIcon}>📄</div>

        <span style={statusBadge}>{report.status || "COMPLETED"}</span>
      </div>

      {/* Report title */}

      <h3 style={reportTitle}>{report.title || "Voice-of-Customer Report"}</h3>

      {/* Report period */}

      <p style={reportPeriod}>📅 {formatPeriod(report.period)}</p>

      {/* Total feedback */}

      <div style={totalFeedbackBox}>
        <span>Total Feedback</span>

        <strong>{report.totalFeedback ?? 0}</strong>
      </div>

      {/* Sentiment statistics */}

      <div style={sentimentGrid}>
        {/* Positive */}

        <div style={positiveBox}>
          <span>😊 Positive</span>

          <strong>{report.positiveCount ?? 0}</strong>
        </div>

        {/* Neutral */}

        <div style={neutralBox}>
          <span>😐 Neutral</span>

          <strong>{report.neutralCount ?? 0}</strong>
        </div>

        {/* Negative */}

        <div style={negativeBox}>
          <span>😞 Negative</span>

          <strong>{report.negativeCount ?? 0}</strong>
        </div>
      </div>

      {/* Bottom section */}

      <div style={cardFooter}>
        <div>
          <small style={dateLabel}>Generated</small>

          <div style={generatedDate}>{formatDate(report.createdAt)}</div>
        </div>

        <Link href={`/reports/${report.id}`} style={viewButton}>
          View Report →
        </Link>
      </div>
    </article>
  );
}

// ========================================
// Format report period
// ========================================

function formatPeriod(period) {
  if (!period) {
    return "Selected Period";
  }

  return period.replace("LAST_", "Last ").replace("_DAYS", " Days");
}

// ========================================
// Format report date
// ========================================

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
// Component styles
// ========================================

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
  marginTop: 0,

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

  marginBottom: "15px",

  background: "#F8FAFC",

  color: "#374151",
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

const dateLabel = {
  color: "#9CA3AF",
};

const generatedDate = {
  marginTop: "3px",

  color: "#4B5563",

  fontSize: "13px",

  fontWeight: "600",
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
