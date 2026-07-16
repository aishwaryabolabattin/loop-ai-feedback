"use client";

import Link from "next/link";

export default function NotFound() {
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
          maxWidth: "600px",
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
          🔍
        </div>

        <h1
          style={{
            fontSize: "60px",
            margin: "0",
            color: "#4F46E5",
          }}
        >
          404
        </h1>

        <h2
          style={{
            marginTop: "15px",
            color: "#111827",
          }}
        >
          Page Not Found
        </h2>

        <p
          style={{
            color: "#6B7280",
            marginTop: "15px",
            lineHeight: "1.7",
          }}
        >
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/dashboard"
          style={{
            display: "inline-block",
            marginTop: "30px",
            padding: "14px 28px",
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
