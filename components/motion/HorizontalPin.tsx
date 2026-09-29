"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  useScroll,
  useTransform,
  motion,
  useReducedMotion,
} from "motion/react";

interface HorizontalPinProps {
  children: ReactNode[];
  heading?: ReactNode;
  className?: string;
  /** Total scroll height in vh. Default 320. */
  heightVh?: number;
  /** Show "1 / N" counter. Default false. */
  showCounter?: boolean;
}

/**
 * HorizontalPin — generic pinned horizontal scroller.
 * Vertical scroll translates slides horizontally via motion x.
 * On mobile with reduced motion or very short track: normal swipe row.
 */
export default function HorizontalPin({
  children,
  heading,
  className = "",
  heightVh = 320,
  showCounter = false,
}: HorizontalPinProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const [trackWidth, setTrackWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = Array.isArray(children) ? children : [children];
  const count = slides.length;

  // Measure track and window
  const measure = useCallback(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.scrollWidth);
    }
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);

    // Also recompute after fonts load (they may affect widths)
    document.fonts?.ready.then(measure);

    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const scrollDistance = Math.max(0, trackWidth - windowWidth);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -scrollDistance]
  );

  // Update active slide counter
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const idx = Math.round(v * (count - 1));
      setActiveSlide(Math.min(Math.max(idx, 0), count - 1));
    });
    return unsubscribe;
  }, [scrollYProgress, count]);

  // Fallback: reduced motion OR track too short → swipe row
  const isFallback = shouldReduce || scrollDistance <= 0;

  if (isFallback) {
    return (
      <section
        id="ecosistema"
        aria-labelledby="ecosistema-heading"
        className={`py-16 lg:py-24 ${className}`}
      >
        {heading && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
            {heading}
          </div>
        )}
        <div className="carousel-track px-4 sm:px-6 lg:px-8 max-w-none">
          {slides.map((slide, i) => (
            <div key={i} className="carousel-slide">
              {slide}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="ecosistema"
      aria-labelledby="ecosistema-heading"
      style={{ height: `${heightVh}vh` }}
      className={className}
    >
      <div
        className="sticky top-0 h-[100svh] flex flex-col justify-center overflow-hidden"
      >
        {/* Heading */}
        {heading && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex-shrink-0">
            {heading}
          </div>
        )}

        {/* Slide track */}
        <div className="relative flex-1 flex items-center overflow-visible">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-5 px-4 sm:px-8"
          >
            {slides.map((slide, i) => (
              <div key={i} className="flex-shrink-0">
                {slide}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Counter */}
        {showCounter && (
          <div
            aria-hidden
            className="flex-shrink-0 flex justify-center pb-6 gap-2"
          >
            {slides.map((_, i) => (
              <span
                key={i}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === activeSlide ? "1.5rem" : "0.5rem",
                  height: "0.5rem",
                  backgroundColor:
                    i === activeSlide
                      ? "#7B2FD6"
                      : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
