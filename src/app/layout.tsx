import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "STEM Tutoring Platform",
  description: "Online STEM & Engineering tutoring for students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        {/* Top Navigation */}
        <header
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <nav
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              maxWidth: 1200,
              margin: "0 auto",
            }}
          >
            <strong>STEM Tutors</strong>

            <a href="/">Home</a>
            <a href="/services">Services</a>
            <a href="/pricing">Pricing</a>
            <a href="/dashboard">Dashboard</a>

            <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
              <a href="/auth">Get Started</a>
            </div>
          </nav>
        </header>

        {/* Page Content */}
        <main
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: 24,
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
