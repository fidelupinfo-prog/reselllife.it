"use client";

import Link from "next/link";
import { ACADEMY_URL, FORNITORI_URL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

export default function Scelta() {
  return (
    <section className="sec scelta py-16 lg:py-28" id="scelta" aria-labelledby="scelta-h">
      <div className="wrap mx-auto px-4 max-w-7xl relative z-10">
        <div className="head">
          <p className="eyebrow" data-reveal>Scegli il tuo percorso</p>
          <h2 className="h" id="scelta-h" data-reveal style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
            Da dove vuoi partire?
          </h2>
        </div>
        <div className="paths">
          <div className="path p1 flex flex-col" data-reveal="right" style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
            <div className="step-lbl">01 <span>TESTARE</span></div>
            <h3>Fornitore singolo</h3>
            <p className="desc">Un fornitore singolo per testare senza impegno.</p>
            <ul className="checks flex-1">
              <li><i>–</i>Accesso a un fornitore singolo</li>
              <li><i>–</i>Nessun abbonamento</li>
            </ul>
            <Link
              href={FORNITORI_URL}
              onClick={() => trackEvent("fornitore_click")}
              className="btn btn-line mt-auto text-center block"
            >
              Vedi i fornitori disponibili
            </Link>
          </div>

          <div className="path p2" data-reveal="left">
            <div className="step-lbl">02 <span>COSTRUIRE</span> <span className="rec">CONSIGLIATO</span></div>
            <h3>Academy Resellife</h3>
            <p className="desc">Metodo completo, strumenti e supporto. Tutto in un posto solo.</p>
            <ul className="checks">
              <li><i>✓</i>Fornitori verificati</li>
              <li><i>✓</i>Bot Resellife incluso</li>
              <li><i>✓</i>Guide operative PDF</li>
              <li><i>✓</i>Community 700+ studenti</li>
              <li><i>✓</i>Supporto diretto</li>
              <li><i>✓</i>Guida bonus di benvenuto</li>
            </ul>
            <div className="price">
              <b>90€</b> <span>/ Accesso completo</span>
            </div>
            <a
              href={ACADEMY_URL}
              onClick={() => trackEvent("academy_click")}
              className="btn btn-grad text-center block"
            >
              ENTRA IN ACADEMY <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
