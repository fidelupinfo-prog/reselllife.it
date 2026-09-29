"use client";

import { trackEvent } from "@/lib/analytics";
import { CALENDLY_URL } from "@/lib/config";
import { Phone } from "lucide-react";

export default function CallSection() {
  return (
    <section
      id="call"
      aria-labelledby="call-heading"
      className="py-16 lg:py-28 rl-bg-b relative overflow-hidden"
    >

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rl-card p-10 lg:p-14 text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-viola/15 border border-viola/30 flex items-center justify-center mx-auto mb-6">
            <Phone className="w-7 h-7 text-viola" strokeWidth={1.75} />
          </div>

          <p className="text-viola font-poppins font-semibold text-sm uppercase tracking-[0.2em] mb-4">
            Confronto gratuito
          </p>

          <h2
            id="call-heading"
            data-reveal="blur"
            className="font-anton text-[clamp(1.8rem,4vw,3rem)] uppercase text-testo leading-none mb-6"
          >
            HAI ANCORA DUBBI?
            <br />
            PARLIAMONE IN 15 MINUTI.
          </h2>

          <p className="text-muted/70 font-poppins leading-relaxed max-w-xl mx-auto mb-8">
            Dopo il quiz puoi confrontarti gratuitamente con il nostro team e
            capire da dove iniziare in base alla tua situazione. Nessun
            obbligo, nessuna pressione.
          </p>

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("call_click")}
            id="cta-call"
            className="inline-block py-4 px-8 rounded-btn border border-viola/50 text-viola font-poppins font-semibold text-base hover:bg-viola/10 hover:border-viola transition-all duration-200"
          >
            PRENOTA LA CALL GRATUITA
          </a>

          <p className="mt-4 text-xs text-testo/30 font-poppins">
            15 minuti · Solo orientamento · Calendly
          </p>
        </div>
      </div>
    </section>
  );
}
