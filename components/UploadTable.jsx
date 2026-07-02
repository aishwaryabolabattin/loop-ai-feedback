"use client";

export default function UploadTable({ rows = [] }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "25px",
        marginTop: "30px",
        boxShadow: "0 12px 30px rgba(0,0,0,.08)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              color: "#111827",
            }}
          >
            📋 Upload Results
          </h2>

          <p
            style={{
              marginTop: "6px",
              color: "#6B7280",
            }}
          >
            Imported feedback records
          </p>
        </div>
      </div>

      <div
        style={{
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#F3F4F6",
              }}
            >
              <th style={thStyle}>#</th>
              <th style={thStyle}>Customer</th>
              <th style={thStyle}>Message</th>
              <th style={thStyle}>Sentiment</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Channel</th>
              <th style={thStyle}>Result</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#9CA3AF",
                  }}
                >
                  No records uploaded yet.
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #E5E7EB",
                  }}
                >
                  <td style={tdStyle}>{index + 1}</td>

                  <td style={tdStyle}>{row.customer}</td>

                  <td style={tdStyle}>{row.message}</td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        ...badge,
                        background:
                          row.sentiment === "POSITIVE"
                            ? "#DCFCE7"
                            : row.sentiment === "NEGATIVE"
                              ? "#FEE2E2"
                              : "#FEF3C7",
                        color:
                          row.sentiment === "POSITIVE"
                            ? "#166534"
                            : row.sentiment === "NEGATIVE"
                              ? "#991B1B"
                              : "#92400E",
                      }}
                    >
                      {row.sentiment}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        ...badge,
                        background:
                          row.status === "NEW"
                            ? "#DBEAFE"
                            : row.status === "REVIEW"
                              ? "#FEF3C7"
                              : "#DCFCE7",
                        color:
                          row.status === "NEW"
                            ? "#1D4ED8"
                            : row.status === "REVIEW"
                              ? "#92400E"
                              : "#166534",
                      }}
                    >
                      {row.status}
                    </span>
                  </td>

                  <td style={tdStyle}>{row.channel}</td>

                  <td style={tdStyle}>
                    {row.success ? (
                      <span
                        style={{
                          ...badge,
                          background: "#DCFCE7",
                          color: "#166534",
                        }}
                      >
                        ✅ Imported
                      </span>
                    ) : (
                      <span
                        style={{
                          ...badge,
                          background: "#FEE2E2",
                          color: "#991B1B",
                        }}
                      >
                        ❌ Failed
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "14px",
  fontWeight: "700",
  color: "#374151",
  fontSize: "14px",
};

const tdStyle = {
  padding: "14px",
  color: "#374151",
  fontSize: "14px",
};

const badge = {
  display: "inline-block",
  padding: "6px 12px",
  borderRadius: "20px",
  fontWeight: "600",
  fontSize: "12px",
};
