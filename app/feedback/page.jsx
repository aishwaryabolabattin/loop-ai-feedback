"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeedbackHeader from "@/components/FeedbackHeader";
import FeedbackStats from "@/components/FeedbackStats";
import FeedbackSearch from "@/components/FeedbackSearch";
import FeedbackForm from "@/components/FeedbackForm";
import FeedbackTable from "@/components/FeedbackTable";
import FeedbackBadge from "@/components/FeedbackBadge";
import Pagination from "@/components/Pagination";

export default function FeedbackPage() {
  // ===========================
  // States
  // ===========================

  const [feedback, setFeedback] = useState([]);

  const [form, setForm] = useState({
    message: "",
    sentiment: "",
    status: "",
    theme: "",
    channel: "",
  });

  const [search, setSearch] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [editingId, setEditingId] = useState(null);
  // ===========================
  // Load Feedback
  // ===========================

  const loadFeedback = async () => {
    try {
      const res = await fetch(
        `/api/feedback?page=${currentPage}&limit=10&search=${search}`,
      );
      const data = await res.json();

      setFeedback(data.feedback);

      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, [currentPage, search]);
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // ===========================
  // Add Feedback
  // ===========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("/api/feedback", {
        method: editingId ? "PUT" : "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...form,
          id: editingId,
        }),
      });
      setForm({
        message: "",
        sentiment: "",
        status: "",
        theme: "",
        channel: "",
      });
      setEditingId(null);

      loadFeedback();

      alert("Feedback Added Successfully");
    } catch (error) {
      console.log(error);

      alert("Something went wrong.");
    }
  };

  // ===========================
  // Reset Filters
  // ===========================

  const resetFilters = () => {
    setSearch("");
    setSentiment("");
    setStatus("");
    setDate("");
  };

  // ===========================
  // Filter Feedback
  // ===========================

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />

        <main
          style={{
            flex: 1,
            background: "#F3F4F6",
            padding: "30px",
          }}
        >
          {/* ============================= */}
          {/* Feedback Header */}
          {/* ============================= */}

          <FeedbackHeader
            total={feedback.length}
            onAddFeedback={() => {
              window.scrollTo({
                top: 600,
                behavior: "smooth",
              });
            }}
          />

          {/* ============================= */}
          {/* Statistics Cards */}
          {/* ============================= */}

          <FeedbackStats
            total={feedback.length}
            positive={
              feedback.filter((item) => item.sentiment === "POSITIVE").length
            }
            negative={
              feedback.filter((item) => item.sentiment === "NEGATIVE").length
            }
            pending={feedback.filter((item) => item.status === "NEW").length}
          />

          {/* ============================= */}
          {/* Search & Filters */}
          {/* ============================= */}

          <FeedbackSearch
            search={search}
            setSearch={setSearch}
            sentiment={sentiment}
            setSentiment={setSentiment}
            status={status}
            setStatus={setStatus}
            date={date}
            setDate={setDate}
            resetFilters={resetFilters}
          />

          {/* ============================= */}
          {/* Page Heading */}
          {/* ============================= */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "25px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  color: "#111827",
                  fontSize: "28px",
                  fontWeight: "700",
                }}
              >
                Customer Feedback Management
              </h2>

              <p
                style={{
                  marginTop: "8px",
                  color: "#6B7280",
                }}
              >
                Create, manage and analyze customer feedback.
              </p>
            </div>

            <div
              style={{
                background: "#4F46E5",
                color: "#fff",
                padding: "12px 20px",
                borderRadius: "12px",
                fontWeight: "700",
                boxShadow: "0 8px 20px rgba(79,70,229,.3)",
              }}
            >
              {feedback.length} Records Found
            </div>
          </div>
          {/* ============================= */}
          {/* Add Feedback Form */}
          {/* ============================= */}

          <FeedbackForm
            form={form}
            setForm={setForm}
            handleSubmit={handleSubmit}
          />

          <div style={{ height: "30px" }} />

          {/* ============================= */}
          {/* Feedback Table */}
          {/* ============================= */}

          <FeedbackTable
            feedback={feedback}
            onView={(item) => {
              alert(
                `Customer: ${item.user?.name || "Unknown"}\n\n` +
                  `Message: ${item.message}\n\n` +
                  `Theme: ${item.theme}\n\n` +
                  `Channel: ${item.channel}\n\n` +
                  `Status: ${item.status}\n\n` +
                  `Sentiment: ${item.sentiment}`,
              );
            }}
            onEdit={(item) => {
              setEditingId(item.id);

              setForm({
                message: item.message,
                sentiment: item.sentiment,
                status: item.status,
                theme: item.theme,
                channel: item.channel,
              });

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            onDelete={async (id) => {
              const confirmDelete = window.confirm(
                "Are you sure you want to delete this feedback?",
              );

              if (!confirmDelete) return;

              try {
                await fetch(`/api/feedback?id=${id}`, {
                  method: "DELETE",
                });

                loadFeedback();

                alert("Feedback deleted successfully.");
              } catch (error) {
                console.log(error);

                alert("Delete failed.");
              }
            }}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);

              // Later we'll call:
              // /api/feedback?page=page
            }}
          />
        </main>

        <Footer />
      </div>
    </div>
  );
}
