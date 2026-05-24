"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "./useReducedMotion";

type Props = {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  splitBy?: "word" | "line";
  once?: boolean;
};

export function MaskedText({
  children,
  as = "span",
  className,
  delay = 0,
  stagger = 0.06,
  duration = 0.9,
  splitBy = "word",
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-15% 0px" });
  const reduced = useReducedMotion();

  const text = typeof children === "string" ? children : String(children);
  const parts = splitBy === "word" ? text.split(" ") : text.split("\n");
  const Tag = as as "span";

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={ref as React.RefObject<HTMLSpanElement>} className={className} aria-label={text}>
      {parts.map((p, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-top" style={{ marginRight: splitBy === "word" ? "0.25em" : 0 }}>
          <motion.span
            className="inline-block"
            initial={{ y: "120%" }}
            animate={inView ? { y: "0%" } : { y: "120%" }}
            transition={{
              duration,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * stagger,
            }}
            style={{ willChange: "transform" }}
          >
            {p === "" ? " " : p}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
