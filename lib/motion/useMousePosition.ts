"use client";

import { useEffect } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";

const _x = { current: 0 };
const _y = { current: 0 };
let _frame = 0;
let _attached = false;
const _listeners = new Set<() => void>();

function ensureGlobalListener() {
  if (_attached || typeof window === "undefined") return;
  _attached = true;
  const onMove = (e: PointerEvent) => {
    _x.current = e.clientX;
    _y.current = e.clientY;
    if (_frame) return;
    _frame = requestAnimationFrame(() => {
      _frame = 0;
      _listeners.forEach((fn) => fn());
    });
  };
  window.addEventListener("pointermove", onMove, { passive: true });
}

export function useMousePosition(): { x: MotionValue<number>; y: MotionValue<number> } {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    ensureGlobalListener();
    const update = () => {
      x.set(_x.current);
      y.set(_y.current);
    };
    _listeners.add(update);
    return () => {
      _listeners.delete(update);
    };
  }, [x, y]);

  return { x, y };
}
