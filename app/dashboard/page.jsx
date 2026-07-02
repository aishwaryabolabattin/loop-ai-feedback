import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F8FAFC",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <Header />

        <div style={{ padding: "30px" }}>
          {/* Page Title */}
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "700",
              marginBottom: "30px",
            }}
          >
            Dashboard
          </h1>

          {/* Statistics Cards */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "20px",
              marginBottom: "35px",
            }}
          >
            <Card title="Total Feedback" value="120" color="#4F46E5" />

            <Card title="Positive" value="75" color="#10B981" />

            <Card title="Negative" value="30" color="#EF4444" />

            <Card title="Pending" value="15" color="#F59E0B" />
          </div>

          {/* Recent Feedback */}

          <div
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "25px",
              boxShadow: "0 10px 30px rgba(0,0,0,.08)",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
              }}
            >
              Recent Feedback
            </h2>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th align="left">Customer</th>
                  <th align="left">Message</th>
                  <th align="left">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Aishwarya</td>
                  <td>Excellent customer support.</td>
                  <td style={{ color: "green" }}>Positive</td>
                </tr>

                <tr>
                  <td>Nasiroddin</td>
                  <td>Delivery delayed.</td>
                  <td style={{ color: "red" }}>Negative</td>
                </tr>

                <tr>
                  <td>Viewer User</td>
                  <td>Very easy to use.</td>
                  <td style={{ color: "green" }}>Positive</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "25px",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
      }}
    >
      <p
        style={{
          color: "#6B7280",
          marginBottom: "10px",
        }}
      >
        {title}
      </p>

      <h2
        style={{
          color,
          fontSize: "34px",
        }}
      >
        {value}
      </h2>
    </div>
  );
}
