"use client";
import { useState, type FormEvent } from "react";
import styles from "./TemplateSupportRequest.module.css";
export function TemplateSupportRequest({
  pathname,
  question,
  messages,
}: {
  pathname: string;
  question: string;
  messages: { from: "bot" | "user"; text: string }[];
}) {
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [issue, setIssue] = useState(question),
    [includeChat, setIncludeChat] = useState(true),
    [status, setStatus] = useState(""),
    [sending, setSending] = useState(false),
    [sent, setSent] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending || sent) return;
    setSending(true);
    setStatus("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "template-support",
          name,
          email,
          challenge: issue,
          page: pathname,
          chat: includeChat ? messages.slice(-10) : [],
        }),
      });
      if (!response.ok) throw new Error("request failed");
      const result = await response.json();
      setSent(true);
      setStatus(
        result.notified
          ? "Your request was saved and sent to the JKTL team for follow-up by email."
          : "Your request was saved. For direct help, contact the JKTL team using WhatsApp below or email info@jktl.com.ng.",
      );
    } catch {
      setStatus(
        "Your request could not be saved. Please try again, email info@jktl.com.ng, or use WhatsApp below.",
      );
    } finally {
      setSending(false);
    }
  }
  return (
    <form
      className={styles.form}
      onSubmit={submit}
      aria-label="Request human template support"
    >
      <h3>Get help from the JKTL team</h3>
      <p>Tell us where you’re stuck. We’ll use your email to follow up.</p>
      {!sent && (
        <>
          <label>
            Your name
            <input
              required
              autoComplete="name"
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Email address
            <input
              required
              type="email"
              autoComplete="email"
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            What do you need help with?
            <textarea
              aria-label="What do you need help with?"
              required
              minLength={5}
              maxLength={1500}
              rows={3}
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />
          </label>
          <label className={styles.consent}>
            <input
              type="checkbox"
              checked={includeChat}
              onChange={(e) => setIncludeChat(e.target.checked)}
            />
            Include the last 10 chat messages for context.
          </label>
          <p>
            Do not include passwords, verification codes or payment-card
            details.
          </p>
          <button type="submit" disabled={sending}>
            {sending ? "Sending…" : "Send support request"}
          </button>
        </>
      )}
      {status && <p role="status">{status}</p>}
    </form>
  );
}
