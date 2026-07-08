"use client";

export default function FeedbackForm({ form, setForm, handleSubmit }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 12px 30px rgba(0,0,0,.08)",
        marginBottom: "30px",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: "25px",
          color: "#111827",
        }}
      >
        🤖 AI Feedback Analyzer
      </h2>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          {/* Message */}

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={label}>Feedback Message</label>

            <textarea
              rows="5"
              placeholder="Enter customer feedback..."
              value={form.message}
              onChange={(e) =>
                setForm({
                  ...form,
                  message: e.target.value,
                })
              }
              style={textarea}
            />
          </div>

          {/* Channel */}

          <div>
            <label style={label}>Channel</label>
            <select
              value={form.channel}
              onChange={(e) =>
                setForm({
                  ...form,
                  channel: e.target.value,
                })
              }
              style={input}
            >
              <option value="">Select Channel</option>

              <option>Email</option>
              <option>Website</option>
              <option>Mobile App</option>
              <option>Phone</option>
              <option>Chat</option>
            </select>
            <p
              style={{
                marginTop: "8px",
                color: "#6B7280",
                fontSize: "13px",
              }}
            >
              AI will automatically detect the sentiment, theme, status, summary
              and confidence score.
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "30px",
          }}
        >
          <button
            type="submit"
            style={{
              padding: "15px 35px",
              background: "linear-gradient(90deg,#4F46E5,#6366F1)",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontWeight: "700",
              fontSize: "15px",
              cursor: "pointer",
              boxShadow: "0 10px 20px rgba(79,70,229,.3)",
            }}
          >
            🤖 Analyze & Save Feedback
          </button>
        </div>
      </form>
    </div>
  );
}

const label = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "600",
  color: "#374151",
};

const input = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #D1D5DB",
  outline: "none",
  fontSize: "14px",
  boxSizing: "border-box",
};

const textarea = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #D1D5DB",
  outline: "none",
  fontSize: "14px",
  resize: "none",
  boxSizing: "border-box",
};
