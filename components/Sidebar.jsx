"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Dashboard",
      icon: "📊",
      href: "/dashboard",
    },
    {
      title: "Feedback",
      icon: "💬",
      href: "/feedback",
    },
    {
      title: "CSV Upload",
      icon: "📂",
      href: "/upload",
    },
    {
      title: "Simulator",
      icon: "🚀",
      href: "/simulator",
    },
    {
      title: "Analytics",
      icon: "📊",
      href: "/analytics",
    },
    {
      title: "Themes",
      icon: "🏷️",
      href: "/themes",
    },
    {
      title: "Trends",
      icon: "📈",
      href: "/trends",
    },
    {
      title: "Ask LOOP",
      icon: "🤖",
      href: "/ask-loop",
    },
    {
      title: "Members",
      icon: "👥",
      href: "/members",
    },
    {
      title: "Reports",
      icon: "📄",
      href: "/reports",
    },
    {
      title: "Settings",
      icon: "⚙️",
      href: "/settings",
    },
  ];

  return (
    <aside
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "#111827",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 999,
        top: 0,
        overflowX: "hidden",
        flexShrink: 0,
      }}
    >
      <div>
        {/* Logo */}

        <div
          style={{
            padding: "28px",
            borderBottom: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "26px",
              color: "#ffffff",
            }}
          >
            ⟳ Project LOOP
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#9CA3AF",
              fontSize: "13px",
            }}
          >
            AI Customer Feedback Intelligence
          </p>
        </div>

        {/* Navigation */}

        <div
          style={{
            padding: "20px",
          }}
        >
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  textDecoration: "none",
                  color: isActive ? "#FFFFFF" : "#D1D5DB",
                  background: isActive ? "#4F46E5" : "transparent",
                  padding: "14px 18px",
                  borderRadius: "12px",
                  marginBottom: "12px",
                  fontWeight: "600",
                  transition: "0.3s",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                  }}
                >
                  {item.icon}
                </span>

                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Section */}

      <div
        style={{
          padding: "20px",
          borderTop: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "#4F46E5",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "700",
              fontSize: "18px",
            }}
          >
            A
          </div>

          <div>
            <div
              style={{
                fontWeight: "700",
              }}
            >
              Aishwarya
            </div>

            <small
              style={{
                color: "#9CA3AF",
              }}
            >
              Administrator
            </small>
          </div>
        </div>

        <button
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            background: "#EF4444",
            color: "#FFFFFF",
            border: "none",
            cursor: "pointer",
            fontWeight: "700",
            fontSize: "15px",
          }}
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
