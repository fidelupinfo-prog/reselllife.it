"use client";

import Link from "next/link";
import { ACADEMY_URL, FORNITORI_URL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

export default function Scelta() {
  return (
    <section
      id="scelta"
      aria-labelledby="scelta-heading"
      className="py-16 lg:py-28 rl-bg-a relative overflow-hidden"
    >

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-viola font-poppins font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            Scegli il tuo percorso
          </p>
          <h2
            id="scelta-heading"
            data-reveal="blur"
            className="font-anton text-[clamp(2rem,5vw,3.5rem)] uppercase text-testo leading-none"
          >
            DA DOVE VUOI PARTIRE?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_0.55fr] gap-6 lg:gap-8 items-start max-w-5xl mx-auto">
          {/* ── Card primaria: Academy ── */}
          <div className="relative bg-[#130924] border-2 border-viola rounded-2xl p-8 lg:p-10 flex flex-col gap-6 overflow-hidden shadow-[0_8px_30px_rgba(123,47,214,0.15)] transform transition-transform hover:-translate-y-1">
            {/* Geometric corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-viola/10 rounded-bl-full pointer-events-none" aria-hidden />

            {/* Recommended badge */}
            <div className="inline-flex items-center gap-1.5 bg-viola text-white rounded-full px-3.5 py-1.5 self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse" />
              <span className="text-[11px] font-poppins font-bold uppercase tracking-[0.2em]">
                02 COSTRUIRE
              </span>
            </div>

            <div>
              <h3 className="font-anton text-4xl lg:text-5xl uppercase text-testo mb-3">
                ACADEMY RESELLIFE
              </h3>
              <p className="text-muted/80 font-poppins leading-relaxed text-sm max-w-sm">
                Metodo completo, strumenti e supporto. Tutto in un posto solo.
              </p>
            </div>

            <ul className="space-y-3 text-sm text-testo/75 font-poppins">
              {[
                "Fornitori verificati",
                "Bot Resellife incluso",
                "Guide operative PDF",
                "Community 700+ studenti",
                "Supporto diretto",
                "Guida bonus di benvenuto",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-viola/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-viola text-xs font-bold">✓</span>
                  </span>
                  <span className="font-medium text-testo/90">{item}</span>
                </li>
              ))}
            </ul>

            {/* Price */}
            <div className="border-t border-viola/20 pt-6 mt-2">
              <p className="text-4xl font-anton text-testo flex items-baseline gap-2">
                90€
                <span className="text-sm font-poppins font-normal text-testo/50 tracking-wide uppercase">
                  / Accesso completo
                </span>
              </p>
            </div>

            {/* CTA */}
            <a
              href={ACADEMY_URL}
              onClick={() => trackEvent("academy_click")}
              id="cta-entra-academy"
              className="block w-full py-4 px-6 rounded-btn bg-viola text-white font-poppins font-bold uppercase text-base tracking-widest text-center hover:bg-viola-hover transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-viola/20 mt-2"
              rel="noopener"
            >
              ENTRA IN ACADEMY →
            </a>
          </div>

          {/* ── Divider ── */}
          <div className="hidden lg:flex flex-col items-center justify-center py-10">
            <div className="h-20 w-px bg-bordo" />
            <span className="my-4 text-testo/30 text-sm font-poppins font-medium">o</span>
            <div className="h-20 w-px bg-bordo" />
          </div>

          {/* ── Card secondaria: Fornitore ── */}
          <div className="rl-card p-6 flex flex-col gap-5 opacity-80 hover:opacity-100 transition-opacity duration-300">
            <div>
              <p className="text-[11px] font-poppins font-bold uppercase tracking-[0.2em] text-muted/50 mb-2">
                01 TESTARE
              </p>
              <h3 className="font-anton text-2xl uppercase text-testo mb-2">
                FORNITORE SINGOLO
              </h3>
              <p className="text-muted/55 text-sm font-poppins leading-relaxed">
                Un fornitore singolo per testare senza impegno.
              </p>
            </div>

            <ul className="space-y-2 text-sm text-testo/55 font-poppins">
              {["Accesso a un fornitore singolo", "Nessun abbonamento"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-testo/30 text-xs">–</span>
                    {item}
                  </li>
                )
              )}
            </ul>

            <Link
              href={FORNITORI_URL}
              onClick={() => trackEvent("fornitore_click")}
              className="block w-full py-3 px-5 rounded-btn border border-bordo text-testo/60 font-poppins font-medium text-sm text-center hover:border-viola/40 hover:text-testo hover:bg-viola/5 transition-all duration-200"
            >
              Vedi i fornitori disponibili
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
