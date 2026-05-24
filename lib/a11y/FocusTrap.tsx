"use client";

import { useEffect, useRef, type ReactNode } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

type Props = {
  children: ReactNode;
  active?: boolean;
  restoreFocus?: boolean;
  initialFocus?: "first" | "container";
  className?: string;
};

export function FocusTrap({ children, active = true, restoreFocus = true, initialFocus = "first", className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const root = containerRef.current;

    restoreRef.current = document.activeElement as HTMLElement | null;

    const getNodes = () =>
      Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => !el.hasAttribute("inert") && el.offsetParent !== null
      );

    const focusFirst = () => {
      const nodes = getNodes();
      if (initialFocus === "first" && nodes.length) nodes[0].focus();
      else root.focus();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const nodes = getNodes();
      if (!nodes.length) {
        e.preventDefault();
        root.focus();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    requestAnimationFrame(focusFirst);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      if (restoreFocus && restoreRef.current && document.body.contains(restoreRef.current)) {
        restoreRef.current.focus();
      }
    };
  }, [active, initialFocus, restoreFocus]);

  return (
    <div ref={containerRef} tabIndex={-1} className={className}>
      {children}
    </div>
  );
}
