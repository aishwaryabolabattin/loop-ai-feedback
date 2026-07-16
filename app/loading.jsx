export default function Loading() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#F9FAFB",
      }}
    >
      <div
        style={{
          width: "60px",
          height: "60px",
          border: "6px solid #E5E7EB",
          borderTop: "6px solid #4F46E5",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />

      <h2
        style={{
          marginTop: "25px",
          color: "#4F46E5",
        }}
      >
        Loading Project LOOP...
      </h2>

      <style>
        {`
        @keyframes spin {
          from { transform: rotate(0deg);}
          to { transform: rotate(360deg);}
        }
      `}
      </style>
    </div>
  );
}
