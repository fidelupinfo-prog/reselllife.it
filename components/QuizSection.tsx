"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { QUIZ_URL } from "@/lib/config";

const indicators = [
  { label: "TEMPO",      value: "60 SEC",   delay: 0   },
  { label: "COSTO",      value: "0€",        delay: 150 },
  { label: "RISULTATO",  value: "IMMEDIATO", delay: 300 },
];

export default function QuizSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="quiz"
      aria-labelledby="quiz-heading"
      className="py-16 lg:py-28 rl-bg-b relative overflow-hidden"
    >

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Big box */}
        <div className="rl-card p-10 lg:p-14 shadow-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-viola/15 border border-viola/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-viola inline-block animate-pulse" />
            <span className="text-xs font-poppins font-medium text-viola uppercase tracking-wider">
              Gratuito · Nessuna email
            </span>
          </div>

          <h2
            id="quiz-heading"
            data-reveal="blur"
            className="font-anton text-[clamp(2.5rem,7vw,5rem)] uppercase leading-none text-testo mb-4"
          >
            IL RESELL
            <br />
            <span className="text-viola">FA PER TE?</span>
          </h2>

          <p className="text-muted/70 font-poppins leading-relaxed mb-8 max-w-lg mx-auto">
            60 secondi. 5 domande. 1 risultato personalizzato.
          </p>

          {/* Indicators */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {indicators.map((ind, i) => (
              <div
                key={ind.label}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity 0.4s ease ${ind.delay}ms, transform 0.4s ease ${ind.delay}ms`,
                }}
                className="bg-notte border border-bordo rounded-full px-4 py-2 flex items-center gap-2"
              >
                <span className="text-xs text-muted/50 font-poppins uppercase tracking-widest">
                  {ind.label}:
                </span>
                <span className="text-xs font-poppins font-bold text-viola">
                  {ind.value}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href={QUIZ_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("quiz_click_section")}
            id="cta-quiz-section"
            className="inline-block py-5 px-12 rounded-btn bg-viola text-testo font-poppins font-bold text-xl uppercase tracking-wide hover:bg-viola-hover transition-all hover:scale-[1.03] active:scale-[0.99] shadow-lg shadow-viola/20"
          >
            FAI IL TEST →
          </a>

          <p className="mt-4 text-xs text-testo/30 font-poppins">
            Gratis. Nessuna email richiesta. Risultato immediato.
          </p>
        </div>
      </div>
    </section>
  );
}
