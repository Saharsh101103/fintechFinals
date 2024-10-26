// app/transaction/page.tsx
"use client";

import { useState } from "react";

export default function TransactionPage() {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [message, setMessage] = useState<string | null>(null);

  const submitTransaction = async () => {
    const res = await fetch("/api/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, amount, currency }),
    });

    const data = await res.json();
    setMessage(data.success ? "Transaction Successful!" : data.message);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Transaction Form</h1>
      <input
        className="border p-2 mt-2 w-full"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="number"
        className="border p-2 mt-2 w-full"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
      />
      <input
        className="border p-2 mt-2 w-full"
        placeholder="Currency"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      />
      <button
        className="bg-green-500 text-white p-2 mt-4"
        onClick={submitTransaction}
      >
        Submit
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
