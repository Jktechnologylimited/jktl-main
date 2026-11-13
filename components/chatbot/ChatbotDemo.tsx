"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight,
  Bot,
  MessageCircle,
  RotateCcw,
  Send,
  Pause,
  Play,
  CheckCircle2,
} from "lucide-react";
import { T } from "@/components/i18n/LanguageProvider";
import styles from "./ChatbotLanding.module.css";

type Panel =
  "enquiry" | "booking" | "contact" | "install" | "start" | "pricing" | null;
type Message = {
  id: number;
  role: "assistant" | "visitor";
  text: string;
  action?: Panel;
};
type Details = {
  name: string;
  email: string;
  enquiry: string;
  service: string;
  date: string;
  time: string;
};
const empty: Details = {
  name: "",
  email: "",
  enquiry: "",
  service: "Website consultation",
  date: "",
  time: "10:00",
};
const welcome: Message = {
  id: 0,
  role: "assistant",
  text: "Hello! I’m Mika. Watch me answer a question, capture an enquiry and collect an appointment request — or jump in and try it yourself.",
};
const suggestions = [
  "Is it free?",
  "Capture an enquiry",
  "Request an appointment",
];
function answer(question: string): { text: string; action?: Panel } {
  const q = question.toLowerCase();
  if (/\b(appointment|appointments|booking|bookings|book|schedule)\b/.test(q))
    return {
      text: "Let’s collect your preferred service, date and time. Try the appointment form below. This is a demo request, awaiting confirmation — not a confirmed booking.",
      action: "booking",
    };
  if (
    /\b(enquiry|enquiries|inquiry|lead|leads|callback)\b|contact me|call me|leave a message/.test(
      q,
    )
  )
    return {
      text: "Of course. Leave a name and enquiry in the form below. I’ll show how a business receives the details, without sending anything from this demo.",
      action: "enquiry",
    };
  if (/\b(human|person|team|support|whatsapp|contact)\b/.test(q))
    return {
      text: "You can continue with the JKTL team using the WhatsApp or contact-page links below. Opening a link starts a separate conversation; this demo does not send a message for you.",
      action: "contact",
    };
  if (/\b(free|price|pricing|cost|paid|plan|plans|subscription)\b/.test(q))
    return {
      text: "Start with a free JKTL Business account. Higher allowances and advanced features use your existing Business plan. There is no separate chatbot subscription.",
      action: "pricing",
    };
  if (
    /\b(wordpress|embed|install|installation|external|domain|website|websites)\b/.test(
      q,
    )
  )
    return {
      text: "Yes — it works on published JKTL websites and verified external websites, including WordPress. Here are the installation steps.",
      action: "install",
    };
  if (/\b(start|signup|sign up|account|create|setup|set up)\b/.test(q))
    return {
      text: "Create your free Business account, then open More → AI Chatbot. Name your assistant, add approved FAQs and configure contact options. Use the button below to begin.",
      action: "start",
    };
  if (/\b(ai|generate|generated|live)\b/.test(q))
    return {
      text: "This demonstration runs on predefined replies. Approved FAQs and contact requests work now; AI-generated replies await activation by JKTL.",
    };
  if (
    /\b(knowledge|faq|faqs|answer|answers|train|training|information)\b/.test(q)
  )
    return {
      text: "Your chatbot uses approved FAQs, business information, services and policies. It can answer those questions and offer a human handoff when information is missing.",
      action: "enquiry",
    };
  if (/\b(hello|hi|hey)\b/.test(q))
    return {
      text: "Hello! Ask about free access, installation, enquiries or appointments. You can also try one of the questions below.",
    };
  return {
    text: "I don’t have an approved answer for that in this demo. Would you like to leave an enquiry or speak with the JKTL team?",
    action: "contact",
  };
}
type Scene = {
  text?: string;
  role?: Message["role"];
  panel?: Panel;
  sample?: boolean;
  record?: "enquiry" | "booking";
  topic: string;
};
const scenes: Scene[] = [
  {
    role: "visitor",
    text: "Can it answer questions about my business?",
    topic: "Answer FAQs",
  },
  {
    role: "assistant",
    text: "Yes. Add your approved FAQs, services and policies. Your visitors get clear answers from the information you provide.",
    topic: "Answer FAQs",
  },
  {
    role: "visitor",
    text: "Can someone follow up with me?",
    topic: "Capture enquiries",
  },
  {
    role: "assistant",
    text: "Absolutely. Let’s collect an enquiry. Here is an example using fictional details.",
    panel: "enquiry",
    topic: "Capture enquiries",
  },
  { panel: "enquiry", sample: true, topic: "Capture enquiries" },
  { record: "enquiry", topic: "Capture enquiries" },
  {
    role: "visitor",
    text: "Can I request an appointment too?",
    topic: "Request appointments",
  },
  {
    role: "assistant",
    text: "Yes. Choose a service and preferred date and time. A real appointment request awaits business confirmation.",
    panel: "booking",
    topic: "Request appointments",
  },
  { panel: "booking", sample: true, topic: "Request appointments" },
  { record: "booking", topic: "Request appointments" },
  {
    role: "visitor",
    text: "I’d like to speak with a person.",
    topic: "Human handoff",
  },
  {
    role: "assistant",
    text: "Here are the real JKTL contact options. Choose WhatsApp or Contact JKTL to continue with the team.",
    panel: "contact",
    topic: "Human handoff",
  },
  {
    role: "assistant",
    text: "Ready to make your own assistant? Start for free with JKTL Business. This demonstration will replay shortly.",
    panel: "start",
    topic: "Start for free",
  },
];
const actionLabels: Record<Exclude<Panel, null>, string> = {
  enquiry: "Open enquiry form",
  booking: "Open appointment form",
  contact: "Show contact options",
  install: "Show installation steps",
  start: "Create my chatbot",
  pricing: "Explore plans",
};
export function ChatbotDemo({ whatsappHref }: { whatsappHref: string }) {
  const [messages, setMessages] = useState<Message[]>([welcome]),
    [input, setInput] = useState(""),
    [busy, setBusy] = useState(false),
    [playing, setPlaying] = useState(false),
    [step, setStep] = useState(0),
    [inView, setInView] = useState(false),
    [pageVisible, setPageVisible] = useState(true),
    [panel, setPanel] = useState<Panel>(null),
    [details, setDetails] = useState<Details>(empty),
    [receipt, setReceipt] = useState<{ kind: string; details: Details } | null>(
      null,
    );
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null),
    locked = useRef(false),
    sequence = useRef(1),
    container = useRef<HTMLElement>(null),
    log = useRef<HTMLDivElement>(null),
    field = useRef<HTMLInputElement>(null),
    id = useId();
  function append(role: Message["role"], text: string, action?: Panel) {
    const message: Message = { id: sequence.current++, role, text, action };
    setMessages((current) => [...current, message].slice(-14));
  }
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const initial = requestAnimationFrame(() => {
      setPlaying(!media.matches);
      setPageVisible(!document.hidden);
    });
    const visibility = () => setPageVisible(!document.hidden);
    const reduce = () => {
      if (media.matches) setPlaying(false);
    };
    document.addEventListener("visibilitychange", visibility);
    media.addEventListener("change", reduce);
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    if (container.current) observer.observe(container.current);
    return () => {
      cancelAnimationFrame(initial);
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      media.removeEventListener("change", reduce);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [messages, busy, panel, receipt]);
  useEffect(() => {
    if (!playing || !inView || !pageVisible) return;
    const next = setTimeout(
      () => {
        if (step === scenes.length) {
          sequence.current = 1;
          setMessages([welcome]);
          setPanel(null);
          setReceipt(null);
          setDetails(empty);
          setStep(0);
          return;
        }
        const scene = scenes[step];
        if (scene.role && scene.text)
          append(scene.role, scene.text, scene.panel);
        if (scene.panel) {
          setPanel(scene.panel);
          setReceipt(null);
          setDetails(empty);
        }
        if (scene.sample) {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          setDetails({
            ...empty,
            name: "Ada Example",
            email: "ada@example.test",
            enquiry: "I’d like help choosing a website for my business.",
            date: tomorrow.toISOString().slice(0, 10),
          });
        }
        if (scene.record) {
          setReceipt({ kind: scene.record, details: { ...details } });
          setPanel(null);
          append(
            "assistant",
            scene.record === "booking"
              ? "Demo appointment request captured. In a connected business account, it awaits the business’s confirmation."
              : "Demo enquiry captured. In a connected chatbot, it appears in that business’s enquiries inbox.",
          );
        }
        setStep((current) => current + 1);
      },
      step === scenes.length ? 3600 : step === 0 ? 1300 : 1900,
    );
    return () => clearTimeout(next);
  }, [playing, inView, pageVisible, step, details]);
  function stop() {
    setPlaying(false);
  }
  function open(next: Panel) {
    stop();
    setPanel(next);
    setReceipt(null);
    setDetails(empty);
  }
  function ask(value: string) {
    const question = value.trim().slice(0, 240);
    if (!question || locked.current) return;
    stop();
    locked.current = true;
    setBusy(true);
    setInput("");
    setPanel(null);
    setReceipt(null);
    append("visitor", question);
    timer.current = setTimeout(
      () => {
        const response = answer(question);
        append("assistant", response.text, response.action);
        if (response.action) {
          setPanel(response.action);
          setDetails(empty);
        }
        setBusy(false);
        locked.current = false;
        timer.current = null;
      },
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 450,
    );
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    ask(input);
  }
  function replay() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    locked.current = false;
    sequence.current = 1;
    setBusy(false);
    setMessages([welcome]);
    setInput("");
    setPanel(null);
    setReceipt(null);
    setDetails(empty);
    setStep(0);
    setPlaying(true);
  }
  function record(event: FormEvent) {
    event.preventDefault();
    stop();
    if (panel !== "enquiry" && panel !== "booking") return;
    const kind = panel;
    setReceipt({ kind, details: { ...details } });
    setPanel(null);
    append(
      "assistant",
      kind === "booking"
        ? "Your demo appointment request is captured below. Nothing has been booked or sent. A real request awaits business confirmation."
        : "Your demo enquiry is captured below. Nothing has been sent. A connected chatbot would show the enquiry in the business’s dashboard.",
    );
  }
  const autoTyping =
    playing && inView && pageVisible && scenes[step]?.role === "assistant";
  const update = (key: keyof Details, value: string) => {
    stop();
    setDetails((current) => ({ ...current, [key]: value }));
  };
  return (
    <aside
      ref={container}
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
            <T>Interactive demo · predefined replies</T>
          </p>
        </div>
      </div>
      <div className={styles.loopBar}>
        <span>
          <T>
            {playing
              ? scenes[Math.min(step, scenes.length - 1)].topic
              : "Your turn — try it"}
          </T>
        </span>
        <div>
          <button
            type="button"
            onClick={() => (playing ? stop() : replay())}
            aria-label={playing ? "Pause demo loop" : "Play demo loop"}
            title={playing ? "Pause demo loop" : "Play demo loop"}
          >
            {playing ? <Pause size={17} /> : <Play size={17} />}
          </button>
          <button
            type="button"
            onClick={replay}
            aria-label="Restart demo"
            title="Restart demo"
          >
            <RotateCcw size={17} />
          </button>
        </div>
      </div>
      <div
        className={styles.demoStage}
        ref={log}
        tabIndex={0}
        aria-label="Demo workspace"
        onPointerDown={stop}
        onWheel={stop}
        onFocusCapture={stop}
      >
        <div
          className={`${styles.messages} ${styles.demoLog}`}
          role="log"
          aria-label="Demo conversation"
          aria-live={playing ? "off" : "polite"}
          aria-relevant="additions"
          aria-busy={busy || autoTyping}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={
                message.role === "assistant" ? styles.assistant : styles.visitor
              }
            >
              <p>
                {message.role === "visitor" ? (
                  message.text
                ) : (
                  <T>{message.text}</T>
                )}
              </p>
              {message.action && (
                <button
                  type="button"
                  className={styles.bubbleAction}
                  onClick={() => open(message.action!)}
                >
                  <T>{actionLabels[message.action]}</T> →
                </button>
              )}
            </div>
          ))}
          {(busy || autoTyping) && (
            <p className={`${styles.assistant} ${styles.typing}`}>
              <T>Mika is typing…</T>
            </p>
          )}
        </div>
        {panel && (
          <section className={styles.demoPanel} aria-label="Demo action">
            {(panel === "enquiry" || panel === "booking") && (
              <form onSubmit={record} onFocusCapture={stop}>
                <h3>
                  <T>
                    {panel === "booking"
                      ? "Try an appointment request"
                      : "Try capturing an enquiry"}
                  </T>
                </h3>
                <p>
                  <T>Demo only — use fictional details.</T>
                </p>
                <label>
                  <T>Name</T>
                  <input
                    value={details.name}
                    onChange={(event) => update("name", event.target.value)}
                    required
                    maxLength={80}
                    placeholder="Ada Example"
                    autoComplete="off"
                  />
                </label>
                {panel === "enquiry" ? (
                  <>
                    <label>
                      <T>Email (optional)</T>
                      <input
                        type="email"
                        value={details.email}
                        onChange={(event) =>
                          update("email", event.target.value)
                        }
                        maxLength={120}
                        placeholder="ada@example.test"
                        autoComplete="off"
                      />
                    </label>
                    <label>
                      <T>Your enquiry</T>
                      <textarea
                        value={details.enquiry}
                        onChange={(event) =>
                          update("enquiry", event.target.value)
                        }
                        required
                        maxLength={300}
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <label>
                      <T>Service</T>
                      <select
                        value={details.service}
                        onChange={(event) =>
                          update("service", event.target.value)
                        }
                      >
                        <option>Website consultation</option>
                        <option>Business setup consultation</option>
                      </select>
                    </label>
                    <div className={styles.demoDates}>
                      <label>
                        <T>Preferred date</T>
                        <input
                          type="date"
                          value={details.date}
                          onChange={(event) =>
                            update("date", event.target.value)
                          }
                          required
                        />
                      </label>
                      <label>
                        <T>Preferred time</T>
                        <input
                          type="time"
                          value={details.time}
                          onChange={(event) =>
                            update("time", event.target.value)
                          }
                          required
                        />
                      </label>
                    </div>
                  </>
                )}
                <button type="submit">
                  <T>
                    {panel === "booking"
                      ? "Capture demo appointment"
                      : "Capture demo enquiry"}
                  </T>
                </button>
              </form>
            )}
            {panel === "contact" && (
              <>
                <h3>
                  <T>Continue with the JKTL team</T>
                </h3>
                <p>
                  <T>
                    These links open real contact options. This demo does not
                    send a message automatically.
                  </T>
                </p>
                <div className={styles.actionLinks}>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={15} />
                    <T>Open JKTL WhatsApp</T> <ArrowUpRight size={16} className="inline-block align-middle" aria-hidden="true" />
                  </a>
                  <Link href="/contact">
                    <T>Contact JKTL</T> →
                  </Link>
                </div>
              </>
            )}
            {panel === "install" && (
              <>
                <h3>
                  <T>Connect your website</T>
                </h3>
                <ol>
                  <li>
                    <T>In Business, open More → AI Chatbot.</T>
                  </li>
                  <li>
                    <T>
                      Enable it on your JKTL website, or add your external
                      hostname and verify the DNS TXT record.
                    </T>
                  </li>
                  <li>
                    <T>
                      Copy the installation script to your external website, or
                      share your public chat link.
                    </T>
                  </li>
                </ol>
                <a href="https://business.jktl.com.ng/business/chatbot">
                  <T>Open chatbot setup</T> →
                </a>
              </>
            )}
            {(panel === "start" || panel === "pricing") && (
              <>
                <h3>
                  <T>Make your own assistant</T>
                </h3>
                <div className={styles.actionLinks}>
                  <a href="https://business.jktl.com.ng/signup">
                    <T>Start for free</T> →
                  </a>
                  <Link href="/pricing">
                    <T>Compare Business plans</T> →
                  </Link>
                </div>
              </>
            )}
          </section>
        )}
        {receipt && (
          <section className={styles.demoReceipt} aria-label="Demo result">
            <CheckCircle2 size={20} aria-hidden="true" />
            <div>
              <h3>
                <T>
                  {receipt.kind === "booking"
                    ? "Demo appointment request captured"
                    : "Demo enquiry captured"}
                </T>
              </h3>
              <p>{receipt.details.name}</p>
              <p>
                {receipt.kind === "booking"
                  ? `${receipt.details.service} · ${receipt.details.date} · ${receipt.details.time}`
                  : receipt.details.enquiry}
              </p>
              <small>
                <T>
                  {receipt.kind === "booking"
                    ? "Example only. Awaiting confirmation; no real booking created."
                    : "Example only. This enquiry has not been sent or saved."}
                </T>
              </small>
            </div>
          </section>
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
          onFocus={stop}
          onChange={(event) => {
            stop();
            setInput(event.target.value);
          }}
          placeholder="Ask or try an action…"
          maxLength={240}
          autoComplete="off"
          aria-describedby={`${id}-notice`}
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          aria-label="Send demo message"
        >
          <Send size={18} />
        </button>
      </form>
      <div className={styles.demoLinks}>
        <button
          type="button"
          className={styles.contact}
          onClick={() => ask("Talk to a human")}
          disabled={busy}
        >
          <MessageCircle size={16} />
          <T>Try human handoff</T>
        </button>
        <Link href="/contact">
          <T>Contact JKTL</T> →
        </Link>
      </div>
      <p id={`${id}-notice`} className={styles.previewCaption}>
        <T>
          Demonstration only. Sample details and messages stay in this page. No
          enquiries or appointments are sent. Don’t share private information.
        </T>
      </p>
    </aside>
  );
}
