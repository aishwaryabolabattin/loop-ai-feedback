"use client";

import { useRef, useState } from "react";

export default function CSVUploader() {
  const fileInputRef = useRef(null);

  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);

  const handleFile = (file) => {
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      alert("Please select a CSV file.");
      return;
    }

    setFileName(file.name);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "35px",
        boxShadow: "0 15px 35px rgba(0,0,0,.08)",
        marginBottom: "30px",
      }}
    >
      <h2
        style={{
          marginBottom: "10px",
          color: "#111827",
          fontWeight: "700",
        }}
      >
        📂 CSV Bulk Upload
      </h2>

      <p
        style={{
          color: "#6B7280",
          marginBottom: "25px",
        }}
      >
        Upload customer feedback records using a CSV file.
      </p>

      <div
        onClick={() => fileInputRef.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          border: dragging ? "2px solid #4F46E5" : "2px dashed #CBD5E1",
          borderRadius: "18px",
          background: dragging ? "#EEF2FF" : "#F8FAFC",
          padding: "55px",
          textAlign: "center",
          cursor: "pointer",
          transition: ".3s",
        }}
      >
        <div
          style={{
            fontSize: "70px",
            marginBottom: "15px",
          }}
        >
          📁
        </div>

        <h3
          style={{
            marginBottom: "10px",
            color: "#111827",
          }}
        >
          Drag & Drop CSV Here
        </h3>

        <p
          style={{
            color: "#6B7280",
            marginBottom: "25px",
          }}
        >
          or click to browse your computer
        </p>

        <button
          type="button"
          style={{
            padding: "14px 28px",
            border: "none",
            borderRadius: "12px",
            background: "#4F46E5",
            color: "#ffffff",
            fontWeight: "700",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          Choose CSV File
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          hidden
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>

      {fileName && (
        <div
          style={{
            marginTop: "25px",
            padding: "18px",
            background: "#ECFDF5",
            borderRadius: "12px",
            border: "1px solid #A7F3D0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <strong>Selected File</strong>

            <p
              style={{
                margin: "6px 0 0",
                color: "#065F46",
              }}
            >
              {fileName}
            </p>
          </div>

          <button
            style={{
              background: "#10B981",
              color: "#ffffff",
              border: "none",
              padding: "12px 22px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            Upload CSV
          </button>
        </div>
      )}
    </div>
  );
}
