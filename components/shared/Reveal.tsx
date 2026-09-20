"use client";
import { motion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

// Shared, subtle "royal" motion language for the marketing site: a soft
// rise-and-fade as content enters the viewport, plus a gentle spring so
// nothing feels mechanical. Kept as one place to tune the whole site's feel.

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function variantsFor(y: number, delay: number): Variants {
  return {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: EASE } },
  };
}

export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  style,
  as = "div",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "span";
  once?: boolean;
}) {
  const MotionTag = as === "span" ? motion.span : motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={variantsFor(y, delay)}
    >
      {children}
    </MotionTag>
  );
}

// Stagger container -- wrap a list of children (each ideally a <StaggerItem>)
// to have them cascade in one after another rather than all at once.
export function Stagger({
  children,
  className,
  style,
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  stagger?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, style, y = 18 }: { children: ReactNode; className?: string; style?: CSSProperties; y?: number }) {
  return (
    <motion.div className={className} style={style} variants={variantsFor(y, 0)}>
      {children}
    </motion.div>
  );
}

// A gentle hover/tap lift for cards, buttons and other tappable surfaces.
export function HoverLift({ children, className, style, scale = 1.015 }: { children: ReactNode; className?: string; style?: CSSProperties; scale?: number }) {
  return (
    <motion.div
      className={className}
      style={style}
      whileHover={{ y: -4, scale, transition: { duration: 0.25, ease: EASE } }}
      whileTap={{ scale: 0.985 }}
    >
      {children}
    </motion.div>
  );
}
