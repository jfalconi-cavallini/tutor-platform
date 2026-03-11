import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main style={{ padding: 40, maxWidth: 900 }}>
      <h1 style={{ fontSize: 44, marginBottom: 10 }}>
        STEM & Engineering Tutoring — Online, 1:1
      </h1>

      <p style={{ fontSize: 18, lineHeight: 1.6, marginBottom: 24 }}>
        Personalized tutoring in Math, Physics, Computer Science, and Robotics.
        Built for students who want confidence, strong fundamentals, and real
        progress — fast.
      </p>

      <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
        <a
          href="/auth"
          style={{
            padding: "10px 16px",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          Get Started
        </a>

        <a
          href="/dashboard"
          style={{
            padding: "10px 16px",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          Go to Dashboard
        </a>
      </div>

      <section style={{ display: "grid", gap: 12 }}>
        <h2 style={{ fontSize: 24, marginTop: 10 }}>What we help with</h2>
        <ul style={{ lineHeight: 1.8 }}>
          <li>Math: Algebra → Calculus (AP / IB support)</li>
          <li>Physics: Mechanics, Electricity & Magnetism</li>
          <li>Computer Science: Python, Java, Data Structures</li>
          <li>Robotics & Engineering: VEX IQ, design + problem solving</li>
        </ul>

        <h2 style={{ fontSize: 24, marginTop: 10 }}>How it works</h2>
        <ol style={{ lineHeight: 1.8 }}>
          <li>Create an account (takes 30 seconds)</li>
          <li>Choose a package that fits your goal</li>
          <li>Schedule sessions and meet on Zoom</li>
        </ol>

        <p style={{ marginTop: 16 }}>
          Ready to start? <a href="/auth">Create your account</a>.
        </p>
      </section>
    </main>
  );
}
