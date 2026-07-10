"use client";

export default function ThemeCard({ theme, count, percentage, onView }) {
  return (
    <div style={cardStyle}>
      {/* Theme icon and name */}

      <div style={headerStyle}>
        <div style={iconStyle}>{getThemeIcon(theme)}</div>

        <div>
          <h3 style={themeNameStyle}>{theme || "Uncategorized"}</h3>

          <p style={subtitleStyle}>Feedback Theme</p>
        </div>
      </div>

      {/* Feedback count */}

      <div style={countSectionStyle}>
        <span style={countStyle}>{count}</span>

        <span style={countLabelStyle}>Feedback Records</span>
      </div>

      {/* Percentage */}

      <div style={percentageHeaderStyle}>
        <span style={percentageTextStyle}>Percentage of total feedback</span>

        <span style={percentageValueStyle}>{percentage}%</span>
      </div>

      {/* Progress bar */}

      <div style={progressBackgroundStyle}>
        <div
          style={{
            ...progressBarStyle,

            width: `${Math.min(Math.max(Number(percentage) || 0, 0), 100)}%`,
          }}
        />
      </div>

      {/* View Feedback button */}

      <button type="button" onClick={onView} style={buttonStyle}>
        View Feedback →
      </button>
    </div>
  );
}

/*
=================================
Theme icon function
=================================
*/

function getThemeIcon(theme = "") {
  const value = theme.toLowerCase();

  if (value.includes("delivery")) {
    return "🚚";
  }

  if (value.includes("support") || value.includes("service")) {
    return "🎧";
  }

  if (value.includes("quality") || value.includes("product")) {
    return "⭐";
  }

  if (
    value.includes("price") ||
    value.includes("pricing") ||
    value.includes("payment")
  ) {
    return "💰";
  }

  if (value.includes("packaging")) {
    return "📦";
  }

  if (
    value.includes("user experience") ||
    value.includes("website") ||
    value.includes("app")
  ) {
    return "💻";
  }

  return "🏷️";
}

/*
=================================
CSS styles
=================================
*/

const cardStyle = {
  background: "#FFFFFF",
  padding: "24px",
  borderRadius: "18px",
  border: "1px solid #E5E7EB",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.07)",
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
};

const iconStyle = {
  width: "52px",
  height: "52px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#EEF2FF",
  borderRadius: "14px",
  fontSize: "25px",
};

const themeNameStyle = {
  margin: 0,
  color: "#111827",
  fontSize: "19px",
  fontWeight: "700",
};

const subtitleStyle = {
  margin: "5px 0 0",
  color: "#6B7280",
  fontSize: "13px",
};

const countSectionStyle = {
  display: "flex",
  alignItems: "baseline",
  gap: "9px",
  marginTop: "24px",
};

const countStyle = {
  color: "#4F46E5",
  fontSize: "32px",
  fontWeight: "800",
};

const countLabelStyle = {
  color: "#6B7280",
  fontSize: "14px",
};

const percentageHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "22px",
  marginBottom: "9px",
};

const percentageTextStyle = {
  color: "#6B7280",
  fontSize: "13px",
};

const percentageValueStyle = {
  color: "#4F46E5",
  fontSize: "14px",
  fontWeight: "700",
};

const progressBackgroundStyle = {
  width: "100%",
  height: "9px",
  background: "#E5E7EB",
  borderRadius: "20px",
  overflow: "hidden",
};

const progressBarStyle = {
  height: "100%",
  background: "linear-gradient(90deg, #4F46E5, #818CF8)",
  borderRadius: "20px",
  transition: "width 0.5s ease",
};

const buttonStyle = {
  width: "100%",
  marginTop: "24px",
  padding: "12px",
  background: "#EEF2FF",
  color: "#4F46E5",
  border: "none",
  borderRadius: "10px",
  fontSize: "14px",
  fontWeight: "700",
  cursor: "pointer",
};
