import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[#12100a]">
      <span className="section-eyebrow mb-3">Error 404</span>
      <span className="amber-line mx-auto w-20 block mb-6" aria-hidden />
      <h1
        className="text-5xl md:text-7xl font-bold text-[#f5ead8] mb-6"
        style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
      >
        Lost in the cellar
      </h1>
      <p className="text-[#a09070] max-w-md mb-10">
        That page isn&rsquo;t on the menu. Let&rsquo;s get you back to the table.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/" className="shimmer-amber px-8 py-3.5 text-[#12100a] text-xs tracking-[0.25em] uppercase font-bold">
          Back to home
        </Link>
        <Link href="/menu" className="px-8 py-3.5 text-xs tracking-[0.25em] uppercase border border-[#f5ead8]/30 text-[#f5ead8] hover:border-[#e8be63] hover:text-[#e8be63] transition-all">
          View the menu
        </Link>
      </div>
    </main>
  );
}
