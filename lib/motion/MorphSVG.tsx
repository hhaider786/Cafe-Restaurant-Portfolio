"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "./useReducedMotion";

type Props = {
  paths: string[];
  duration?: number;
  className?: string;
  viewBox?: string;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
};

export function MorphSVG({
  paths,
  duration = 4,
  className,
  viewBox = "0 0 100 100",
  stroke = "currentColor",
  fill = "none",
  strokeWidth = 1.5,
}: Props) {
  const reduced = useReducedMotion();

  return (
    <svg viewBox={viewBox} className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d={paths[0]}
        stroke={stroke}
        fill={fill}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={reduced ? { d: paths[0] } : { d: paths }}
        transition={reduced ? undefined : { duration, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />
    </svg>
  );
}
