"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, useReducedMotion } from "motion/react";

interface ParallaxProps {
  children: React.ReactNode;
  /** How many px to shift vertically over the element's scroll range */
  strength?: number;
  /** How many degrees to rotate */
  rotate?: number;
  className?: string;
}

/**
 * Parallax wrapper — shifts children on y axis (and optionally rotates)
 * as the element scrolls through the viewport.
 * y: strength → -strength, rotate: -rotate → rotate
 */
export default function Parallax({
  children,
  strength = 80,
  rotate = 0,
  className = "",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [-rotate, rotate]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={
          shouldReduce ? {} : { y, rotateZ }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
