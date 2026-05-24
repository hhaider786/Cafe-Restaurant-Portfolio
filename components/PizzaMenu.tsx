"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── geometry ────────────────────────────────────────── */
const CX = 220, CY = 220;
const R_CRUST = 210;
const R_PIZZA = 186;
const R_INNER = 20;
const GAP = 1.4;

function toCart(r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function wedge(s: number, e: number, outer: number, inner: number, g = GAP) {
  const o1 = toCart(outer, s + g), o2 = toCart(outer, e - g);
  const i1 = toCart(inner, s + g), i2 = toCart(inner, e - g);
  const f = (n: number) => n.toFixed(1);
  return `M ${f(i1.x)} ${f(i1.y)} L ${f(o1.x)} ${f(o1.y)} A ${outer} ${outer} 0 0 1 ${f(o2.x)} ${f(o2.y)} L ${f(i2.x)} ${f(i2.y)} A ${inner} ${inner} 0 0 0 ${f(i1.x)} ${f(i1.y)} Z`;
}

/* position within slice: af=angle-fraction 0-1, rf=radius-fraction 0-1 */
function at(si: number, af: number, rf: number) {
  const deg = si * 45 + af * 45;
  const r = R_INNER + 10 + rf * (R_PIZZA - R_INNER - 20);
  const p = toCart(r, deg);
  return { x: +p.x.toFixed(1), y: +p.y.toFixed(1) };
}

/* ── topping primitives ───────────────────────────────── */

function Pepperoni({ x, y, r = 7.5 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle r={r} fill="#4E1008" />
      <circle r={r * 0.87} fill="#6E1610" />
      <circle r={r * 0.72} fill="#8C2018" />
      {/* fat/grease spots */}
      <circle cx={-r * 0.32} cy={-r * 0.38} r={1.1} fill="#A85848" opacity={0.85} />
      <circle cx={r * 0.38} cy={r * 0.22} r={0.9} fill="#904040" opacity={0.75} />
      <circle cx={r * 0.1} cy={-r * 0.5} r={0.7} fill="#884038" opacity={0.65} />
    </g>
  );
}

function Mushroom({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <ellipse rx={9} ry={5.5} fill="#4E3218" />
      <ellipse rx={7} ry={4} fill="#6E4A28" />
      <ellipse rx={4.5} ry={2.5} fill="#907040" opacity={0.75} />
      <line x1={-6} y1={1.5} x2={6} y2={1.5} stroke="#2E1C08" strokeWidth={0.7} opacity={0.45} />
      <line x1={-5} y1={-1} x2={5} y2={-1} stroke="#2E1C08" strokeWidth={0.5} opacity={0.35} />
    </g>
  );
}

function Basil({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <ellipse rx={8} ry={5} fill="#16380E" />
      <ellipse rx={5.5} ry={3.4} fill="#1E5016" />
      <line x1={0} y1={-4} x2={0} y2={4.5} stroke="#102808" strokeWidth={0.7} opacity={0.6} />
      <line x1={0} y1={-1} x2={4} y2={-2.5} stroke="#102808" strokeWidth={0.4} opacity={0.4} />
      <line x1={0} y1={1.5} x2={-3.5} y2={3} stroke="#102808" strokeWidth={0.4} opacity={0.4} />
    </g>
  );
}

function Mozz({ x, y, rx = 11, ry = 7, rot = 0 }: { x: number; y: number; rx?: number; ry?: number; rot?: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <ellipse rx={rx} ry={ry} fill="#EBE4CF" />
      <ellipse rx={rx - 3} ry={ry - 2} fill="#F5EFE0" opacity={0.65} />
      <ellipse rx={rx - 6} ry={ry - 4} fill="#FDF8F0" opacity={0.45} />
    </g>
  );
}

function Pepper({ x, y, color, rot = 0 }: { x: number; y: number; color: string; rot?: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <rect x={-9} y={-3.5} width={18} height={7} rx={2.5} fill={color} opacity={0.92} />
      <rect x={-7} y={-2} width={14} height={4} rx={1.5} fill={color} opacity={0.45} />
    </g>
  );
}

function Olive({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle r={5.5} fill="#140E08" />
      <circle r={3.8} fill="#1E1610" />
      <circle r={2} fill="#2A1E14" opacity={0.6} />
    </g>
  );
}

function Ham({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <rect x={-8} y={-5} width={16} height={10} rx={3.5} fill="#A05848" />
      <rect x={-6} y={-3.5} width={12} height={7} rx={2.5} fill="#BE7060" opacity={0.65} />
      <rect x={-3} y={-1.5} width={6} height={3} rx={1} fill="#D88878" opacity={0.4} />
    </g>
  );
}

function Pineapple({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <rect x={-7} y={-5} width={14} height={10} rx={3} fill="#B07C08" />
      <rect x={-5} y={-3.5} width={10} height={7} rx={2} fill="#D09A12" opacity={0.7} />
      <line x1={-4} y1={0} x2={4} y2={0} stroke="#8A5E06" strokeWidth={0.8} opacity={0.45} />
    </g>
  );
}

function Chicken({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <ellipse rx={8.5} ry={5.5} fill="#A87840" />
      <ellipse rx={6} ry={3.8} fill="#C0904E" opacity={0.7} />
      <ellipse rx={3} ry={2} fill="#D8A860" opacity={0.45} />
    </g>
  );
}

function Nduja({ x, y, r = 9 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle r={r} fill="#9C2408" opacity={0.9} />
      <circle r={r * 0.65} fill="#C03010" opacity={0.65} />
    </g>
  );
}

function Stracciatella({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <ellipse rx={6} ry={4} fill="#EDE8DC" opacity={0.92} />
      <ellipse rx={4} ry={2.5} fill="#F8F4EC" opacity={0.6} />
    </g>
  );
}

/* ── cheese base patches per slice (af, rf, rx, ry, rot) ─ */
type CP = [number, number, number, number, number];
const CHEESE_PATCHES: CP[][] = [
  /* 0 Margherita – sparse, sauce shows through */
  [[0.3, 0.5, 9, 6, 15], [0.7, 0.55, 8, 5, -20]],
  /* 1 Pepperoni – fuller melted layer */
  [[0.25, 0.38, 13, 8, 20], [0.6, 0.52, 11, 7, -15], [0.45, 0.74, 9, 6, 35]],
  /* 2 BBQ Chicken */
  [[0.3, 0.42, 12, 7, 10], [0.68, 0.6, 10, 6, -22], [0.5, 0.76, 8, 5, 30]],
  /* 3 Truffle Mushroom */
  [[0.22, 0.5, 11, 7, 15], [0.62, 0.42, 9, 6, -10], [0.45, 0.72, 10, 7, 25]],
  /* 4 Four Cheese – very full */
  [[0.22, 0.36, 14, 9, 5], [0.55, 0.52, 12, 8, -20], [0.35, 0.72, 11, 7, 15], [0.72, 0.65, 9, 6, 30]],
  /* 5 Veggie Supreme */
  [[0.28, 0.46, 10, 7, 10], [0.65, 0.55, 9, 6, -15], [0.47, 0.74, 8, 5, 20]],
  /* 6 Hawaiian */
  [[0.25, 0.42, 12, 8, -10], [0.65, 0.55, 10, 7, 20], [0.45, 0.72, 9, 6, 5]],
  /* 7 Spicy Nduja */
  [[0.3, 0.36, 11, 7, 15], [0.62, 0.52, 9, 6, -10], [0.5, 0.74, 8, 5, 25]],
];

/* ── per-slice toppings ────────────────────────────────── */
function sliceToppings(si: number) {
  const p = (af: number, rf: number) => at(si, af, rf);
  switch (si) {
    case 0: return [ // Margherita
      <Mozz key="m0" {...p(0.48, 0.28)} rx={12} ry={8} rot={10} />,
      <Mozz key="m1" {...p(0.22, 0.58)} rx={10} ry={7} rot={-18} />,
      <Mozz key="m2" {...p(0.73, 0.64)} rx={11} ry={7} rot={22} />,
      <Basil key="b0" {...p(0.38, 0.76)} rot={-22} />,
      <Basil key="b1" {...p(0.63, 0.44)} rot={32} />,
    ];
    case 1: return [ // Pepperoni
      <Pepperoni key="p0" {...p(0.33, 0.38)} r={8} />,
      <Pepperoni key="p1" {...p(0.64, 0.53)} r={7.5} />,
      <Pepperoni key="p2" {...p(0.48, 0.74)} r={7} />,
      <Pepperoni key="p3" {...p(0.22, 0.7)} r={6.5} />,
    ];
    case 2: return [ // BBQ Chicken
      <Chicken key="c0" {...p(0.3, 0.44)} rot={22} />,
      <Chicken key="c1" {...p(0.64, 0.58)} rot={-18} />,
      <Chicken key="c2" {...p(0.5, 0.75)} rot={38} />,
      /* BBQ-darkened patch */
      <g key="bbq" transform={`translate(${p(0.46, 0.5).x},${p(0.46, 0.5).y})`}>
        <ellipse rx={7} ry={4.5} fill="#3A1A08" opacity={0.5} />
      </g>,
    ];
    case 3: return [ // Truffle Mushroom
      <Mushroom key="m0" {...p(0.25, 0.44)} rot={32} />,
      <Mushroom key="m1" {...p(0.55, 0.38)} rot={-48} />,
      <Mushroom key="m2" {...p(0.42, 0.7)} rot={15} />,
      <Mushroom key="m3" {...p(0.7, 0.64)} rot={62} />,
      /* parmesan shreds */
      <Mozz key="par" {...p(0.5, 0.52)} rx={6} ry={2} rot={20} />,
    ];
    case 4: return [ // Four Cheese
      /* gorgonzola patch */
      <g key="gor" transform={`translate(${p(0.3, 0.4).x},${p(0.3, 0.4).y})`}>
        <ellipse rx={6} ry={4} fill="#545030" opacity={0.8} />
        <ellipse rx={3} ry={2} fill="#403C20" opacity={0.6} />
      </g>,
      /* ricotta blob */
      <g key="ric" transform={`translate(${p(0.64, 0.52).x},${p(0.64, 0.52).y})`}>
        <ellipse rx={8} ry={5} fill="#F0EDE0" opacity={0.85} />
        <ellipse rx={5} ry={3} fill="#F8F6EC" opacity={0.6} />
      </g>,
      /* parmesan */
      <g key="par" transform={`translate(${p(0.46, 0.7).x},${p(0.46, 0.7).y})`}>
        <ellipse rx={7} ry={4} fill="#D8B848" opacity={0.72} />
      </g>,
      <Mozz key="moz" {...p(0.5, 0.34)} rx={9} ry={6} rot={-22} />,
    ];
    case 5: return [ // Veggie Supreme
      <Pepper key="pp0" {...p(0.25, 0.5)} color="#7A1410" rot={32} />,
      <Pepper key="pp1" {...p(0.64, 0.5)} color="#16601A" rot={-22} />,
      <Pepper key="pp2" {...p(0.45, 0.72)} color="#A87808" rot={15} />,
      <Olive key="ol0" {...p(0.35, 0.38)} />,
      <Olive key="ol1" {...p(0.68, 0.64)} />,
      <Basil key="sp0" {...p(0.5, 0.54)} rot={48} />,
    ];
    case 6: return [ // Hawaiian
      <Ham key="h0" {...p(0.3, 0.5)} rot={22} />,
      <Ham key="h1" {...p(0.64, 0.56)} rot={-32} />,
      <Pineapple key="pi0" {...p(0.5, 0.34)} rot={12} />,
      <Pineapple key="pi1" {...p(0.22, 0.7)} rot={-18} />,
      <Pineapple key="pi2" {...p(0.73, 0.7)} rot={28} />,
    ];
    case 7: return [ // Spicy Nduja
      <Nduja key="nd0" {...p(0.34, 0.44)} r={10} />,
      <Nduja key="nd1" {...p(0.64, 0.6)} r={8} />,
      <Stracciatella key="st0" {...p(0.5, 0.34)} rot={15} />,
      <Stracciatella key="st1" {...p(0.22, 0.65)} rot={-22} />,
      <Stracciatella key="st2" {...p(0.73, 0.5)} rot={32} />,
    ];
    default: return [];
  }
}

/* ── slice metadata ────────────────────────────────────── */
interface Slice {
  name: string;
  price: number;
  ingredients: string[];
  badge?: string;
  emoji: string;
}
const SLICES: Slice[] = [
  { name: "Margherita",     price: 16, emoji: "🍅", ingredients: ["San Marzano tomato", "Fresh mozzarella", "Basil leaves", "Extra virgin olive oil"], badge: "V" },
  { name: "Pepperoni",      price: 18, emoji: "🍕", ingredients: ["Tomato sauce", "Premium pepperoni", "Mozzarella", "Dried oregano"] },
  { name: "BBQ Chicken",    price: 19, emoji: "🍗", ingredients: ["Smoky BBQ sauce", "Pulled chicken breast", "Red onion", "Smoked gouda"] },
  { name: "Truffle Mushroom", price: 22, emoji: "🍄", ingredients: ["White truffle oil", "Porcini mushrooms", "Aged parmesan", "Fresh thyme"] },
  { name: "Four Cheese",    price: 20, emoji: "🧀", ingredients: ["Mozzarella", "Gorgonzola", "Aged parmesan", "Creamy ricotta"] },
  { name: "Veggie Supreme", price: 17, emoji: "🥬", ingredients: ["Tomato base", "Roasted bell peppers", "Kalamata olives", "Spinach & feta"], badge: "V" },
  { name: "Hawaiian",       price: 17, emoji: "🍍", ingredients: ["Tomato sauce", "Smoked ham", "Pineapple chunks", "Mozzarella"] },
  { name: "Spicy Nduja",    price: 21, emoji: "🌶️", ingredients: ["Calabrian nduja", "Chilli oil", "Stracciatella", "Wild honey drizzle"], badge: "🌶" },
];

/* ── per-slice base sauce colour (BBQ is brown, rest are red) */
const SAUCE_COLOR = ["#A81E0C","#A81E0C","#4A1A06","#A81E0C","#A81E0C","#A81E0C","#A81E0C","#A81E0C"];
/* crust colour per slice (hover brightens) */
const CRUST_BASE = "#A05E22";
const CRUST_HOV  = "#C07A30";

/* ── bg images per slice ──────────────────────────────── */
const BG_IMAGES = [
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1600&q=80",
  "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=1600&q=80",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1600&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&q=80",
  "https://images.unsplash.com/photo-1571407970349-bc81e71e0d1c?w=1600&q=80",
  "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=1600&q=80",
  "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=1600&q=80",
  "https://images.unsplash.com/photo-1590947132387-155596afa035?w=1600&q=80",
];

/* ── order ─────────────────────────────────────────────── */
interface OrderItem { slice: Slice; qty: number }

export default function PizzaMenu({ onBgChange }: { onBgChange?: (url: string | null) => void }) {
  const [hovered,    setHovered]    = useState<number | null>(null);
  const [confirming, setConfirming] = useState<number | null>(null);
  const [order,      setOrder]      = useState<OrderItem[]>([]);
  const [toast,      setToast]      = useState<string | null>(null);

  function handleHover(idx: number | null) {
    setHovered(idx);
    onBgChange?.(idx !== null ? BG_IMAGES[idx] : null);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  }
  function addToOrder(idx: number) {
    const slice = SLICES[idx];
    setOrder(prev => {
      const found = prev.find(o => o.slice.name === slice.name);
      return found
        ? prev.map(o => o.slice.name === slice.name ? { ...o, qty: o.qty + 1 } : o)
        : [...prev, { slice, qty: 1 }];
    });
    setConfirming(null);
    showToast(`${slice.emoji} ${slice.name} added to your order`);
  }

  const total = order.reduce((s, o) => s + o.slice.price * o.qty, 0);

  return (
    <div className="relative">

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            className="fixed top-6 left-1/2 z-[100] -translate-x-1/2 bg-[#d4a853] text-[#12100a] px-7 py-3 text-sm font-semibold shadow-2xl"
            style={{ whiteSpace: "nowrap" }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* pizza + panel */}
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">

        {/* Pizza SVG */}
        <div className="flex-shrink-0 w-full max-w-[420px] mx-auto lg:mx-0 flex justify-center" style={{ perspective: "900px", perspectiveOrigin: "50% 42%" }}>
          <motion.div
            initial={{ rotateX: 0, opacity: 0 }}
            animate={{ rotateX: 26, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ transformStyle: "preserve-3d", width: "100%" }}
          >
            <svg viewBox="0 0 440 440" width="100%"
              style={{ maxWidth: "420px", display: "block", margin: "0 auto", filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.9))" }}>
              <defs>
                {/* crust radial */}
                <radialGradient id="crust-g" cx="50%" cy="50%" r="50%">
                  <stop offset="55%" stopColor="#C07030" />
                  <stop offset="88%" stopColor="#8C4818" />
                  <stop offset="100%" stopColor="#6A3010" />
                </radialGradient>
                {/* cheese overlay colour */}
                <radialGradient id="cheese-g" gradientUnits="userSpaceOnUse" cx={CX} cy={CY} r={R_PIZZA}>
                  <stop offset="0%" stopColor="#D4941E" />
                  <stop offset="70%" stopColor="#B87018" />
                  <stop offset="100%" stopColor="#9A5810" />
                </radialGradient>
                {/* top specular shine */}
                <radialGradient id="shine-g" cx="40%" cy="30%" r="55%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.13" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
                {/* crust burnt spots pattern */}
                <radialGradient id="burnt-g" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3A1A08" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#3A1A08" stopOpacity="0" />
                </radialGradient>
                {/* hover warm glow */}
                <filter id="warm-glow" x="-35%" y="-35%" width="170%" height="170%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="9" result="b" />
                  <feFlood floodColor="#D4A030" floodOpacity="0.88" result="c" />
                  <feComposite in="c" in2="b" operator="in" result="glow" />
                  <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* ── static base ── */}
              <circle cx={CX} cy={CY} r={R_CRUST} fill="url(#crust-g)" />

              {/* burnt crust speckles */}
              {[0,55,110,162,205,258,310,352].map((deg, i) => {
                const p = toCart(R_CRUST - 9, deg);
                return <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r={4 + (i % 3)} fill="url(#burnt-g)" />;
              })}

              {/* ── animated slices ── */}
              {SLICES.map((slice, i) => {
                const s = i * 45, e = (i + 1) * 45, mid = i * 45 + 22.5;
                const pullRad = ((mid - 90) * Math.PI) / 180;
                const PULL = 16;
                const px = +(Math.cos(pullRad) * PULL).toFixed(2);
                const py = +(Math.sin(pullRad) * PULL).toFixed(2);
                const active = hovered === i;

                return (
                  <motion.g
                    key={i}
                    onMouseEnter={() => handleHover(i)}
                    onMouseLeave={() => handleHover(null)}
                    onClick={() => setConfirming(i)}
                    style={{ cursor: "pointer" }}
                    animate={active ? { x: px, y: py } : { x: 0, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  >
                    {/* crust ring segment */}
                    <path
                      d={wedge(s, e, R_CRUST, R_PIZZA)}
                      fill={active ? CRUST_HOV : CRUST_BASE}
                      style={{ filter: active ? "url(#warm-glow)" : "none", transition: "fill 0.25s" }}
                    />

                    {/* sauce base */}
                    <path d={wedge(s, e, R_PIZZA, R_INNER)} fill={SAUCE_COLOR[i]} />

                    {/* melted cheese patches */}
                    {CHEESE_PATCHES[i].map(([af, rf, rx, ry, rot], ci) => {
                      const pp = at(i, af, rf);
                      return (
                        <g key={ci} transform={`translate(${pp.x},${pp.y}) rotate(${rot})`}>
                          <ellipse rx={rx} ry={ry} fill="#D09020" opacity={0.88} />
                          <ellipse rx={rx - 4} ry={ry - 2} fill="#E0A828" opacity={0.55} />
                          {/* brown bubble spot */}
                          <ellipse rx={rx * 0.3} ry={ry * 0.35} cx={rx * 0.25} cy={-ry * 0.2} fill="#6A3808" opacity={0.3} />
                        </g>
                      );
                    })}

                    {/* toppings */}
                    {sliceToppings(i)}

                    {/* hover highlight veil */}
                    {active && (
                      <path d={wedge(s, e, R_PIZZA, R_INNER)}
                        fill="rgba(240,180,60,0.09)"
                        style={{ filter: "url(#warm-glow)" }} />
                    )}
                  </motion.g>
                );
              })}

              {/* cut lines */}
              {Array.from({ length: 8 }).map((_, i) => {
                const edge = toCart(R_CRUST, i * 45);
                return (
                  <line key={i}
                    x1={CX} y1={CY} x2={edge.x.toFixed(1)} y2={edge.y.toFixed(1)}
                    stroke="#110A02" strokeWidth="2" opacity="0.65"
                    style={{ pointerEvents: "none" }} />
                );
              })}

              {/* centre cap */}
              <circle cx={CX} cy={CY} r={R_INNER} fill="#160E04" style={{ pointerEvents: "none" }} />
              <circle cx={CX} cy={CY} r={R_INNER - 5} fill="#221408" style={{ pointerEvents: "none" }} />

              {/* specular */}
              <circle cx={CX} cy={CY} r={R_CRUST} fill="url(#shine-g)" style={{ pointerEvents: "none" }} />
            </svg>
          </motion.div>
        </div>

        {/* Info panel */}
        <div className="flex-1 w-full max-w-sm min-h-[300px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {hovered !== null ? (
              <motion.div key={hovered}
                initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.22 }}
                className="border border-[#d4a853]/20 p-7"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl leading-none">{SLICES[hovered].emoji}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-[#f5ead8] leading-tight"
                      style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}>
                      {SLICES[hovered].name}
                    </h3>
                    {SLICES[hovered].badge && (
                      <span className="mt-1 inline-block text-[0.58rem] tracking-wider border border-[#d4a853]/40 text-[#d4a853] px-1.5 py-0.5 rounded-sm">
                        {SLICES[hovered].badge}
                      </span>
                    )}
                  </div>
                </div>
                <span className="amber-line mb-5 block w-full" />
                <p className="text-[#6a5a45] text-[0.63rem] tracking-[0.22em] uppercase mb-3">Ingredients</p>
                <ul className="space-y-1.5 mb-7">
                  {SLICES[hovered].ingredients.map(ing => (
                    <li key={ing} className="flex items-center gap-2.5 text-[#c8a860] text-sm">
                      <span className="w-1 h-1 rounded-full bg-[#d4a853] flex-shrink-0" />
                      {ing}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-[#d4a853]"
                    style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}>
                    £{SLICES[hovered].price}
                  </span>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => setConfirming(hovered)}
                    className="px-6 py-2.5 bg-[#d4a853] text-[#12100a] text-[0.65rem] tracking-[0.2em] uppercase font-bold hover:bg-[#e8c278] transition-colors">
                    Add to Order
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center py-10">
                <motion.div
                  animate={{ rotate: [0, -5, 5, -3, 3, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 4 }}
                  className="text-6xl mb-5 opacity-20">🍕</motion.div>
                <p className="text-[#4a3a2a] text-sm">Hover a slice to explore the flavour</p>
                <p className="text-[#3a2a1a] text-xs mt-1.5">Click any slice to add it to your order</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* order summary */}
      <AnimatePresence>
        {order.length > 0 && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35 }}
            className="overflow-hidden mt-12">
            <div className="border border-[#d4a853]/20 p-6">
              <p className="text-[#d4a853] text-[0.62rem] tracking-[0.28em] uppercase mb-4">Your Order</p>
              {order.map(item => (
                <div key={item.slice.name}
                  className="flex justify-between items-center py-2.5 border-b border-[#d4a853]/10 text-sm">
                  <span className="text-[#c8a860]">
                    {item.slice.emoji} {item.slice.name}
                    <span className="text-[#6a5a45] ml-1.5">× {item.qty}</span>
                  </span>
                  <span className="text-[#d4a853] font-semibold">£{item.slice.price * item.qty}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-4">
                <span className="text-[#5a4a38] text-xs uppercase tracking-wider">Total</span>
                <span className="text-2xl font-bold text-[#d4a853]"
                  style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}>
                  £{total}
                </span>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setOrder([])}
                  className="text-xs text-[#4a3a2a] hover:text-[#6a5a45] underline underline-offset-2 transition-colors">
                  Clear order
                </button>
                <button className="flex-1 py-3 bg-[#d4a853] text-[#12100a] text-[0.65rem] tracking-[0.22em] uppercase font-bold hover:bg-[#e8c278] transition-colors">
                  Place Order
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* confirmation modal */}
      <AnimatePresence>
        {confirming !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            style={{ background: "rgba(8,6,2,0.84)", backdropFilter: "blur(8px)" }}
            onClick={() => setConfirming(null)}>
            <motion.div
              initial={{ scale: 0.88, y: 22 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.88, y: 16 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#18120a] border border-[#d4a853]/30 p-9 max-w-xs w-full text-center">
              <div className="text-5xl mb-4">{SLICES[confirming].emoji}</div>
              <h3 className="text-xl font-bold text-[#f5ead8] mb-1"
                style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}>
                {SLICES[confirming].name}
              </h3>
              <p className="text-[#6a5a45] text-sm mb-1">Add this pizza to your order?</p>
              <p className="text-[#d4a853] text-lg font-bold mt-2 mb-7">£{SLICES[confirming].price}</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirming(null)}
                  className="flex-1 py-3 border border-[#d4a853]/30 text-[#6a5a45] text-[0.65rem] tracking-[0.18em] uppercase hover:border-[#d4a853]/60 hover:text-[#8a7a60] transition-colors">
                  Cancel
                </button>
                <motion.button whileTap={{ scale: 0.96 }}
                  onClick={() => addToOrder(confirming)}
                  className="flex-1 py-3 bg-[#d4a853] text-[#12100a] text-[0.65rem] tracking-[0.18em] uppercase font-bold hover:bg-[#e8c278] transition-colors">
                  Add to Order
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
