"use client";

export default function Skeleton({
  width = "100%",
  height = "20px",
  borderRadius = "8px",
}) {
  return (
    <>
      <div
        style={{
          width,
          height,
          borderRadius,
          background:
            "linear-gradient(90deg,#E5E7EB 25%,#F3F4F6 50%,#E5E7EB 75%)",
          backgroundSize: "200% 100%",
          animation: "loading 1.5s infinite",
        }}
      />

      <style>{`
        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </>
  );
}
