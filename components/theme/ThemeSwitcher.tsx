"use client";
import { useEffect, useRef, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import styles from "./ThemeSwitcher.module.css";
type Theme = "light" | "dark" | "system";
const key = "jktl-site-theme";
export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("system");
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      let choice: Theme = "system";
      try {
        const saved = localStorage.getItem(key);
        if (saved === "light" || saved === "dark") choice = saved;
      } catch {
        /* Device preference still works without storage. */
      }
      setTheme(choice);
      document.documentElement.dataset.theme =
        choice === "system" ? (media.matches ? "dark" : "light") : choice;
    };
    sync();
    media.addEventListener("change", sync);
    window.addEventListener("storage", sync);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
  return (
    <div
      className={styles.root}
      ref={root}
      onBlur={(e) => {
        if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget))
          setOpen(false);
      }}
    >
      <button
        ref={trigger}
        type="button"
        className={styles.trigger}
        aria-label={`Color theme: ${theme}`}
        aria-expanded={open}
        aria-controls="site-theme-options"
        onClick={() => setOpen(!open)}
      >
        <Icon size={17} aria-hidden="true" />
      </button>
      {open && (
        <div
          id="site-theme-options"
          className={styles.options}
          role="group"
          aria-label="Color theme"
        >
          {(["light", "dark", "system"] as const).map((choice) => {
            const OptionIcon =
              choice === "light" ? Sun : choice === "dark" ? Moon : Monitor;
            return (
              <button
                type="button"
                key={choice}
                aria-pressed={theme === choice}
                onClick={() => {
                  setTheme(choice);
                  document.documentElement.dataset.theme =
                    choice === "system"
                      ? matchMedia("(prefers-color-scheme: dark)").matches
                        ? "dark"
                        : "light"
                      : choice;
                  try {
                    localStorage.setItem(key, choice);
                  } catch {
                    /* Apply for this visit even when storage is unavailable. */
                  }
                  setOpen(false);
                  trigger.current?.focus();
                }}
              >
                <OptionIcon size={16} aria-hidden="true" />
                {choice === "system"
                  ? "Use device setting"
                  : choice === "dark"
                    ? "Dark"
                    : "Light"}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
