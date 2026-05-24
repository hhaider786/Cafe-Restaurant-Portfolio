"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <main id="main" className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[#12100a]">
      <span className="section-eyebrow mb-3" style={{ color: "#f87171" }}>Something burned in the kitchen</span>
      <h1
        className="text-4xl md:text-6xl font-bold text-[#f5ead8] mt-4 mb-6"
        style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
      >
        We hit a snag.
      </h1>
      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={reset} className="shimmer-amber px-8 py-3.5 text-[#12100a] text-xs tracking-[0.25em] uppercase font-bold">
          Try again
        </button>
        <Link href="/" className="px-8 py-3.5 text-xs tracking-[0.25em] uppercase border border-[#f5ead8]/30 text-[#f5ead8] hover:border-[#e8be63] hover:text-[#e8be63] transition-all">
          Back to home
        </Link>
      </div>
    </main>
  );
}
