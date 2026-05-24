"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { useScroll, type MotionValue } from "framer-motion";

type Ctx = { progress: MotionValue<number> | null };
const ScrollSceneCtx = createContext<Ctx>({ progress: null });

type Props = {
  children: ReactNode;
  className?: string;
  height?: string;
  offset?: ["start start" | "start end" | "start center", "end start" | "end end" | "end center"];
};

export function ScrollScene({ children, className, height = "300vh", offset = ["start start", "end end"] }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });

  return (
    <ScrollSceneCtx.Provider value={{ progress: scrollYProgress }}>
      <div ref={ref} className={className} style={{ height, position: "relative" }}>
        {children}
      </div>
    </ScrollSceneCtx.Provider>
  );
}

export function ScrollScenePin({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={className}
      style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
    >
      {children}
    </div>
  );
}

export function useScrollProgress(): MotionValue<number> {
  const ctx = useContext(ScrollSceneCtx);
  if (!ctx.progress) {
    throw new Error("useScrollProgress must be used inside <ScrollScene>");
  }
  return ctx.progress;
}
