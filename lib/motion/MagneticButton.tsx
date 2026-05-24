"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCoarsePointer, useReducedMotion } from "./useReducedMotion";

type CommonProps = {
  children: ReactNode;
  className?: string;
  pull?: number;
  onClick?: () => void;
  "aria-label"?: string;
};

type ButtonProps = CommonProps & { as?: "button"; type?: "button" | "submit" | "reset"; href?: never };
type AnchorProps = CommonProps & { as: "a"; href: string; target?: string; rel?: string };
type DivProps = CommonProps & { as: "div" };

type Props = ButtonProps | AnchorProps | DivProps;

function useMagnetic(pull: number) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const disabled = reduced || coarse;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 16, mass: 0.4 });

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    x.set(dx * pull);
    y.set(dy * pull);
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, style: { x: sx, y: sy }, onPointerMove, onPointerLeave };
}

export function MagneticButton(props: Props) {
  const { children, className, pull = 12, onClick } = props;
  const ariaLabel = props["aria-label"];
  const m = useMagnetic(pull);

  if (props.as === "a") {
    return (
      <motion.a
        ref={m.ref as React.RefObject<HTMLAnchorElement>}
        href={props.href}
        target={props.target}
        rel={props.rel}
        className={className}
        style={m.style}
        onPointerMove={m.onPointerMove}
        onPointerLeave={m.onPointerLeave}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </motion.a>
    );
  }

  if (props.as === "div") {
    return (
      <motion.div
        ref={m.ref as React.RefObject<HTMLDivElement>}
        className={className}
        style={m.style}
        onPointerMove={m.onPointerMove}
        onPointerLeave={m.onPointerLeave}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.button
      ref={m.ref as React.RefObject<HTMLButtonElement>}
      type={props.type ?? "button"}
      className={className}
      style={m.style}
      onPointerMove={m.onPointerMove}
      onPointerLeave={m.onPointerLeave}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}
