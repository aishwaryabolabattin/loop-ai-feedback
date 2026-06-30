"use client";

import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const role = "ADMIN"; // Temporary

  return (
    <>
      <Navbar role={role} />

      <div style={{ padding: "30px" }}>
        <h1>Dashboard</h1>
      </div>
    </>
  );
}
