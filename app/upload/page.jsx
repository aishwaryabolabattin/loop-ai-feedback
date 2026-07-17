import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import CSVUploader from "@/components/CSVUploader";
import UploadSummary from "@/components/UploadSummary";
import UploadTable from "@/components/UploadTable";
import UploadProgress from "@/components/UploadProgress";

export default function UploadPage() {
  const uploadRows = [
    {
      customer: "Aishwarya",
      message: "Excellent support",
      sentiment: "POSITIVE",
      status: "NEW",
      channel: "Email",
      success: true,
    },
    {
      customer: "Nasiroddin",
      message: "Delivery delayed",
      sentiment: "NEGATIVE",
      status: "REVIEW",
      channel: "Website",
      success: true,
    },
    {
      customer: "Viewer User",
      message: "Application is slow.",
      sentiment: "NEUTRAL",
      status: "NEW",
      channel: "Mobile",
      success: false,
    },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          marginLeft: "260px", // <-- Add this
          background: "#F3F4F6",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header />

        <main
          style={{
            flex: 1,
            padding: "30px",
          }}
        >
          <CSVUploader />

          <UploadSummary total={3} imported={2} failed={1} skipped={0} />

          <UploadTable rows={uploadRows} />
        </main>
      </div>

      <Footer />
    </div>
  );
}
