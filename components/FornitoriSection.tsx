"use client";

import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

const bundles = [
  {
    src: "/fornitori/bundle-italiani.jpg",
    label: "Bundle Fornitori Italiani",
    desc: "Contatti verificati, prezzi di ingresso, categorie di prodotto.",
    badge: "ITALIANO",
    href: "https://payhip.com/b/bekUq",
    price: "27,99€",
    color: "var(--color-accento)",
    textColor: "#0A0A0A"
  },
  {
    src: "/fornitori/bundle-internazionali.jpg",
    label: "Bundle Fornitori Internazionali",
    desc: "Accesso a mercati esteri con margini più alti.",
    badge: "INTERNAZIONALE",
    href: "https://payhip.com/b/OIhY5",
    price: "34,99€",
    color: "var(--color-blu)",
    textColor: "#fff"
  },
  {
    src: "/fornitori/manuale-vinted.jpg",
    label: "Manuale Vinted",
    desc: "Come approcciare ogni fornitore e negoziare le condizioni.",
    badge: "GUIDA",
    href: "https://payhip.com/b/TIwXx",
    price: "14,99€",
    color: "var(--color-viola)",
    textColor: "#fff"
  },
];

export default function FornitoriSection() {
  return (
    <section className="sec forn" id="fornitori" aria-labelledby="forn-h">
      <div className="glow" style={{ width: "800px", height: "800px", left: "-300px", top: "10%", background: "radial-gradient(closest-side,rgba(47,107,255,.18),transparent)", position: "absolute" }}></div>
      <div className="wrap relative z-10">
        <div className="top">
          <div>
            <p className="eyebrow" data-reveal>I fornitori</p>
            <h2 className="h" id="forn-h" data-reveal style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
              Non parti da zero.<br /><span className="b">Parti da una base.</span>
            </h2>
          </div>
          <div data-reveal style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
            <p className="lead" style={{ marginTop: 0 }}>
              Accedi ai nostri fornitori e alle risorse operative già organizzate per aiutarti a capire cosa acquistare, dove acquistare e come iniziare a testare il mercato.
            </p>
            <a className="btn btn-blu" href="#fornitori" style={{ marginTop: "1.4rem" }}>
              Vedi tutti i fornitori <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="prods">
          {bundles.map((b, i) => (
            <a 
              key={i} 
              className="prod" 
              href={b.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => trackEvent("fornitore_click")}
              data-reveal 
              style={{ 
                "--reveal-delay": `${i * 120}ms`, 
                "--c": b.color, 
                "--ct": b.textColor 
              } as React.CSSProperties}
            >
              <div className="img">
                <Image src={b.src} alt={b.label} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                <span className="chip">{b.badge}</span>
              </div>
              <div className="body">
                <div className="row">
                  <h3>{b.label}</h3>
                  <span className="pr">{b.price}</span>
                </div>
                <p>{b.desc}</p>
                <div className="go">
                  <span>Acquista su Payhip</span>
                  <span aria-hidden="true">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
