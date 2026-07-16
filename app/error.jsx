"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body
        style={{
          margin: 0,
          fontFamily: "Arial, sans-serif",
          background: "#F9FAFB",
        }}
      >
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px",
          }}
        >
          <div
            style={{
              maxWidth: "600px",
              width: "100%",
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "40px",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,.08)",
            }}
          >
            <div
              style={{
                fontSize: "70px",
                marginBottom: "20px",
              }}
            >
              ⚠️
            </div>

            <h1
              style={{
                color: "#DC2626",
                marginBottom: "15px",
              }}
            >
              Something went wrong
            </h1>

            <p
              style={{
                color: "#6B7280",
                lineHeight: "1.7",
                marginBottom: "25px",
              }}
            >
              Project LOOP encountered an unexpected error. Please try again.
            </p>

            {process.env.NODE_ENV === "development" && error?.message && (
              <div
                style={{
                  background: "#FEF2F2",
                  padding: "15px",
                  borderRadius: "10px",
                  color: "#B91C1C",
                  marginBottom: "25px",
                  textAlign: "left",
                  wordBreak: "break-word",
                }}
              >
                <strong>Error:</strong>

                <br />

                {error.message}
              </div>
            )}

            <button
              onClick={() => reset()}
              style={{
                padding: "14px 28px",
                border: "none",
                borderRadius: "10px",
                background: "#4F46E5",
                color: "#FFFFFF",
                fontWeight: "700",
                cursor: "pointer",
                marginRight: "12px",
              }}
            >
              🔄 Try Again
            </button>

            <button
              onClick={() => {
                window.location.href = "/dashboard";
              }}
              style={{
                padding: "14px 28px",
                border: "none",
                borderRadius: "10px",
                background: "#111827",
                color: "#FFFFFF",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              🏠 Dashboard
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
