// app/pricing/page.tsx
"use client";

import { useState } from "react";

export default function PricingPage() {
  const [region, setRegion] = useState("");
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState<string | null>(null);

  const submitPrice = async () => {
    const res = await fetch("/api/pricing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ region, price }),
    });

    const data = await res.json();
    setStatus(data.success ? "Price Submitted!" : "Submission Failed");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Pricing Form</h1>
      <input
        className="border p-2 mt-2 w-full"
        placeholder="Region"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      />
      <input
        type="number"
        className="border p-2 mt-2 w-full"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
      />
      <button
        className="bg-purple-500 text-white p-2 mt-4"
        onClick={submitPrice}
      >
        Submit
      </button>
      {status && <p className="mt-2">{status}</p>}
    </div>
  );
}
