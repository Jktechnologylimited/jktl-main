import Link from "next/link";
import { ChatbotDemo } from "./ChatbotDemo";
import {
  Bot,
  MessageCircle,
  BookOpen,
  Globe,
  Users,
  CalendarClock,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { FeatureBadge } from "@/components/features/FeatureBadge";
import { T } from "@/components/i18n/LanguageProvider";
import styles from "./ChatbotLanding.module.css";

const signup = "https://business.jktl.com.ng/signup";
const dashboard = "https://business.jktl.com.ng/business/chatbot";
const features = [
  {
    icon: BookOpen,
    title: "Your knowledge. Your voice.",
    text: "Add approved FAQs, business information, services, opening hours and policies. Give your assistant a name, welcome message and tone that feel like your business.",
  },
  {
    icon: MessageCircle,
    title: "Enquiries worth following up.",
    text: "Collect visitor enquiries with consent and keep the conversation reference in your account. Let visitors reach your configured business number on WhatsApp.",
  },
  {
    icon: Globe,
    title: "A small widget. More ways to connect.",
    text: "Enable your assistant on a published JKTL website, install it on a verified external or Custom website, or share its standalone public chat link.",
  },
  {
    icon: CalendarClock,
    title: "Appointment requests, clearly handled.",
    text: "Eligible paid plans can collect service, contact and preferred date/time details. Requests enter your existing booking workflow, awaiting business confirmation.",
  },
  {
    icon: Users,
    title: "Keep the right people connected.",
    text: "Approved partners can help with your permission. Eligible higher plans add a team inbox and asynchronous business replies, with access scoped to your organization.",
  },
  {
    icon: Bot,
    title: "Know your allowance.",
    text: "See conversation history and usage in JKTL Business. Your plan sets chatbot, knowledge, AI response and retention limits; predefined FAQs do not consume AI response allowance.",
  },
];
const questions = [
  [
    "Is there a separate chatbot subscription?",
    "No. Start with a free JKTL Business account. Higher allowances and advanced features come through your existing JKTL Business plan. Your dashboard shows the limits that apply to your account.",
  ],
  [
    "Are AI-generated answers active now?",
    "Start today with approved FAQs, enquiry capture and configured contact options. AI-generated replies are not active yet; they become available after JKTL activates AI generation. FAQs and contact options remain available without generated answers.",
  ],
  [
    "Can I use it on a WordPress or independent website?",
    "Yes. Add the exact website hostname in Business, verify ownership using the provided DNS TXT record, and add the installation script. You can also share a standalone chat link without installing anything.",
  ],
  [
    "Is WhatsApp handoff the same as live chat?",
    "No. WhatsApp opens a separate conversation with your business. Human follow-up inside JKTL is asynchronous; the chatbot does not promise an immediately available agent.",
  ],
  [
    "Will appointment requests automatically confirm a booking?",
    "No. Eligible appointment requests await your business’s confirmation in the existing booking workflow.",
  ],
];
export function ChatbotLanding() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>
            JKTL AI CHATBOT <FeatureBadge slug="ai-chatbot" />
          </p>
          <h1>
            <T>Turn website visitors into conversations and customers.</T>
          </h1>
          <p className={styles.intro}>
            <T>
              Give your business an assistant that shares approved information,
              captures enquiries and helps visitors take the next step — all
              managed in JKTL Business.
            </T>
          </p>
          <div className={styles.links}>
            <a className="btn-gold" href={signup}>
              <T>Start for free</T>{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a className="btn-outline-navy" href={dashboard}>
              <T>Sign in to manage your chatbot</T>
            </a>
          </div>
          <p className={styles.small}>
            <T>Free to start. No separate chatbot subscription.</T>
          </p>
          <p className={styles.availability}>
            <T>
              Available now: approved FAQs, enquiries and contact options.
              AI-generated replies await activation by JKTL.
            </T>
          </p>
        </div>
        <ChatbotDemo />
      </section>
      <section className={styles.section} aria-labelledby="chatbot-features">
        <p className={styles.eyebrow}>
          <T>BUILT AROUND YOUR BUSINESS</T>
        </p>
        <h2 id="chatbot-features">
          <T>A helpful next step for every visitor.</T>
        </h2>
        <div className={styles.grid}>
          {features.map(({ icon: Icon, title, text }) => (
            <article key={title} className={styles.card}>
              <Icon size={25} aria-hidden="true" />
              <h3>
                <T>{title}</T>
              </h3>
              <p>
                <T>{text}</T>
              </p>
            </article>
          ))}
        </div>
      </section>
      <section
        className={`${styles.section} ${styles.steps}`}
        aria-labelledby="chatbot-setup"
      >
        <h2 id="chatbot-setup">
          <T>From your first FAQ to your website.</T>
        </h2>
        <ol className={styles.grid}>
          {[
            [
              "Create your free account",
              "In JKTL Business, open More → AI Chatbot. Name your assistant and choose its public chat slug.",
            ],
            [
              "Make it yours",
              "Add approved business knowledge, set your welcome message and configure enquiry capture and your WhatsApp number.",
            ],
            [
              "Connect and share",
              "Enable it on your JKTL website, verify and install on another website, or share your standalone chat link.",
            ],
          ].map(([title, text], index) => (
            <li key={title}>
              <span className={styles.number}>0{index + 1}</span>
              <h3>
                <T>{title}</T>
              </h3>
              <p>
                <T>{text}</T>
              </p>
            </li>
          ))}
        </ol>
      </section>
      <section
        className={`${styles.section} ${styles.plan}`}
        aria-labelledby="chatbot-plan"
      >
        <div>
          <p className={styles.eyebrow}>
            <T>ONE BUSINESS ACCOUNT</T>
          </p>
          <h2 id="chatbot-plan">
            <T>Start free. Grow with your existing plan.</T>
          </h2>
          <p>
            <T>
              Your Business dashboard shows your current monthly AI response
              allowance, knowledge limits and conversation retention. Eligible
              paid plans add appointment requests, while higher tiers provide
              team follow-up and more detailed analytics.
            </T>
          </p>
          <Link href="/pricing" className={styles.textLink}>
            <T>Compare existing JKTL Business plans</T> →
          </Link>
        </div>
        <ul>
          {[
            "No separate chatbot checkout",
            "No automatic AI overage charges",
            "One dashboard for your website and chatbot",
            "Permissions for your team and approved partners",
          ].map((item) => (
            <li key={item}>
              <Check size={18} aria-hidden="true" />
              <T>{item}</T>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.section} aria-labelledby="chatbot-questions">
        <h2 id="chatbot-questions">
          <T>A few things to know.</T>
        </h2>
        <div className={styles.faqs}>
          {questions.map(([question, answer]) => (
            <details key={question}>
              <summary>
                <T>{question}</T>
              </summary>
              <p>
                <T>{answer}</T>
              </p>
            </details>
          ))}
        </div>
      </section>
      <section className={`${styles.section} ${styles.final}`}>
        <h2>
          <T>Your next customer could start with a conversation.</T>
        </h2>
        <p>
          <T>
            Create your account, add your business knowledge and give visitors a
            clear way to reach you.
          </T>
        </p>
        <div className={styles.links}>
          <a href={signup} className="btn-gold">
            <T>Start for free</T> <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <Link href="/templates" className={styles.textLink}>
            <T>Explore website templates</T> →
          </Link>
        </div>
      </section>
    </div>
  );
}
