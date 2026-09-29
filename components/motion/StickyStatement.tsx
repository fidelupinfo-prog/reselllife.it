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
 * StickyStatement — h-[220vh] outer section with sticky h-[100svh] inner.
 * Scroll-driven: background #0A0A0A → #F3EFE7, heading scales 2.4→1,
 * viola line scaleX 0→1, ScrollWords paragraph reveals word by word.
 */
export default function StickyStatement() {
  const ref = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Background: black → crema (progress 0→0.35)
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.35],
    ["#0A0A0A", "#F3EFE7"]
  );

  // Heading color: white → inchiostro
  const headingColor = useTransform(
    scrollYProgress,
    [0, 0.35],
    ["#FFFFFF", "#0A0A0A"]
  );

  // Heading scale: 2.4 → 1 (0→0.45)
  const scale = useTransform(scrollYProgress, [0, 0.45], [2.4, 1]);

  // Heading opacity: 0 → 1 (0→0.1)
  const headingOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Viola line scaleX: 0→1 (0.35→0.6)
  const lineScaleX = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);

  // Paragraph opacity: 0→1 (0.4→0.55)
  const paraOpacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);

  // "FORTUNA" — accento color stays always
  const fortunaColor = "#FF1FA8";

  if (shouldReduce) {
    return (
      <section
        id="sticky-statement"
        aria-label="Non è fortuna. È un processo."
        className="py-24 bg-crema text-inchiostro"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-anton text-[clamp(3rem,11vw,10rem)] leading-none uppercase mb-8"
            style={{ color: "#0A0A0A" }}
          >
            NON È
            <br />
            <span style={{ color: fortunaColor }}>FORTUNA.</span>
          </h2>
          <div className="w-24 h-0.5 bg-viola mx-auto mb-8" />
          <ScrollWords
            text="È un processo: compri bene, vendi meglio, reinvesti. Ogni giorno. Con fornitori testati, un bot che lavora per te e una community che ti spinge avanti."
            highlight={["processo", "reinvesti", "bot", "community"]}
            as="p"
            className="font-poppins font-semibold text-[clamp(1rem,2.2vw,1.4rem)] leading-relaxed text-inchiostro max-w-2xl mx-auto"
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
      style={{ height: "220vh" }}
    >
      <motion.div
        style={{ backgroundColor: bgColor }}
        className="sticky top-0 h-[100svh] flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main heading */}
          <motion.h2
            style={{
              scale,
              opacity: headingOpacity,
              color: headingColor,
            }}
            className="font-anton text-[clamp(3rem,11vw,10rem)] leading-none uppercase mb-8 origin-center"
          >
            NON È
            <br />
            <span style={{ color: fortunaColor }}>FORTUNA.</span>
          </motion.h2>

          {/* Viola line */}
          <motion.div
            style={{ scaleX: lineScaleX, transformOrigin: "left" }}
            className="w-24 h-0.5 bg-viola mx-auto mb-8"
          />

          {/* Paragraph */}
          <motion.div style={{ opacity: paraOpacity }}>
            <ScrollWords
              text="È un processo: compri bene, vendi meglio, reinvesti. Ogni giorno. Con fornitori testati, un bot che lavora per te e una community che ti spinge avanti."
              highlight={["processo", "reinvesti", "bot", "community"]}
              as="p"
              className="font-poppins font-semibold text-[clamp(1rem,2.2vw,1.4rem)] leading-relaxed text-inchiostro max-w-2xl mx-auto"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
