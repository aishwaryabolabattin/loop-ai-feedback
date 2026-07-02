"use client";

export default function MemberCard({
  name,
  email,
  role,
  status = "Active",
  avatar,
}) {
  const roleColor = {
    ADMIN: "#4F46E5",
    ANALYST: "#0EA5E9",
    VIEWER: "#22C55E",
  };

  const statusColor = {
    Active: "#22C55E",
    Inactive: "#EF4444",
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "18px",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        marginBottom: "18px",
        transition: "0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 18px 35px rgba(79,70,229,.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
      }}
    >
      {/* Left */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: "58px",
            height: "58px",
            borderRadius: "50%",
            background: roleColor[role],
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700",
            fontSize: "20px",
          }}
        >
          {avatar}
        </div>

        {/* Info */}
        <div>
          <h3
            style={{
              margin: 0,
              color: "#111827",
              fontSize: "18px",
            }}
          >
            {name}
          </h3>

          <p
            style={{
              margin: "6px 0 0",
              color: "#6B7280",
              fontSize: "14px",
            }}
          >
            {email}
          </p>
        </div>
      </div>

      {/* Right */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {/* Role */}
        <span
          style={{
            padding: "8px 14px",
            borderRadius: "30px",
            background: roleColor[role],
            color: "#fff",
            fontWeight: "600",
            fontSize: "13px",
          }}
        >
          {role}
        </span>

        {/* Status */}
        <span
          style={{
            padding: "8px 14px",
            borderRadius: "30px",
            background: statusColor[status],
            color: "#fff",
            fontWeight: "600",
            fontSize: "13px",
          }}
        >
          {status}
        </span>

        {/* Action */}
        <button
          style={{
            border: "none",
            background: "#EEF2FF",
            color: "#4F46E5",
            padding: "10px 16px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          View
        </button>
      </div>
    </div>
  );
}
