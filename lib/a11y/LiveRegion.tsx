"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type Announce = (message: string, mode?: "polite" | "assertive") => void;
const Ctx = createContext<Announce>(() => {});

export function LiveRegionProvider({ children }: { children: ReactNode }) {
  const [polite, setPolite] = useState("");
  const [assertive, setAssertive] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const announce = useCallback<Announce>((message, mode = "polite") => {
    if (timer.current) clearTimeout(timer.current);
    if (mode === "assertive") {
      setAssertive("");
      requestAnimationFrame(() => setAssertive(message));
    } else {
      setPolite("");
      requestAnimationFrame(() => setPolite(message));
    }
    timer.current = setTimeout(() => {
      setPolite("");
      setAssertive("");
    }, 4000);
  }, []);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return (
    <Ctx.Provider value={announce}>
      {children}
      <div aria-live="polite" aria-atomic="true" className="sr-only">{polite}</div>
      <div aria-live="assertive" aria-atomic="true" className="sr-only">{assertive}</div>
    </Ctx.Provider>
  );
}

export function useAnnounce(): Announce {
  return useContext(Ctx);
}
