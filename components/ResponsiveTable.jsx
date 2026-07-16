"use client";

export default function ResponsiveTable({ children }) {
  return (
    <div
      style={{
        overflowX: "auto",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}
