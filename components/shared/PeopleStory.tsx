"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./PeopleStory.module.css";
const photos = {
  entrepreneur: {
    id: "photo-1573496359142-b8d87734a5a2",
    alt: "A smiling professional woman in a bright workplace",
  },
  community: {
    id: "photo-1522071820081-009f0129c71c",
    alt: "A diverse group of colleagues sharing ideas around a table",
  },
  creator: {
    id: "photo-1531123897727-8f129e1688ce",
    alt: "A woman smiling with confidence outdoors",
  },
  founder: {
    id: "photo-1500648767791-00dcc994a43e",
    alt: "A relaxed, smiling man outdoors",
  },
};
export function PeoplePhoto({
  photo = "entrepreneur",
  className,
}: {
  photo?: keyof typeof photos;
  className?: string;
}) {
  const [failed, setFailed] = useState(false),
    p = photos[photo];
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    let active = true;
    imageRef.current?.decode().catch(() => {
      if (active) setFailed(true);
    });
    return () => {
      active = false;
    };
  }, []);
  return (
    <img
      ref={imageRef}
      className={className}
      src={
        failed
          ? "/brand/entrepreneur-studio.png"
          : `https://images.unsplash.com/${p.id}?auto=format&fit=crop&w=1000&q=85`
      }
      alt={failed ? "A smiling entrepreneur working in a bright studio" : p.alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
const copy = {
  business: {
    eyebrow: "BUILT AROUND PEOPLE",
    title: "Big ambitions start with you.",
    text: "Your ideas, your customers, your next chapter. Build an online presence that feels like your business.",
    photos: ["entrepreneur", "community", "creator"],
  },
  partners: {
    eyebrow: "GROW TOGETHER",
    title: "Good relationships build great businesses.",
    text: "Support the people who trust you, with tools that help their businesses take the next step.",
    photos: ["community", "entrepreneur", "founder"],
  },
  stories: {
    eyebrow: "PEOPLE. IDEAS. POSSIBILITIES.",
    title: "A little inspiration goes a long way.",
    text: "Make room for fresh perspectives, useful lessons and the stories behind the next big idea.",
    photos: ["creator", "community", "entrepreneur"],
  },
  team: {
    eyebrow: "A MORE HUMAN WAY TO BUILD",
    title: "Bring your whole ambition.",
    text: "Every business begins with a person and an idea. We build tools to help those ideas find their place online.",
    photos: ["community", "creator", "founder"],
  },
};
export function PeopleStory({
  variant = "business",
  compact = false,
}: {
  variant?: keyof typeof copy;
  compact?: boolean;
}) {
  const c = copy[variant],
    reduced = useReducedMotion();
  return (
    <section
      className={`${styles.section} ${compact ? styles.compact : ""}`}
      aria-label={c.title}
    >
      <div className={styles.copy}>
        <p>{c.eyebrow}</p>
        <h2>{c.title}</h2>
        <p>{c.text}</p>
      </div>
      <div className={styles.collage}>
        {c.photos.map((photo, i) => (
          <motion.figure
            key={photo}
            initial={reduced ? false : { opacity: 0, y: i % 2 ? 22 : -22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <PeoplePhoto photo={photo as keyof typeof photos} />
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
