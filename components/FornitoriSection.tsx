"use client";

import Link from "next/link";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

// Cards collegabili — ogni card è un link cliccabile
const bundles = [
  {
    src: "/fornitori/bundle-italiani.jpg",
    label: "Bundle Fornitori Italiani",
    desc: "Contatti verificati, prezzi di ingresso, categorie di prodotto",
    badge: "ITALIANO",
    href: "https://payhip.com/b/bekUq",      // Payhip diretto
    price: "27,99€",
    external: true,
  },
  {
    src: "/fornitori/bundle-internazionali.jpg",
    label: "Bundle Fornitori Internazionali",
    desc: "Accesso a mercati esteri con margini più alti",
    badge: "INTERNAZIONALE",
    href: "https://payhip.com/b/OIhY5",
    price: "34,99€",
    external: true,
  },
  {
    src: "/fornitori/manuale-vinted.jpg",
    label: "Manuale Vinted",
    desc: "Come approcciare ogni fornitore e negoziare le condizioni",
    badge: "GUIDA",
    href: "https://payhip.com/b/TIwXx",
    price: "14,99€",
    external: true,
  },
];

export default function FornitoriSection() {
  return (
    <section
      id="fornitori"
      aria-labelledby="fornitori-heading"
      className="py-16 lg:py-28 bg-white relative overflow-hidden"
    >

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: card bundle cliccabili ── */}
          <div className="order-2 lg:order-1">
            <div className="relative space-y-4">
              {bundles.map((b, i) => (
                <a
                  key={i}
                  href={b.href}
                  target={b.external ? "_blank" : undefined}
                  rel={b.external ? "noopener noreferrer" : undefined}
                  onClick={() => trackEvent("fornitore_click")}
                  data-reveal
                  className="group relative flex items-center gap-4 p-4 bg-white border border-black/10 rounded-card hover:-translate-y-0.5 cursor-pointer shadow-sm hover:shadow-md transition-all"
                  style={{
                    "--reveal-delay": `${i * 120}ms`,
                    transform:
                      i === 1 ? "translateX(2rem)" : i === 2 ? "translateX(1rem)" : "none",
                  } as React.CSSProperties}
                  aria-label={`Acquista ${b.label} — ${b.price}`}
                >
                  {/* Immagine prodotto */}
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border border-viola/15">
                    <Image
                      src={b.src}
                      alt={b.label}
                      fill
                      sizes="80px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-poppins font-bold text-viola bg-viola/10 border border-viola/20 rounded-full px-2 py-0.5 tracking-widest uppercase">
                        {b.badge}
                      </span>
                      <span className="text-xs font-poppins font-bold text-inchiostro/50 ml-auto">
                        {b.price}
                      </span>
                    </div>
                    <p className="font-poppins font-semibold text-testo text-sm truncate">
                      {b.label}
                    </p>
                    <p className="text-muted/55 text-xs font-poppins mt-0.5 leading-snug">
                      {b.desc}
                    </p>
                  </div>

                  {/* Freccia → appare su hover */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-viola/0 group-hover:bg-viola/20 flex items-center justify-center transition-all duration-300">
                    <svg
                      className="w-4 h-4 text-viola/40 group-hover:text-viola transition-colors"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              ))}

              {/* rimossa ombra */}
            </div>
          </div>

          {/* ── Right: copy ── */}
          <div className="order-1 lg:order-2">
            <p className="text-viola font-poppins font-semibold text-sm uppercase tracking-[0.2em] mb-4">
              I fornitori
            </p>
            <h2
              id="fornitori-heading"
              data-reveal="blur"
              className="font-anton text-[clamp(2rem,5vw,3.5rem)] uppercase text-inchiostro leading-none mb-6"
            >
              NON PARTI DA ZERO.
              <br />
              <span className="text-viola">PARTI DA UNA BASE.</span>
            </h2>
            <p data-reveal className="text-inchiostro/60 font-poppins leading-relaxed mb-8 max-w-lg">
              Accedi ai nostri fornitori e alle risorse operative già organizzate
              per aiutarti a capire cosa acquistare, dove acquistare e come
              iniziare a testare il mercato.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/fornitori"
                onClick={() => trackEvent("fornitori_section_cta")}
                className="inline-block py-4 px-6 rounded-btn bg-viola text-testo font-poppins font-semibold text-sm text-center hover:bg-viola-hover transition-all hover:scale-[1.02]"
              >
                VEDI TUTTI I FORNITORI →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
