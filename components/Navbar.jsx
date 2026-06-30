"use client";

import Link from "next/link";

export default function Navbar({ role }) {
  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "15px",
        background: "#1e293b",
      }}
    >
      <Link href="/" style={{ color: "white" }}>
        Home
      </Link>

      <Link href="/dashboard" style={{ color: "white" }}>
        Dashboard
      </Link>

      <Link href="/feedback" style={{ color: "white" }}>
        Feedback
      </Link>

      {/* Only ADMIN can see Members */}
      {role === "ADMIN" && (
        <Link href="/members" style={{ color: "white" }}>
          Members
        </Link>
      )}
    </nav>
  );
}
