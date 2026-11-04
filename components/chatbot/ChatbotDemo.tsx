"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Bot, MessageCircle, RotateCcw, Send } from "lucide-react";
import { T } from "@/components/i18n/LanguageProvider";
import styles from "./ChatbotLanding.module.css";

type Message = { id: number; role: "assistant" | "visitor"; text: string };
const welcome: Message = {
  id: 0,
  role: "assistant",
  text: "Hello! I’m Mika, your JKTL Chatbot demo. Ask me about getting started, website installation or appointment requests.",
};
const suggestions = [
  "Is it free?",
  "Can I use it on WordPress?",
  "Can it take bookings?",
];
function answer(question: string) {
  const q = question.toLowerCase();
  if (/\b(human|person|team|support|whatsapp|contact)\b/.test(q))
    return "Your own chatbot can offer WhatsApp handoff and collect follow-up requests. This demo does not contact anyone. Use Contact JKTL below if you would like to speak with our team.";
  if (/\b(appointment|appointments|booking|bookings|book|schedule)\b/.test(q))
    return "Eligible paid plans can collect appointment requests for your services. They enter your existing booking workflow awaiting business confirmation. This demo does not create a booking.";
  if (
    /\b(wordpress|embed|install|installation|external|domain|website|websites)\b/.test(
      q,
    )
  )
    return "Yes — enable it on your published JKTL website, or verify your external website’s exact hostname and add the installation script. WordPress and independent websites are supported. You can also share a standalone chat link.";
  if (/\b(free|price|pricing|cost|paid|plan|plans|subscription)\b/.test(q))
    return "Start with a free JKTL Business account. Higher allowances and advanced features use your existing Business plan; there is no separate chatbot subscription. Your dashboard shows your current limits.";
  if (/\b(ai|generate|generated|live)\b/.test(q))
    return "This interactive demo uses predefined FAQ replies, not generated AI answers. Approved FAQs and contact requests work now; AI-generated replies await activation by JKTL.";
  if (/\b(start|signup|sign up|account|create|setup|set up)\b/.test(q))
    return "Choose Start for free on this page. In JKTL Business, open More → AI Chatbot, name your assistant, add approved FAQs and configure your contact options. Then connect your website or share the public chat link.";
  if (
    /\b(knowledge|faq|faqs|answer|answers|train|training|information)\b/.test(q)
  )
    return "Add your approved FAQs, business information, services and policies in JKTL Business. Your chatbot uses those facts and should offer a human follow-up when information is missing.";
  if (/\b(hello|hi|hey)\b/.test(q))
    return "Hello! Try one of the questions below, or ask about free access, installation or bookings.";
  return "I only have predefined JKTL Chatbot FAQs in this demo. Try asking about free access, WordPress installation or appointment requests. For a different question, use Contact JKTL below.";
}
export function ChatbotDemo() {
  const [messages, setMessages] = useState<Message[]>([welcome]),
    [input, setInput] = useState(""),
    [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null),
    locked = useRef(false),
    log = useRef<HTMLDivElement>(null),
    field = useRef<HTMLInputElement>(null),
    id = useId();
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [messages, busy]);
  const sequence = useRef(1);
  function ask(value: string) {
    const question = value.trim().slice(0, 240);
    if (!question || locked.current) return;
    locked.current = true;
    setBusy(true);
    setInput("");
    const visitor: Message = {
      id: sequence.current++,
      role: "visitor",
      text: question,
    };
    setMessages((current) => [...current, visitor].slice(-14));
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 450;
    timer.current = setTimeout(() => {
      const reply: Message = {
        id: sequence.current++,
        role: "assistant",
        text: answer(question),
      };
      setMessages((current) => [...current, reply].slice(-14));
      setBusy(false);
      locked.current = false;
      timer.current = null;
    }, delay);
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    ask(input);
  }
  function restart() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    locked.current = false;
    setBusy(false);
    sequence.current = 1;
    setMessages([welcome]);
    setInput("");
    field.current?.focus();
  }
  return (
    <aside
      className={`${styles.preview} ${styles.demo}`}
      aria-label="Interactive chatbot demo"
    >
      <div className={styles.previewHeader}>
        <span className={styles.avatar}>
          <Bot aria-hidden="true" />
        </span>
        <div>
          <strong>Mika</strong>
          <p>
            <T>Interactive demo · predefined FAQ replies</T>
          </p>
        </div>
        <button
          type="button"
          className={styles.restart}
          onClick={restart}
          aria-label="Restart demo"
          title="Restart demo"
        >
          <RotateCcw size={19} aria-hidden="true" />
        </button>
      </div>
      <div
        className={`${styles.messages} ${styles.demoLog}`}
        ref={log}
        role="log"
        aria-label="Demo conversation"
        aria-live="polite"
        aria-relevant="additions"
        aria-busy={busy}
        tabIndex={0}
      >
        {messages.map((message) => (
          <p
            key={message.id}
            className={
              message.role === "assistant" ? styles.assistant : styles.visitor
            }
          >
            {message.role === "visitor" ? message.text : <T>{message.text}</T>}
          </p>
        ))}
        {busy && (
          <p className={`${styles.assistant} ${styles.typing}`}>
            <T>Mika is typing…</T>
          </p>
        )}
      </div>
      <div className={styles.suggestions} aria-label="Suggested demo questions">
        {suggestions.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => ask(question)}
            disabled={busy}
          >
            <T>{question}</T>
          </button>
        ))}
      </div>
      <form className={styles.demoForm} onSubmit={submit}>
        <label className={styles.srOnly} htmlFor={id}>
          Ask the demo a question
        </label>
        <input
          id={id}
          ref={field}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about the chatbot…"
          maxLength={240}
          autoComplete="off"
          aria-describedby={`${id}-notice`}
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          aria-label="Send demo message"
        >
          <Send size={18} aria-hidden="true" />
        </button>
      </form>
      <div className={styles.demoLinks}>
        <button
          type="button"
          className={styles.contact}
          onClick={() => ask("Talk to a human")}
          disabled={busy}
        >
          <MessageCircle size={16} aria-hidden="true" />
          <T>Try human handoff</T>
        </button>
        <Link href="/contact">
          <T>Contact JKTL</T> →
        </Link>
      </div>
      <p id={`${id}-notice`} className={styles.previewCaption}>
        <T>
          Demo only. Messages stay in this page and are not sent or saved. Don’t
          share private information.
        </T>
      </p>
    </aside>
  );
}
