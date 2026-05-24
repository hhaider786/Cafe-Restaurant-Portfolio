"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { useCoarsePointer, useReducedMotion } from "./useReducedMotion";

type Props = {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
  perspective?: number;
  scale?: number;
};

export function Tilt3D({
  children,
  className,
  max = 12,
  glare = true,
  perspective = 1000,
  scale = 1.02,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 220, damping: 22, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 220, damping: 22, mass: 0.4 });

  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const transform = useMotionTemplate`perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
  const restTransform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;

  const glareX = useTransform(sx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(sy, [0, 1], ["0%", "100%"]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.18), transparent 50%)`;

  const disabled = reduced || coarse;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transform: disabled ? restTransform : transform,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
      {glare && !disabled && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareBg, mixBlendMode: "overlay" }}
        />
      )}
    </motion.div>
  );
}
