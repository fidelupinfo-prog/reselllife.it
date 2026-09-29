"use client";

import { useScroll, useSpring } from "motion/react";
import { motion } from "motion/react";

/** Fixed 3px scroll progress bar. Mount once in app/layout.tsx. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX,
        transformOrigin: "0%",
        background: "linear-gradient(to right, #FF1FA8, #7B2FD6, #FF1FA8)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 60,
        pointerEvents: "none",
      }}
    />
  );
}
