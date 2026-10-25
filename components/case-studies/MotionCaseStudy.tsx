"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
export function MotionCaseStudy({
  children,
  className,
  floating = false,
  reveal = false,
  reverse = false,
  index = 0,
}: {
  children: ReactNode;
  className: string;
  floating?: boolean;
  reveal?: boolean;
  reverse?: boolean;
  index?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.article
      layout={!reduced}
      className={className}
      data-reverse={reverse || undefined}
      initial={false}
      whileInView={
        reveal && !reduced
          ? { x: [reverse ? 28 : -28, 0], y: [12, 0], opacity: [0.55, 1] }
          : !reduced && floating
            ? { y: [0, -5, 0] }
            : { x: 0, y: 0, opacity: 1 }
      }
      whileHover={
        !reduced
          ? { y: -4, transition: { duration: 0.2, repeat: 0 } }
          : undefined
      }
      transition={
        floating && !reduced
          ? {
              y: {
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.25,
              },
              layout: { duration: 0.3 },
            }
          : {
              duration: reduced ? 0 : 0.65,
              ease: [0.22, 1, 0.36, 1],
              layout: { duration: reduced ? 0 : 0.25 },
            }
      }
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.article>
  );
}
