"use client";

import { useRef, type ElementType } from "react";
import { useScroll, useTransform, motion, useReducedMotion } from "motion/react";

type Tag = "p" | "h1" | "h2" | "h3" | "span";

interface ScrollWordsProps {
  text: string;
  highlight?: string[];
  className?: string;
  highlightClassName?: string;
  as?: Tag;
  progress?: ReturnType<typeof useScroll>["scrollYProgress"];
  range?: [number, number];
}

/**
 * ScrollWords — each word's opacity transitions from 0.12 to 1
 * progressively as the section scrolls through the viewport.
 * Accessible: wrapper has aria-label with full text; words are aria-hidden.
 */
export default function ScrollWords({
  text,
  highlight = [],
  className = "",
  highlightClassName = "text-viola",
  as: Tag = "p",
  progress,
  range = [0, 1],
}: ScrollWordsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress: defaultProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const scrollYProgress = progress ?? defaultProgress;
  const mappedProgress = useTransform(scrollYProgress, range, [0, 1]);

  const words = text.split(" ");

  // Wrap in a div to avoid ref type issues with polymorphic tags
  return (
    <div ref={ref} aria-label={text}>
      <Tag className={className} aria-hidden>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;
          
          const clean = word.replace(/[.,:;!?"“”«»]/g, "").toLowerCase();
          const isHighlighted = highlight.some(h => h.toLowerCase() === clean);

          return (
            <Word
              key={i}
              word={word}
              start={start}
              end={end}
              progress={mappedProgress}
              isHighlighted={isHighlighted}
              highlightClassName={highlightClassName}
              shouldReduce={!!shouldReduce}
            />
          );
        })}
      </Tag>
    </div>
  );
}

interface WordProps {
  word: string;
  start: number;
  end: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  isHighlighted: boolean;
  highlightClassName: string;
  shouldReduce: boolean;
}

function Word({
  word,
  start,
  end,
  progress,
  isHighlighted,
  highlightClassName,
  shouldReduce,
}: WordProps) {
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const y = useTransform(progress, [start, end], [8, 0]);

  if (shouldReduce) {
    return (
      <>
        <span className={isHighlighted ? highlightClassName : ""}>
          {word}
        </span>{" "}
      </>
    );
  }

  return (
    <>
      <motion.span
        style={{ opacity, y, display: "inline-block" }}
        className={isHighlighted ? highlightClassName : ""}
      >
        {word}
      </motion.span>{" "}
    </>
  );
}
