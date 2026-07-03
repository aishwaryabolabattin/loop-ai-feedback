"use client";

export default function FeedbackSearch({
  search,
  setSearch,
  sentiment,
  setSentiment,
  status,
  setStatus,
  date,
  setDate,
  resetFilters,
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "25px",
        marginBottom: "30px",
        boxShadow: "0 10px 30px rgba(0,0,0,.08)",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: "20px",
          color: "#111827",
        }}
      >
        🔍 Search & Filter Feedback
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
          gap: "15px",
          alignItems: "end",
        }}
      >
        {/* Search */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#374151",
            }}
          >
            Search
          </label>

          <input
            type="text"
            placeholder="Search message, theme..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Sentiment */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#374151",
            }}
          >
            Sentiment
          </label>

          <select
            value={sentiment}
            onChange={(e) => setSentiment(e.target.value)}
            style={inputStyle}
          >
            <option value="">All</option>
            <option value="POSITIVE">😊 Positive</option>
            <option value="NEGATIVE">😞 Negative</option>
            <option value="NEUTRAL">😐 Neutral</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#374151",
            }}
          >
            Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={inputStyle}
          >
            <option value="">All</option>
            <option value="NEW">🆕 New</option>
            <option value="REVIEW">👀 Review</option>
            <option value="ACTIONED">✅ Actioned</option>
            <option value="CLOSED">✔ Closed</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#374151",
            }}
          >
            Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Reset */}
        <button
          onClick={resetFilters}
          style={{
            height: "48px",
            padding: "0 25px",
            border: "none",
            borderRadius: "12px",
            background: "#EF4444",
            color: "#ffffff",
            fontWeight: "700",
            cursor: "pointer",
            transition: ".3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#DC2626";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#EF4444";
          }}
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #D1D5DB",
  borderRadius: "10px",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};
