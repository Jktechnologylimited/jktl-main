"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
export function MotionCaseStudy({
  children,
  className,
  floating = false,
  index = 0,
}: {
  children: ReactNode;
  className: string;
  floating?: boolean;
  index?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.article
      layout={!reduced}
      className={className}
      initial={false}
      whileInView={!reduced && floating ? { y: [0, -5, 0] } : { y: 0 }}
      whileHover={!reduced ? { scale: 1.012, y: -7, transition:{duration:.2,repeat:0} } : undefined}
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
              scale: { duration: 0.2 },
            }
          : { duration: 0.25 }
      }
      viewport={{ amount: 0.2 }}
    >
      {children}
    </motion.article>
  );
}
