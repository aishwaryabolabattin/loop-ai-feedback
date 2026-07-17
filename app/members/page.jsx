"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MemberCard from "@/components/MemberCard";

export default function MembersPage() {
  const [members, setMembers] = useState([]);

  const role = "ADMIN"; // Later replace with session.user.role

  useEffect(() => {
    if (role !== "ADMIN") return;

    fetch("/api/members")
      .then((res) => res.json())
      .then((data) => setMembers(data));
  }, []);

  if (role !== "ADMIN") {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#F8FAFC",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 15px 35px rgba(0,0,0,.1)",
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "#EF4444" }}>🚫 Access Denied</h1>
          <p>Only Admin can access the Members page.</p>
        </div>
      </div>
    );
  }

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

      {/* Main */}
      <div
        style={{
          flex: 1,
          marginLeft: "260px",
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <Header />

        <main
          style={{
            flex: 1,
            padding: "35px",
            overflowX: "hidden",
          }}
        >
          <h1
            style={{
              marginBottom: "30px",
              fontSize: "32px",
              color: "#111827",
            }}
          >
            👥 Workspace Members
          </h1>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "20px",
              marginBottom: "35px",
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "18px",
                boxShadow: "0 8px 24px rgba(0,0,0,.08)",
              }}
            >
              <h3>Total Members</h3>
              <h1>{members.length}</h1>
            </div>

            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "18px",
                boxShadow: "0 8px 24px rgba(0,0,0,.08)",
              }}
            >
              <h3>Admins</h3>
              <h1>{members.filter((m) => m.role === "ADMIN").length}</h1>
            </div>

            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "18px",
                boxShadow: "0 8px 24px rgba(0,0,0,.08)",
              }}
            >
              <h3>Analysts</h3>
              <h1>{members.filter((m) => m.role === "ANALYST").length}</h1>
            </div>

            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "18px",
                boxShadow: "0 8px 24px rgba(0,0,0,.08)",
              }}
            >
              <h3>Viewers</h3>
              <h1>{members.filter((m) => m.role === "VIEWER").length}</h1>
            </div>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Search Members..."
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #D1D5DB",
              marginBottom: "30px",
              fontSize: "15px",
            }}
          />

          {/* Member Cards */}
          {members.map((member) => (
            <MemberCard
              key={member.id}
              avatar={member.name.charAt(0)}
              name={member.name}
              email={member.email}
              role={member.role}
              status="Active"
            />
          ))}
        </main>
        <Footer />
      </div>
    </div>
  );
}
