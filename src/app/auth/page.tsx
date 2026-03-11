"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

type Mode = "login" | "register";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (mode === "register") {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data?.error || "Registration failed");
        return;
      }

      // Auto-login after successful registration
      const loginRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!loginRes?.ok) {
        setMessage("Account created. Please sign in.");
        setMode("login");
        return;
      }

      window.location.href = "/dashboard";
      return;
    }

    // login
    const loginRes = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!loginRes?.ok) {
      setMessage("Invalid email or password");
      return;
    }

    window.location.href = "/dashboard";
  };

  const title = mode === "login" ? "Sign in" : "Create your account";
  const primaryButtonText = mode === "login" ? "Sign in" : "Create account";

  return (
    <main style={{ padding: 40, maxWidth: 520 }}>
      <h1>{title}</h1>

      {/* Mode toggle */}
      <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
        <button
          type="button"
          onClick={() => setMode("login")}
          style={{
            fontWeight: mode === "login" ? "bold" : "normal",
          }}
        >
          Sign in
        </button>

        <button
          type="button"
          onClick={() => setMode("register")}
          style={{
            fontWeight: mode === "register" ? "bold" : "normal",
          }}
        >
          Create account
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
        {mode === "register" && (
          <input
            placeholder="Full name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          required
        />

        <input
          type="password"
          placeholder="Password (min 8 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
        />

        <button type="submit">{primaryButtonText}</button>
      </form>

      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </main>
  );
}
