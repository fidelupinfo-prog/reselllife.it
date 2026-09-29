"use client";

import { useRef } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useReducedMotion,
} from "motion/react";
import ScrollWords from "./ScrollWords";

/**
 * StickyStatement — h-[200vh] outer section with sticky h-[100svh] inner.
 * Scroll-driven: aura reveals/spins, heading scales down,
 * gradient line grows, ScrollWords paragraph reveals word by word.
 */
export default function StickyStatement() {
  const ref = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Aura animations
  const auraScale = useTransform(scrollYProgress, [0, 0.5], [0.3, 1.15]);
  const auraOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.9, 0.6]);
  const auraRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  // Heading scale: 2.4 → 1 (0→0.4)
  const scale = useTransform(scrollYProgress, [0, 0.4], [2.4, 1]);

  // Heading opacity: 0 → 1 (0→0.08)
  const headingOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  // Gradient line scaleX: 0→1 (0.3→0.5)
  const lineScaleX = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  // Paragraph wrapper opacity: 0→1 (0.35→0.45) to prevent early flash
  const paraOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);

  if (shouldReduce) {
    return (
      <section
        id="sticky-statement"
        aria-label="Non è fortuna. È un processo."
        className="py-24 bg-[#0A0A0A] text-white overflow-hidden relative"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60">
          <div
            aria-hidden
            className="w-[120vmin] h-[120vmin] rounded-full blur-[90px]"
            style={{
              background: "conic-gradient(rgba(255,31,168,.45), rgba(123,47,214,.45), rgba(47,107,255,.45), rgba(255,31,168,.45))",
            }}
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2
            className="font-anton text-[clamp(3rem,11vw,10rem)] leading-none uppercase mb-8 text-white"
          >
            NON È
            <br />
            <span className="rl-grad-text">FORTUNA.</span>
          </h2>
          <div className="w-24 h-[3px] rl-grad rounded-full mx-auto mb-8" />
          <ScrollWords
            text="È un processo: compri bene, vendi meglio, reinvesti. Ogni giorno. Con fornitori testati, un bot che lavora per te e una community che ti spinge avanti."
            highlight={["processo", "reinvesti", "bot", "community"]}
            as="p"
            className="font-poppins font-semibold text-[clamp(1.15rem,2.4vw,1.9rem)] leading-relaxed text-white max-w-2xl mx-auto"
            highlightClassName="text-blu"
          />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id="sticky-statement"
      aria-label="Non è fortuna. È un processo."
      style={{ height: "200vh" }}
      className="bg-[#0A0A0A]"
    >
      <div className="sticky top-0 h-[100svh] flex flex-col items-center justify-center overflow-hidden">
        
        {/* Aura */}
        <motion.div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: auraOpacity, scale: auraScale, rotate: auraRotate }}
        >
          <div
            className="w-[120vmin] h-[120vmin] rounded-full blur-[90px]"
            style={{
              background: "conic-gradient(rgba(255,31,168,.45), rgba(123,47,214,.45), rgba(47,107,255,.45), rgba(255,31,168,.45))",
            }}
          />
        </motion.div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Main heading */}
          <motion.h2
            style={{
              scale,
              opacity: headingOpacity,
            }}
            className="font-anton text-[clamp(3rem,11vw,10rem)] leading-none uppercase mb-8 origin-center text-white"
          >
            NON È
            <br />
            <span className="rl-grad-text">FORTUNA.</span>
          </motion.h2>

          {/* Gradient line */}
          <motion.div
            style={{ scaleX: lineScaleX, transformOrigin: "center" }}
            className="w-24 h-[3px] rl-grad rounded-full mx-auto mb-8"
          />

          {/* Paragraph */}
          <motion.div style={{ opacity: paraOpacity }}>
            <ScrollWords
              text="È un processo: compri bene, vendi meglio, reinvesti. Ogni giorno. Con fornitori testati, un bot che lavora per te e una community che ti spinge avanti."
              highlight={["processo", "reinvesti", "bot", "community"]}
              as="p"
              className="font-poppins font-semibold text-[clamp(1.15rem,2.4vw,1.9rem)] leading-relaxed text-white max-w-2xl mx-auto"
              highlightClassName="text-blu"
              progress={scrollYProgress}
              range={[0.42, 0.92]}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
