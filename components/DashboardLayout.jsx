"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DashboardLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F3F4F6",
      }}
    >
      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />

        <main
          style={{
            flex: 1,
            padding: "30px",
            overflowX: "auto",
            background: "#F3F4F6",
          }}
        >
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
