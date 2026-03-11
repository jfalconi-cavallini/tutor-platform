"use client";

import { useState } from "react";

type Bundle = {
  id: "4" | "8" | "12";
  hours: number;
  price: number;
  label: string;
};

const BUNDLES: Bundle[] = [
  { id: "4", hours: 4, price: 280, label: "Best for getting started" },
  { id: "8", hours: 8, price: 520, label: "Most popular" },
  { id: "12", hours: 12, price: 720, label: "Best value" },
];

export default function BundlePicker() {
  const [selected, setSelected] = useState<Bundle | null>(null);
  const [message, setMessage] = useState("");

  const handlePurchase = async (bundle: Bundle) => {
    setSelected(bundle);
    setMessage("");

    const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hours: bundle.hours }),
    });

    const data = await res.json();

    if (!res.ok) {
        setMessage(data?.error || "Purchase failed");
        return;
    }

    setMessage(
        `✅ Purchase successful: +${bundle.hours} hours. You now have ${data.remainingHours} hours available.`
    );
  };

  return (
    <section>
      <div style={{ display: "grid", gap: 12 }}>
        {BUNDLES.map((b) => (
          <div
            key={b.id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>
                  {b.hours} hours
                </div>
                <div style={{ opacity: 0.9 }}>${b.price}</div>
                <div style={{ marginTop: 6, opacity: 0.8 }}>{b.label}</div>
              </div>

              <button type="button" onClick={() => handlePurchase(b)}>
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>

      {message && (
        <div
          style={{
            marginTop: 16,
            padding: 12,
            border: "1px solid #e5e7eb",
            borderRadius: 12,
          }}
        >
          {message}
          {selected && (
            <div style={{ marginTop: 10 }}>
              <a href="/dashboard">Go to Dashboard →</a>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
