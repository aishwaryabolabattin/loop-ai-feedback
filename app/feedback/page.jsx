"use client";

import { useEffect, useState } from "react";

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState([]);

  const [form, setForm] = useState({
    message: "",
    sentiment: "",
    status: "",
    theme: "",
    channel: "",
  });

  const loadFeedback = async () => {
    const res = await fetch("/api/feedback");
    const data = await res.json();
    setFeedback(data);
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setForm({
      message: "",
      sentiment: "",
      status: "",
      theme: "",
      channel: "",
    });

    loadFeedback();
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Customer Feedback</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <br />
        <br />

        <input
          placeholder="Sentiment"
          value={form.sentiment}
          onChange={(e) => setForm({ ...form, sentiment: e.target.value })}
        />

        <br />
        <br />

        <input
          placeholder="Status"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        />

        <br />
        <br />

        <input
          placeholder="Theme"
          value={form.theme}
          onChange={(e) => setForm({ ...form, theme: e.target.value })}
        />

        <br />
        <br />

        <input
          placeholder="Channel"
          value={form.channel}
          onChange={(e) => setForm({ ...form, channel: e.target.value })}
        />

        <br />
        <br />

        <button type="submit">Add Feedback</button>
      </form>

      <hr />

      <h2>Feedback List</h2>

      {feedback.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid gray",
            marginBottom: 10,
            padding: 10,
          }}
        >
          <h4>{item.message}</h4>

          <p>Theme: {item.theme}</p>

          <p>Channel: {item.channel}</p>

          <p>Status: {item.status}</p>

          <p>Sentiment: {item.sentiment}</p>
        </div>
      ))}
    </div>
  );
}
