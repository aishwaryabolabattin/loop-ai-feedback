"use client";

export default function FeedbackSearch({
  search,
  setSearch,

  sentiment,
  setSentiment,

  status,
  setStatus,

  channel,
  setChannel,

  theme,
  setTheme,

  startDate,
  setStartDate,

  endDate,
  setEndDate,

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
          gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr auto",
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
            <option value="">All Status</option>
            <option value="NEW">NEW</option>
            <option value="REVIEW">REVIEW</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="ACTIONED">ACTIONED</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>
        </div>
        {/* Channel */}
        {/* Channel */}

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#374151",
            }}
          >
            Channel
          </label>

          <select
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            style={inputStyle}
          >
            <option value="">All Channels</option>
            <option value="Website">Website</option>
            <option value="Email">Email</option>
            <option value="Mobile">Mobile</option>
            <option value="Play Store">Play Store</option>
            <option value="App Store">App Store</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>
        </div>

        {/* Theme */}

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#374151",
            }}
          >
            Theme
          </label>

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={inputStyle}
          >
            <option value="">All Themes</option>
            <option value="Authentication">Authentication</option>
            <option value="Delivery">Delivery</option>
            <option value="Crash">Crash</option>
            <option value="Performance">Performance</option>
            <option value="Support">Support</option>
            <option value="Registration">Registration</option>
            <option value="UI">UI</option>
            <option value="General">General</option>
            <option value="Onboarding">Onboarding</option>
          </select>
        </div>

        {/* From Date */}

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#374151",
            }}
          >
            From
          </label>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* To Date */}

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#374151",
            }}
          >
            To
          </label>

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
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
