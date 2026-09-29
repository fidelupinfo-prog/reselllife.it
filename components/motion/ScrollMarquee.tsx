"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, useReducedMotion } from "motion/react";

const ROW1 = ["METODO", "FORNITORI", "BOT", "GUIDE", "COMMUNITY"];
const ROW2 = ["ACQUISTA", "VENDI", "RIPETI"];
const SEP = "✦";

function buildRow(items: string[]) {
  // Triple the items so the marquee feels infinite
  return [...items, ...items, ...items];
}

/**
 * ScrollMarquee — pink (accento) band slightly rotated.
 * Two rows of giant Anton text move in opposite directions on scroll.
 * Replaces BrandStatement in page.tsx (BrandStatement.tsx file kept).
 */
export default function ScrollMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);

  const effectiveX1 = shouldReduce ? "0%" : x1;
  const effectiveX2 = shouldReduce ? "-35%" : x2;

  return (
    <div
      ref={ref}
      aria-label="Pilastri: Metodo, Fornitori, Bot, Guide, Community. Acquista, Vendi, Ripeti."
      className="relative overflow-hidden py-6"
      style={{
        backgroundColor: "#FF1FA8",
        transform: "rotate(-1deg) scaleX(1.03)",
        marginBlock: "clamp(1.5rem, 4vw, 3rem)",
      }}
    >
      {/* Row 1 — solid inchiostro */}
      <motion.div
        aria-hidden
        style={{ x: effectiveX1 }}
        className="flex whitespace-nowrap mb-1"
      >
        {buildRow(ROW1).map((item, i) => (
          <span
            key={i}
            className="font-anton uppercase text-[#0A0A0A] flex items-center gap-4 px-6"
            style={{ fontSize: "clamp(2.8rem, 9vw, 8rem)", lineHeight: 0.88 }}
          >
            {item}
            <span className="text-[#0A0A0A]/40 text-[0.3em]">{SEP}</span>
          </span>
        ))}
      </motion.div>

      {/* Row 2 — outlined text */}
      <motion.div
        aria-hidden
        style={{ x: effectiveX2 }}
        className="flex whitespace-nowrap"
      >
        {buildRow(ROW2).map((item, i) => (
          <span
            key={i}
            className="font-anton uppercase flex items-center gap-4 px-6"
            style={{
              fontSize: "clamp(2.8rem, 9vw, 8rem)",
              lineHeight: 0.88,
              color: "transparent",
              WebkitTextStroke: "2px #0A0A0A",
            }}
          >
            {item}
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "1px rgba(10,10,10,0.4)",
                fontSize: "0.3em",
              }}
            >
              {SEP}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
