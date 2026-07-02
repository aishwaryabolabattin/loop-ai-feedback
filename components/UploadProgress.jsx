"use client";

export default function UploadProgress({ progress = 0, uploading = false }) {
  if (!uploading) return null;

  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "18px",
        marginTop: "25px",
        marginBottom: "25px",
        boxShadow: "0 10px 30px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <h3
          style={{
            margin: 0,
            color: "#111827",
          }}
        >
          Upload Progress
        </h3>

        <strong>{progress}%</strong>
      </div>

      <div
        style={{
          width: "100%",
          height: "14px",
          background: "#E5E7EB",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "linear-gradient(90deg,#4F46E5,#6366F1)",
            transition: "width .4s ease",
          }}
        />
      </div>

      <p
        style={{
          marginTop: "12px",
          color: "#6B7280",
        }}
      >
        Uploading CSV records...
      </p>
    </div>
  );
}
