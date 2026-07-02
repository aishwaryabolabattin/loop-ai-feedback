"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        width: "100%",
        marginTop: "40px",
        padding: "20px 30px",
        background: "#ffffff",
        borderTop: "1px solid #E5E7EB",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        boxSizing: "border-box",
      }}
    >
      {/* Left Side */}
      <div>
        <h3
          style={{
            margin: 0,
            color: "#4F46E5",
            fontSize: "18px",
            fontWeight: "700",
          }}
        >
          Project LOOP
        </h3>

        <p
          style={{
            margin: "5px 0 0",
            color: "#6B7280",
            fontSize: "13px",
          }}
        >
          AI Customer Feedback Intelligence Platform
        </p>
      </div>

      {/* Center */}
      <div
        style={{
          color: "#9CA3AF",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        © {year} Project LOOP. All Rights Reserved.
      </div>

      {/* Right Side */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <a
          href="#"
          style={{
            color: "#4F46E5",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Privacy
        </a>

        <a
          href="#"
          style={{
            color: "#4F46E5",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Terms
        </a>

        <a
          href="#"
          style={{
            color: "#4F46E5",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Support
        </a>
      </div>
    </footer>
  );
}
