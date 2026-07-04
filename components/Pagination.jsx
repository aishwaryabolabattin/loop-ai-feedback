"use client";

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        marginTop: "30px",
        flexWrap: "wrap",
      }}
    >
      {/* Previous */}

      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        style={{
          padding: "10px 18px",
          borderRadius: "10px",
          border: "none",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          background: currentPage === 1 ? "#E5E7EB" : "#4F46E5",
          color: currentPage === 1 ? "#6B7280" : "#fff",
          fontWeight: "600",
        }}
      >
        ◀ Previous
      </button>

      {/* Page Numbers */}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontWeight: "700",
            background: currentPage === page ? "#4F46E5" : "#F3F4F6",
            color: currentPage === page ? "#fff" : "#374151",
            transition: "0.3s",
          }}
        >
          {page}
        </button>
      ))}

      {/* Next */}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        style={{
          padding: "10px 18px",
          borderRadius: "10px",
          border: "none",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          background: currentPage === totalPages ? "#E5E7EB" : "#4F46E5",
          color: currentPage === totalPages ? "#6B7280" : "#fff",
          fontWeight: "600",
        }}
      >
        Next ▶
      </button>
    </div>
  );
}
