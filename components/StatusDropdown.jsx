"use client";

export default function StatusDropdown({ value, onChange, disabled = false }) {
  const getColor = (status) => {
    switch (status) {
      case "NEW":
        return "#2563EB"; // Blue

      case "REVIEW":
        return "#F59E0B"; // Orange

      case "IN_PROGRESS":
        return "#8B5CF6"; // Purple

      case "RESOLVED":
        return "#10B981"; // Green

      default:
        return "#6B7280"; // Gray
    }
  };

  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "150px",
        padding: "10px 12px",
        borderRadius: "10px",
        border: `2px solid ${getColor(value)}`,
        background: "#fff",
        color: getColor(value),
        fontWeight: "700",
        cursor: disabled ? "not-allowed" : "pointer",
        outline: "none",
        fontSize: "14px",
      }}
    >
      <option value="NEW">🆕 NEW</option>

      <option value="REVIEW">🔍 REVIEW</option>

      <option value="IN_PROGRESS">⏳ IN PROGRESS</option>

      <option value="RESOLVED">✅ RESOLVED</option>
    </select>
  );
}
