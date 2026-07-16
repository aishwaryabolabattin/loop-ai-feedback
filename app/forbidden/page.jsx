"use client";

import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#F9FAFB",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "650px",
          width: "100%",
          background: "#FFFFFF",
          borderRadius: "20px",
          padding: "50px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        }}
      >
        <div
          style={{
            fontSize: "80px",
            marginBottom: "20px",
          }}
        >
          🔒
        </div>

        <h1
          style={{
            fontSize: "56px",
            color: "#DC2626",
            margin: 0,
          }}
        >
          403
        </h1>

        <h2
          style={{
            marginTop: "15px",
            color: "#111827",
          }}
        >
          Access Denied
        </h2>

        <p
          style={{
            marginTop: "15px",
            color: "#6B7280",
            lineHeight: "1.8",
          }}
        >
          You don't have permission to access this page.
        </p>

        <Link
          href="/dashboard"
          style={{
            display: "inline-block",
            marginTop: "30px",
            padding: "14px 30px",
            background: "#4F46E5",
            color: "#FFFFFF",
            textDecoration: "none",
            borderRadius: "10px",
            fontWeight: "700",
          }}
        >
          🏠 Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
