"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Dashboard",
      icon: "📊",
      link: "/dashboard",
    },
    {
      title: "Feedback",
      icon: "💬",
      link: "/feedback",
    },
    {
      title: "CSV Upload",
      icon: "📂",
      link: "/upload",
    },
    {
      title: "Simulator",
      icon: "🚀",
      link: "/simulator",
    },
    {
      title: "Analytics",
      icon: "📈",
      link: "/analytics",
    },
    {
      title: "Members",
      icon: "👥",
      link: "/members",
    },

    {
      title: "Reports",
      icon: "📄",
      link: "/reports",
    },
    {
      title: "Settings",
      icon: "⚙️",
      link: "/settings",
    },
  ];

  return (
    <aside
      style={{
        width: "270px",
        height: "100vh",
        background: "#111827",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo */}
      <div>
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
          {menuItems.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                textDecoration: "none",
                color: pathname === item.link ? "#ffffff" : "#D1D5DB",
                background: pathname === item.link ? "#4F46E5" : "transparent",
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

              {item.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div
        style={{
          padding: "20px",
          borderTop: "1px solid rgba(255,255,255,.08)",
        }}
      >
        {/* User */}
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

        {/* Logout Button */}
        <button
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            background: "#EF4444",
            color: "#fff",
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
