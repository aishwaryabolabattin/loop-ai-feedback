"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/signup", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Account created successfully!");

        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        router.push("/login");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0F172A,#312E81,#4F46E5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        fontFamily: "Inter,sans-serif",
      }}
    >
      <div
        style={{
          width: "470px",
          background: "#fff",
          borderRadius: "24px",
          padding: "40px",
          boxShadow: "0 25px 60px rgba(0,0,0,.30)",
        }}
      >
        {/* Logo */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "#4F46E5",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              fontSize: "36px",
              margin: "0 auto",
            }}
          >
            ⟳
          </div>

          <h1
            style={{
              marginTop: "18px",
              color: "#111827",
            }}
          >
            Project LOOP
          </h1>

          <p
            style={{
              color: "#6B7280",
              marginTop: "8px",
            }}
          >
            Create your new account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              Password
            </label>

            <div
              style={{
                display: "flex",
                border: "1px solid #D1D5DB",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  border: "none",
                  flex: 1,
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={eyeButton}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              Confirm Password
            </label>

            <div
              style={{
                display: "flex",
                border: "1px solid #D1D5DB",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  border: "none",
                  flex: 1,
                }}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={eyeButton}
              >
                {showConfirmPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "12px",
              background: "#4F46E5",
              color: "#fff",
              fontSize: "17px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Login Link */}
          <div
            style={{
              textAlign: "center",
              marginTop: "25px",
            }}
          >
            <span
              style={{
                color: "#6B7280",
              }}
            >
              Already have an account?
            </span>

            <Link
              href="/login"
              style={{
                color: "#4F46E5",
                fontWeight: "700",
                marginLeft: "8px",
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

/* Styles */

const inputStyle = {
  width: "100%",
  padding: "14px",
  fontSize: "15px",
  outline: "none",
  border: "1px solid #D1D5DB",
  borderRadius: "10px",
  boxSizing: "border-box",
};

const eyeButton = {
  border: "none",
  background: "#F9FAFB",
  width: "55px",
  cursor: "pointer",
  fontSize: "18px",
};
