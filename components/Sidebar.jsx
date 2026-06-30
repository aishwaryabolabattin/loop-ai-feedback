"use client";

import Link from "next/link";

export default function Sidebar({ role }) {
  return (
    <div
      style={{
        width: 220,
        height: "100vh",
        background: "#1E293B",
        color: "white",
        padding: 20,
      }}
    >
      <h2>Project LOOP</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link href="/feedback">Feedback</Link>
        </li>

        {role === "ADMIN" && (
          <li>
            <Link href="/members">Members</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
