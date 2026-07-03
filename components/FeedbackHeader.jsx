"use client";

export default function FeedbackHeader({ total = 0, onAddFeedback }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "22px",
        padding: "30px",
        marginBottom: "30px",
        boxShadow: "0 15px 40px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {/* Left Section */}
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "#EEF2FF",
              color: "#4F46E5",
              padding: "8px 15px",
              borderRadius: "25px",
              fontWeight: "600",
              fontSize: "14px",
              marginBottom: "15px",
            }}
          >
            💬 Customer Experience
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "36px",
              color: "#111827",
              fontWeight: "800",
            }}
          >
            Customer Feedback
          </h1>

          <p
            style={{
              marginTop: "10px",
              color: "#6B7280",
              fontSize: "16px",
              lineHeight: "26px",
              maxWidth: "600px",
            }}
          >
            View, analyze and manage customer feedback collected from different
            channels. Track customer satisfaction, identify issues quickly and
            improve your products with AI-powered insights.
          </p>
        </div>

        {/* Right Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "15px",
          }}
        >
          <div
            style={{
              background: "#4F46E5",
              color: "#ffffff",
              padding: "18px 28px",
              borderRadius: "18px",
              textAlign: "center",
              minWidth: "180px",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                opacity: ".85",
              }}
            >
              Total Feedback
            </div>

            <div
              style={{
                fontSize: "36px",
                fontWeight: "800",
                marginTop: "8px",
              }}
            >
              {total}
            </div>
          </div>

          <button
            onClick={onAddFeedback}
            style={{
              width: "180px",
              padding: "15px",
              border: "none",
              borderRadius: "14px",
              background: "linear-gradient(90deg,#4F46E5,#6366F1)",
              color: "#ffffff",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "16px",
              transition: ".3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            ➕ Add Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
