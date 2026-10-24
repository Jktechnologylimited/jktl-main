"use client";
import { T } from "@/components/i18n/LanguageProvider";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
} from "framer-motion";
import { Pause, Play } from "lucide-react";
import styles from "./PossibleShowcase.module.css";
const items = [
  {
    id: "med-spa",
    label: "Beauty with a point of view",
    category: "Med spas & wellness",
  },
  {
    id: "law-firm-editorial",
    label: "A confident first impression",
    category: "Law & professional services",
  },
  {
    id: "school",
    label: "A place for bright beginnings",
    category: "Schools & education",
  },
  {
    id: "music-label-afterdark",
    label: "Let your sound take the stage",
    category: "Music & creative businesses",
  },
  {
    id: "restaurant",
    label: "A table worth discovering",
    category: "Food & hospitality",
  },
  {
    id: "fashion",
    label: "A new home for your collection",
    category: "Fashion & retail",
  },
  {
    id: "consultancy-minimal",
    label: "Build on your next big idea",
    category: "Consulting & business",
  },
  {
    id: "church-community",
    label: "Bring your community closer",
    category: "Churches & communities",
  },
];
export function PossibleShowcase() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false),
    [hovered, setHovered] = useState(false),
    [focused, setFocused] = useState(false);
  const moving = !reduced && !paused && !hovered && !focused;
  const progress = useMotionValue(0);
  const x = useTransform(progress, (value) => `${value}%`);
  useAnimationFrame((_time, delta) => {
    if (moving) {
      const next = progress.get() - Math.min(delta, 64) / 1400;
      progress.set(next <= -50 ? next + 50 : next);
    }
  });
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <div>
          <p>
            <T>A LITTLE INSPIRATION. A LOT OF POSSIBILITY.</T>
          </p>
          <h2>
            <T>See what’s possible.</T>
          </h2>
          <span>
            <T>
              Big ideas deserve a beautiful place online. Find the design that
              feels like you.
            </T>
          </span>
        </div>
        <button
          type="button"
          aria-label={paused ? "Play template motion" : "Pause template motion"}
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}
          <span>{paused ? "Play" : "Pause"}</span>
        </button>
      </div>
      <div
        className={styles.window}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
        }}
      >
        <motion.div className={styles.track} style={{ x }}>
          {[0, 1].map((copy) => (
            <div
              className={styles.set}
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {items.map((item) => (
                <Link
                  href={`/templates/${item.id}`}
                  key={item.id}
                  className={styles.card}
                  tabIndex={copy === 1 ? -1 : 0}
                >
                  <div>
                    <Image
                      src={`/template-previews/${item.id}.jpg`}
                      alt={
                        copy === 1
                          ? ""
                          : `$<T>{item.category}</T> website design`
                      }
                      width={500}
                      height={338}
                      sizes="(max-width: 600px) 80vw, 400px"
                    />
                  </div>
                  <p>
                    <T>{item.category}</T>
                  </p>
                  <h3>
                    <T>{item.label}</T>
                  </h3>
                  <span>
                    <T>View design ↗</T>
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
      <Link className={styles.browse} href="/templates">
        <T>Explore all website designs →</T>
      </Link>
    </section>
  );
}
