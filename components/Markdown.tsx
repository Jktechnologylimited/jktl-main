import ReactMarkdown from "react-markdown";

// Renders markdown using the existing .prose-article styles.
export default function Markdown({ children }: { children: string }) {
  return (
    <div className="prose-article">
      <ReactMarkdown>{children || ""}</ReactMarkdown>
    </div>
  );
}
