"use client";

import FeedbackBadge from "./FeedbackBadge";
import StatusDropdown from "./StatusDropdown";

export default function FeedbackTable({
  feedback = [],
  onEdit,
  onDelete,
  onView,
  loadFeedback,
  selectedIds,
  toggleSelection,
  toggleSelectAll,
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "25px",
        boxShadow: "0 12px 35px rgba(0,0,0,.08)",
      }}
    >
      {/* Heading */}

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
            }}
          >
            📋 Feedback List
          </h2>

          <p
            style={{
              marginTop: "8px",
              color: "#6B7280",
            }}
          >
            Customer feedback collected from all channels
          </p>
        </div>

        <div
          style={{
            background: "#EEF2FF",
            color: "#4F46E5",
            padding: "10px 18px",
            borderRadius: "30px",
            fontWeight: "700",
          }}
        >
          {feedback.length} Records
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
                background: "#F8FAFC",
              }}
            >
              <th style={th}>
                <input
                  type="checkbox"
                  checked={
                    feedback.length > 0 &&
                    selectedIds.length === feedback.length
                  }
                  onChange={toggleSelectAll}
                />
              </th>

              <th style={th}>Customer</th>
              <th style={th}>Message</th>
              <th style={th}>Theme</th>
              <th style={th}>Channel</th>
              <th style={th}>Sentiment</th>
              <th style={th}>Status</th>
              <th style={th}>Summary</th>
              <th style={th}>Confidence</th>
              <th style={th}>Date</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {feedback.length === 0 ? (
              <tr>
                <td
                  colSpan="11"
                  style={{
                    textAlign: "center",
                    padding: "60px",
                    color: "#9CA3AF",
                    fontSize: "16px",
                  }}
                >
                  📭 No Feedback Available
                </td>
              </tr>
            ) : (
              feedback.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: "1px solid #E5E7EB",
                    transition: ".3s",
                  }}
                >
                  <td style={td}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => toggleSelection(item.id)}
                    />
                  </td>
                  {/* Customer */}

                  <td style={td}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",
                          background: "#4F46E5",
                          color: "#fff",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "700",
                        }}
                      >
                        {item.user?.name?.charAt(0) || "U"}
                      </div>

                      <div>
                        <div
                          style={{
                            fontWeight: "700",
                          }}
                        >
                          {item.user?.name || "Unknown User"}
                        </div>

                        <small
                          style={{
                            color: "#6B7280",
                          }}
                        >
                          {item.user?.email}
                        </small>
                      </div>
                    </div>
                  </td>

                  {/* Message */}

                  <td style={td}>
                    <div
                      style={{
                        maxWidth: "260px",
                        color: "#374151",
                      }}
                    >
                      {item.message}
                    </div>
                  </td>

                  {/* Theme */}

                  <td style={td}>{item.theme}</td>

                  {/* Channel */}

                  <td style={td}>{item.channel}</td>

                  {/* Sentiment */}

                  <td style={td}>
                    <FeedbackBadge type="sentiment" value={item.sentiment} />
                  </td>

                  {/* Status */}

                  <td style={td}>
                    <StatusDropdown
                      value={item.status}
                      onChange={async (newStatus) => {
                        try {
                          const response = await fetch("/api/feedback", {
                            method: "PATCH",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              id: item.id,
                              status: newStatus,
                            }),
                          });

                          if (!response.ok) {
                            throw new Error("Failed to update status");
                          }

                          loadFeedback();
                        } catch (error) {
                          console.error(error);
                          alert("Failed to update feedback status.");
                        }
                      }}
                    />
                  </td>

                  {/* Summary */}

                  <td style={td}>{item.summary || "-"}</td>

                  {/* Confidence */}

                  <td style={td}>
                    {item.confidence !== null && item.confidence !== undefined
                      ? `${Math.round(item.confidence * 100)}%`
                      : "-"}
                  </td>

                  {/* Date */}

                  <td style={td}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  {/* Actions */}

                  <td style={td}>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <button onClick={() => onView(item)} style={viewBtn}>
                        👁
                      </button>

                      <button onClick={() => onEdit(item)} style={editBtn}>
                        ✏
                      </button>

                      <button
                        onClick={async () => {
                          try {
                            const response = await fetch(
                              `/api/feedback/reclassify/${item.id}`,
                              {
                                method: "POST",
                              },
                            );

                            const result = await response.json();

                            if (!result.success) {
                              alert(result.error);
                              return;
                            }

                            loadFeedback();

                            alert("Feedback reclassified successfully.");
                          } catch (error) {
                            console.error(error);
                            alert("Failed to reclassify feedback.");
                          }
                        }}
                        style={aiBtn}
                      >
                        🤖
                      </button>

                      <button
                        onClick={() => onDelete(item.id)}
                        style={deleteBtn}
                      >
                        🗑
                      </button>
                    </div>
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

const th = {
  padding: "16px",
  textAlign: "left",
  color: "#374151",
  fontWeight: "700",
  borderBottom: "2px solid #E5E7EB",
};

const td = {
  padding: "18px 16px",
  color: "#374151",
};

const viewBtn = {
  background: "#DBEAFE",
  border: "none",
  width: "38px",
  height: "38px",
  borderRadius: "10px",
  cursor: "pointer",
};

const editBtn = {
  background: "#FEF3C7",
  border: "none",
  width: "38px",
  height: "38px",
  borderRadius: "10px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#FEE2E2",
  border: "none",
  width: "38px",
  height: "38px",
  borderRadius: "10px",
  cursor: "pointer",
};

const aiBtn = {
  background: "#E0E7FF",
  border: "none",
  width: "38px",
  height: "38px",
  borderRadius: "10px",
  cursor: "pointer",
};
