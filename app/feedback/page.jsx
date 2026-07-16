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
import Pagination from "@/components/Pagination";
import Skeleton from "@/components/Skeleton";
import { showSuccess, showError, showLoading, dismissToast } from "@/lib/toast";

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

  const [channel, setChannel] = useState("");

  const [theme, setTheme] = useState("");

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [editingId, setEditingId] = useState(null);

  const [selectedIds, setSelectedIds] = useState([]);

  const [loadingAI, setLoadingAI] = useState(false);

  const [loading, setLoading] = useState(true);

  // ===========================
  // Load Feedback
  // ===========================

  const loadFeedback = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/feedback?page=${currentPage}
&limit=10
&search=${search}
&sentiment=${sentiment}
&status=${status}
&channel=${channel}
&theme=${theme}
&startDate=${startDate}
&endDate=${endDate}`,
      );

      const data = await res.json();

      setFeedback(data.feedback || []);

      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, [
    currentPage,
    search,
    sentiment,
    status,
    channel,
    theme,
    startDate,
    endDate,
  ]);

  // Reset page whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, sentiment, status, channel, theme, startDate, endDate]);

  // ===========================
  // Add Feedback
  // ===========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/feedback", {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          id: editingId,
        }),
      });
      const result = await response.json();

      if (!result.success) {
        showError(result.message || result.error);
        return;
      }
      setForm({
        message: "",
        sentiment: "",
        status: "",
        theme: "",
        channel: "",
      });
      setEditingId(null);

      loadFeedback();

      showSuccess(
        editingId
          ? "Feedback updated successfully."
          : "Feedback added successfully.",
      );
    } catch (error) {
      console.log(error);

      showError("Something went wrong.");
    }
  };

  // ===========================
  // Reset Filters
  // ===========================

  const resetFilters = () => {
    setSearch("");

    setSentiment("");

    setStatus("");

    setChannel("");

    setTheme("");

    setStartDate("");

    setEndDate("");

    setCurrentPage(1);
  };

  // ===========================
  // Reclassify All Feedback
  // ===========================

  const reclassifyAll = async () => {
    const confirmAction = window.confirm("Reclassify all feedback using AI?");

    if (!confirmAction) return;

    setLoadingAI(true);

    try {
      const response = await fetch("/api/feedback/reclassify", {
        method: "POST",
      });

      const result = await response.json();

      if (!result.success) {
        showError(result.message || result.error);
        return;
      }

      loadFeedback();

      showSuccess(`${result.updated} feedback reclassified successfully.`);
    } catch (error) {
      console.error(error);
      showError("Failed to reclassify feedback.");
    } finally {
      setLoadingAI(false);
    }
  };

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === feedback.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(feedback.map((item) => item.id));
    }
  };

  const reclassifySelected = async () => {
    if (selectedIds.length === 0) {
      showError("Please select at least one feedback.");
      return;
    }

    const confirmAction = window.confirm(
      `Reclassify ${selectedIds.length} selected feedback?`,
    );

    if (!confirmAction) return;

    setLoadingAI(true);

    try {
      const response = await fetch("/api/feedback/reclassify-selected", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: selectedIds,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        showError(result.message || result.error);
        return;
      }

      loadFeedback();

      setSelectedIds([]);

      showSuccess(`${result.updated} feedback reclassified.`);
    } catch (error) {
      console.error(error);
      showError("Failed to reclassify selected feedback.");
    } finally {
      setLoadingAI(false);
    }
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
            total={feedback?.length || 0}
            onAddFeedback={() => {
              window.scrollTo({
                top: 600,
                behavior: "smooth",
              });
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "15px",
              marginBottom: "20px",
            }}
          >
            <button
              onClick={reclassifySelected}
              disabled={loadingAI}
              style={{
                background: "#10B981",
                color: "#fff",
                border: "none",
                padding: "12px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              {loadingAI ? "Reclassifying..." : "🤖 Reclassify Selected"}
            </button>

            <button
              onClick={reclassifyAll}
              disabled={loadingAI}
              style={{
                background: "#4F46E5",
                color: "#fff",
                border: "none",
                padding: "12px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              {loadingAI ? "Reclassifying..." : "🤖 Reclassify All Feedback"}
            </button>
          </div>

          {/* ============================= */}
          {/* Statistics Cards */}
          {/* ============================= */}

          {loading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: "20px",
                marginBottom: "25px",
              }}
            >
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  style={{
                    background: "#fff",
                    padding: "25px",
                    borderRadius: "15px",
                  }}
                >
                  <Skeleton width="60%" height="18px" />

                  <div style={{ height: "15px" }} />

                  <Skeleton width="40%" height="35px" />
                </div>
              ))}
            </div>
          ) : (
            <FeedbackStats
              total={feedback?.length || 0}
              positive={
                feedback.filter((item) => item.sentiment === "POSITIVE").length
              }
              negative={
                feedback.filter((item) => item.sentiment === "NEGATIVE").length
              }
              pending={feedback.filter((item) => item.status === "NEW").length}
            />
          )}

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
            channel={channel}
            setChannel={setChannel}
            theme={theme}
            setTheme={setTheme}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            resetFilters={resetFilters}
          />

          {/* ============================= */}
          {/* Page Heading */}
          {/* ============================= */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "20px",
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
              {feedback?.length || 0} Records Found
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

          {loading ? (
            <div
              style={{
                background: "#FFFFFF",
                padding: "25px",
                borderRadius: "18px",
                marginBottom: "20px",
              }}
            >
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "15px",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <Skeleton width="60px" height="20px" />

                  <Skeleton width="300px" height="20px" />

                  <Skeleton width="100px" height="20px" />

                  <Skeleton width="100px" height="20px" />

                  <Skeleton width="120px" height="20px" />

                  <Skeleton width="90px" height="20px" />
                </div>
              ))}
            </div>
          ) : (
            <FeedbackTable
              feedback={feedback}
              loadFeedback={loadFeedback}
              selectedIds={selectedIds}
              toggleSelection={toggleSelection}
              toggleSelectAll={toggleSelectAll}
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

                  showSuccess("Feedback deleted successfully.");
                } catch (error) {
                  console.log(error);
                  showError("Delete failed.");
                }
              }}
            />
          )}
          {!loading && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
              }}
            />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
