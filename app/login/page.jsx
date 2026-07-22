"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #312e81 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#fff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 20px 60px rgba(0,0,0,.3)",
        }}
      >
        {/* Logo */}

        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <div
            style={{
              width: 70,
              height: 70,
              margin: "0 auto",
              borderRadius: 18,
              background: "#5b4bdb",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            ⟳
          </div>

          <h1
            style={{
              marginTop: 20,
              marginBottom: 8,
              color: "#111827",
              fontWeight: "800",
            }}
          >
            Project LOOP
          </h1>

          <p
            style={{
              color: "#6b7280",
            }}
          >
            AI Customer Feedback Intelligence
          </p>
        </div>

        {/* Email */}

        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              fontWeight: 700,
              fontSize: 13,
              display: "block",
              marginBottom: 8,
            }}
          >
            EMAIL
          </label>

          <input
            type="email"
            placeholder="admin@loop.dev"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 10,
              border: "1px solid #d1d5db",
              fontSize: 15,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Password */}

        <div style={{ marginBottom: 25 }}>
          <label
            style={{
              fontWeight: 700,
              fontSize: 13,
              display: "block",
              marginBottom: 8,
            }}
          >
            PASSWORD
          </label>

          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 10,
              border: "1px solid #d1d5db",
              fontSize: 15,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Login Button */}

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "14px",
            background: "#635BFF",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            fontWeight: "700",
            fontSize: 17,
            cursor: "pointer",
          }}
        >
          Sign In →
        </button>

        {/* Demo */}

        <div
          style={{
            marginTop: 25,
            background: "#f5f7ff",
            borderRadius: 12,
            padding: 20,
            textAlign: "center",
          }}
        >
          <h3
            style={{
              marginBottom: 15,
              fontSize: 16,
            }}
          >
            Demo Credentials
          </h3>

          <p>
            <b>Admin:</b> admin@loop.dev
          </p>

          <p>
            <b>Analyst:</b> analyst@loop.dev
          </p>

          <p>
            <b>Viewer:</b> viewer@loop.dev
          </p>

          <br />

          <p
            style={{
              color: "#6b7280",
              fontSize: 14,
            }}
          >
            Password can be anything
          </p>
        </div>
      </div>
    </div>
  );
}
