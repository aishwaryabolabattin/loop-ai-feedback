"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeedbackVolumeChart from "@/components/dashboard/FeedbackVolumeChart";
import SentimentPieChart from "@/components/dashboard/SentimentPieChart";
import TopThemesChart from "@/components/dashboard/TopThemesChart";
import DashboardStats from "@/components/dashboard/DashboardStats";

export default function DashboardPage() {
  const [stats, setStats] = useState({});

  const [volumeData, setVolumeData] = useState([]);

  const [sentimentData, setSentimentData] = useState([]);

  const [themeData, setThemeData] = useState([]);

  const loadDashboard = async () => {
    try {
      const response = await fetch("/api/dashboard");

      const data = await response.json();

      setStats(data.stats);

      setVolumeData(data.volumeData);

      setSentimentData(data.sentimentData);

      setThemeData(data.themeData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F8FAFC",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <Header />

        <div style={{ padding: "30px" }}>
          {/* Page Title */}
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "700",
              marginBottom: "30px",
            }}
          >
            Dashboard
          </h1>

          {/* Stats Cards */}
          <DashboardStats stats={stats} />

          {/* Dashboard Charts */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(400px,1fr))",
              gap: "25px",
              marginBottom: "35px",
            }}
          >
            <FeedbackVolumeChart data={volumeData} />

            <SentimentPieChart data={sentimentData} />

            <TopThemesChart data={themeData} />
          </div>

          {/* Recent Feedback */}

          <div
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "25px",
              boxShadow: "0 10px 30px rgba(0,0,0,.08)",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
              }}
            >
              Recent Feedback
            </h2>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th align="left">Customer</th>
                  <th align="left">Message</th>
                  <th align="left">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Aishwarya</td>
                  <td>Excellent customer support.</td>
                  <td style={{ color: "green" }}>Positive</td>
                </tr>

                <tr>
                  <td>Nasiroddin</td>
                  <td>Delivery delayed.</td>
                  <td style={{ color: "red" }}>Negative</td>
                </tr>

                <tr>
                  <td>Viewer User</td>
                  <td>Very easy to use.</td>
                  <td style={{ color: "green" }}>Positive</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
