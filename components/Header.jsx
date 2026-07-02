"use client";

import { useState } from "react";

export default function Header() {
  const [search, setSearch] = useState("");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header
      style={{
        background: "#ffffff",
        padding: "20px 30px",
        borderBottom: "1px solid #E5E7EB",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left Side */}
      <div>
        <h2
          style={{
            margin: 0,
            color: "#111827",
            fontSize: "26px",
            fontWeight: "700",
          }}
        >
          Welcome Back 👋
        </h2>

        <p
          style={{
            margin: "6px 0 0",
            color: "#6B7280",
            fontSize: "14px",
          }}
        >
          {today}
        </p>
      </div>

      {/* Right Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "260px",
            padding: "10px 16px",
            borderRadius: "10px",
            border: "1px solid #D1D5DB",
            outline: "none",
            fontSize: "14px",
          }}
        />

        {/* Notification */}
        <button
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            border: "none",
            background: "#EEF2FF",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          🔔
        </button>

        {/* User */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "45px",
              height: "45px",
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

            <div
              style={{
                color: "#6B7280",
                fontSize: "13px",
              }}
            >
              Administrator
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
