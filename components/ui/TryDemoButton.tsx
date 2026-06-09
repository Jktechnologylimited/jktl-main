import Link from "next/link";

interface Props {
  href: string;
  label?: string;
  variant?: "gold" | "outline" | "navy";
  style?: React.CSSProperties;
}

export default function TryDemoButton({
  href,
  label = "Try Live Demo",
  variant = "outline",
  style,
}: Props) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    fontWeight: 700,
    fontSize: "0.72rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    textDecoration: "none",
    padding: "10px 20px",
    borderRadius: "2px",
    transition: "all 0.15s",
    ...style,
  };

  const styles = {
    gold: { background: "var(--gold-400)", color: "var(--navy-900)", border: "none" },
    navy: { background: "var(--navy-900)", color: "var(--cream-50)", border: "none" },
    outline: { background: "transparent", color: "var(--navy-600)", border: "1px solid var(--navy-600)" },
  };

  return (
    <Link href={href} style={{ ...base, ...styles[variant] }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
      {label}
    </Link>
  );
}
