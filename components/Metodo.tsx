import { ShoppingBag, Tag, RefreshCw } from "lucide-react";
import ScrollWords from "@/components/motion/ScrollWords";

const steps = [
  {
    n: "01",
    title: "ACQUISTA",
    body: "Individui i prodotti giusti da comprare a prezzo basso: fornitori già testati dall'Academy, oppure occasioni segnalate dal Bot Resellife in tempo reale.",
    detail: "Fornitore o opportunità di acquisto",
    color: "bg-viola",
    textColor: "text-white",
    bodyColor: "text-white/80",
    chipClass: "border-white/20 text-white/90",
    iconBg: "bg-white/10 text-white",
    Icon: ShoppingBag,
  },
  {
    n: "02",
    title: "VENDI",
    body: "Pubblichi su Vinted, Subito o il marketplace più adatto al prodotto, seguendo le strategie di prezzo e presentazione dell'Academy.",
    detail: "Vinted · Subito · Marketplace",
    color: "bg-blu",
    textColor: "text-white",
    bodyColor: "text-white/80",
    chipClass: "border-white/20 text-white/90",
    iconBg: "bg-white/10 text-white",
    Icon: Tag,
  },
  {
    n: "03",
    title: "RIPETI",
    body: "Reinvesti il margine, aumenti il numero di operazioni e costruisci un'entrata strutturata nel tempo — non un affare occasionale.",
    detail: "Reinvestimento e crescita",
    color: "bg-accento",
    textColor: "text-inchiostro",
    bodyColor: "text-inchiostro/80",
    chipClass: "border-inchiostro/20 text-inchiostro/90",
    iconBg: "bg-inchiostro/10 text-inchiostro",
    Icon: RefreshCw,
  },
];

/** Metodo — redesigned with solid color blocks and gradient typography */
export default function Metodo() {
  return (
    <section
      id="metodo"
      aria-labelledby="metodo-heading"
      className="py-16 lg:py-28 relative overflow-hidden bg-notte text-testo"
    >
      {/* Glow at top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[600px] rl-glow-blu pointer-events-none" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Left aligned header */}
        <div className="mb-16">
          <p className="text-blu font-poppins font-semibold text-sm uppercase tracking-[0.2em] mb-4">
            Il processo
          </p>
          <h2
            id="metodo-heading"
            className="font-anton text-[clamp(2.6rem,7vw,5.5rem)] uppercase leading-none mb-6"
          >
            <span data-reveal-line className="block text-testo">
              <span>IL METODO</span>
            </span>
            <span data-reveal-line style={{ "--reveal-delay": "100ms" } as React.CSSProperties} className="block rl-grad-text">
              <span>RESELLIFE.</span>
            </span>
          </h2>
          <p data-reveal style={{ "--reveal-delay": "200ms" } as React.CSSProperties} className="text-muted font-poppins max-w-xl leading-relaxed">
            Un ciclo che si ripete. Non un affare. Un processo.
          </p>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            aria-hidden
            data-reveal="left"
            className="hidden lg:block absolute -top-8 left-0 right-0 h-[3px] rl-grad rounded-full z-0"
          />

          <ol className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
            {steps.map((step, i) => (
              <li
                key={step.n}
                data-reveal
                style={{ "--reveal-delay": `${i * 150}ms` } as React.CSSProperties}
                className={`flex flex-col relative rounded-[22px] p-6 lg:p-8 min-h-[340px] hover:-translate-y-1 transition-transform duration-300 shadow-xl ${step.color}`}
              >
                <div className="flex justify-between items-start mb-8">
                  {/* Huge Number */}
                  <span className={`font-anton text-[5.5rem] leading-[0.8] opacity-25 ${step.textColor}`} aria-hidden>
                    {step.n}
                  </span>
                  
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl ${step.iconBg} flex items-center justify-center flex-shrink-0`}
                    aria-hidden
                  >
                    <step.Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="mt-auto">
                  <h3 className={`font-anton text-4xl uppercase ${step.textColor} mb-3`}>
                    {step.title}
                  </h3>
                  <p className={`${step.bodyColor} text-sm font-poppins leading-relaxed mb-6`}>
                    {step.body}
                  </p>
                  
                  {/* Chip */}
                  <div className="mt-auto">
                    <span
                      className={`inline-block border ${step.chipClass} rounded-full px-3 py-1.5 text-xs font-poppins font-medium`}
                    >
                      {step.detail}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Closing statement — ScrollWords */}
        <div className="mt-20 max-w-3xl text-left">
          <ScrollWords
            text="Il reselling non deve essere un affare occasionale. Deve diventare un processo che sai ripetere."
            highlight={["processo", "ripetere"]}
            as="p"
            className="font-poppins text-white font-semibold text-[clamp(1.3rem,2.8vw,2.2rem)] leading-relaxed italic"
            highlightClassName="text-accento not-italic"
          />
        </div>
      </div>
    </section>
  );
}
