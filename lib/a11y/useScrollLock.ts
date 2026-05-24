"use client";

import { useEffect } from "react";

let _locks = 0;
let _restore: { overflow: string; paddingRight: string } | null = null;

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active || typeof document === "undefined") return;

    if (_locks === 0) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      _restore = {
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight,
      };
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }
    _locks++;

    return () => {
      _locks = Math.max(0, _locks - 1);
      if (_locks === 0 && _restore) {
        document.body.style.overflow = _restore.overflow;
        document.body.style.paddingRight = _restore.paddingRight;
        _restore = null;
      }
    };
  }, [active]);
}
