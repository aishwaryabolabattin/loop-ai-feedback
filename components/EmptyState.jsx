"use client";

import Link from "next/link";

export default function EmptyState({
  icon = "📭",
  title = "No Data Available",
  description = "There is nothing to display yet.",
  buttonText,
  buttonLink,
}) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "20px",
        padding: "60px 30px",
        textAlign: "center",
        border: "1px solid #E5E7EB",
        boxShadow: "0 10px 30px rgba(0,0,0,.05)",
      }}
    >
      <div
        style={{
          fontSize: "70px",
          marginBottom: "20px",
        }}
      >
        {icon}
      </div>

      <h2
        style={{
          margin: 0,
          color: "#111827",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          marginTop: "15px",
          color: "#6B7280",
          lineHeight: "1.8",
          maxWidth: "500px",
          marginInline: "auto",
        }}
      >
        {description}
      </p>

      {buttonText && buttonLink && (
        <Link
          href={buttonLink}
          style={{
            display: "inline-block",
            marginTop: "30px",
            background: "#4F46E5",
            color: "#FFFFFF",
            textDecoration: "none",
            padding: "14px 28px",
            borderRadius: "10px",
            fontWeight: "700",
          }}
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}
