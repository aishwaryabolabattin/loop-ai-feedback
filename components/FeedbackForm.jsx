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
        ➕ Add New Feedback
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

          {/* Sentiment */}

          <div>
            <label style={label}>Sentiment</label>

            <select
              value={form.sentiment}
              onChange={(e) =>
                setForm({
                  ...form,
                  sentiment: e.target.value,
                })
              }
              style={input}
            >
              <option value="">Select Sentiment</option>

              <option value="POSITIVE">😊 Positive</option>

              <option value="NEGATIVE">😞 Negative</option>

              <option value="NEUTRAL">😐 Neutral</option>
            </select>
          </div>

          {/* Status */}

          <div>
            <label style={label}>Status</label>

            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
                })
              }
              style={input}
            >
              <option value="">Select Status</option>

              <option value="NEW">New</option>

              <option value="REVIEW">Review</option>

              <option value="ACTIONED">Actioned</option>

              <option value="CLOSED">Closed</option>
            </select>
          </div>

          {/* Theme */}

          <div>
            <label style={label}>Theme</label>

            <input
              type="text"
              placeholder="Support"
              value={form.theme}
              onChange={(e) =>
                setForm({
                  ...form,
                  theme: e.target.value,
                })
              }
              style={input}
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
            ➕ Save Feedback
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
