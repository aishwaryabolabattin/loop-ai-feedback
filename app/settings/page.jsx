"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SettingsPage() {
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
          flex: 1,
          marginLeft: "300px",
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Header />

        <main
          style={{
            flex: 1,
            padding: "35px",
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              marginBottom: "10px",
            }}
          >
            ⚙️ Settings
          </h1>

          <p
            style={{
              color: "#6B7280",
              marginBottom: "35px",
            }}
          >
            Configure your Project LOOP preferences.
          </p>

          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "35px",
              boxShadow: "0 12px 25px rgba(0,0,0,.08)",
            }}
          >
            <Setting title="Workspace Name" value="Project LOOP" />

            <Setting title="Administrator" value="Aishwarya" />

            <Setting title="Notification" value="Enabled" />

            <Setting title="AI Classification" value="Enabled" />

            <Setting title="Theme" value="Light" />

            <Setting title="Language" value="English" />

            <button
              style={{
                marginTop: "30px",
                padding: "15px 35px",
                border: "none",
                borderRadius: "12px",
                background: "#4F46E5",
                color: "#fff",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Save Settings
            </button>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

function Setting({ title, value }) {
  return (
    <div
      style={{
        marginBottom: "25px",
      }}
    >
      <label
        style={{
          display: "block",
          fontWeight: "700",
          marginBottom: "8px",
        }}
      >
        {title}
      </label>

      <input
        defaultValue={value}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "10px",
          border: "1px solid #D1D5DB",
        }}
      />
    </div>
  );
}
