"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        width: "100%",
        height: "70px",
        background: "#ffffff",
        borderBottom: "1px solid #E5E7EB",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        boxSizing: "border-box",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "12px",
            background: "#4F46E5",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontWeight: "700",
            fontSize: "18px",
          }}
        >
          ⟳
        </div>

        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "22px",
              color: "#111827",
            }}
          >
            Project LOOP
          </h2>

          <small style={{ color: "#6B7280" }}>
            AI Customer Feedback Intelligence
          </small>
        </div>
      </div>

      {/* Center Navigation */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
        }}
      >
        <Link href="/dashboard" style={linkStyle}>
          Dashboard
        </Link>

        <Link href="/feedback" style={linkStyle}>
          Feedback
        </Link>

        <Link href="/members" style={linkStyle}>
          Members
        </Link>

        <Link href="/reports" style={linkStyle}>
          Reports
        </Link>

        <Link href="/settings" style={linkStyle}>
          Settings
        </Link>
      </div>

      {/* Right Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Notification */}
        <button
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            border: "none",
            background: "#EEF2FF",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          🔔
        </button>

        {/* Profile */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "#4F46E5",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "700",
            }}
          >
            A
          </div>

          <div>
            <div
              style={{
                fontWeight: "700",
                color: "#111827",
              }}
            >
              Aishwarya
            </div>

            <small style={{ color: "#6B7280" }}>Administrator</small>
          </div>
        </div>
      </div>
    </nav>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#374151",
  fontWeight: "600",
  transition: "0.3s",
};
