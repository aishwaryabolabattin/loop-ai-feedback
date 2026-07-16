import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project LOOP",
  description: "AI Customer Feedback Intelligence Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>

  <Toaster
    position="top-right"
    reverseOrder={false}
    toastOptions={{
      duration: 3000,
      style: {
        background: "#111827",
        color: "#fff",
        borderRadius: "12px",
        fontSize: "15px",
      },
      success: {
        iconTheme: {
          primary: "#10B981",
          secondary: "#fff",
        },
      },
      error: {
        iconTheme: {
          primary: "#EF4444",
          secondary: "#fff",
        },
      },
    }}
  />

  {children}

</body>
    </html>
  );
}