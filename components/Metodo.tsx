import { ShoppingBag, Tag, RefreshCw } from "lucide-react";
import ScrollWords from "@/components/motion/ScrollWords";

const steps = [
  {
    n: "01",
    title: "ACQUISTA",
    body: "Individui i prodotti giusti da comprare a prezzo basso: fornitori già testati dall'Academy, oppure occasioni segnalate dal Bot Resellife in tempo reale.",
    detail: "Fornitore o opportunità di acquisto",
    color: "bg-black/8 border-black/12",
    textColor: "text-viola",
    iconBg: "bg-viola/10 text-viola",
    Icon: ShoppingBag,
  },
  {
    n: "02",
    title: "VENDI",
    body: "Pubblichi su Vinted, Subito o il marketplace più adatto al prodotto, seguendo le strategie di prezzo e presentazione dell'Academy.",
    detail: "Vinted · Subito · Marketplace",
    color: "bg-black/5 border-black/10",
    textColor: "text-accento",
    iconBg: "bg-accento/10 text-accento",
    Icon: Tag,
  },
  {
    n: "03",
    title: "RIPETI",
    body: "Reinvesti il margine, aumenti il numero di operazioni e costruisci un'entrata strutturata nel tempo — non un affare occasionale.",
    detail: "Reinvestimento e crescita",
    color: "bg-black/8 border-black/12",
    textColor: "text-viola",
    iconBg: "bg-viola/10 text-viola",
    Icon: RefreshCw,
  },
];

/** Metodo — cream background for light/dark rhythm */
export default function Metodo() {
  return (
    <section
      id="metodo"
      aria-labelledby="metodo-heading"
      className="py-16 lg:py-28 relative overflow-hidden bg-crema text-inchiostro"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-viola font-poppins font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            Il processo
          </p>
          <h2
            id="metodo-heading"
            data-reveal="blur"
            className="font-anton text-[clamp(2rem,5vw,3.5rem)] uppercase text-inchiostro leading-none mb-4"
          >
            IL METODO RESELLIFE
          </h2>
          <p className="text-inchiostro/60 font-poppins max-w-xl mx-auto leading-relaxed">
            Un ciclo che si ripete. Non un affare. Un processo.
          </p>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-[72px] left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-black/15 z-0"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, i) => (
              <div
                key={step.n}
                data-reveal
                style={{ "--reveal-delay": `${i * 150}ms` } as React.CSSProperties}
                className="flex flex-col items-center text-center group"
              >
                {/* Number circle */}
                <div
                  className={`w-16 h-16 rounded-full ${step.color} border-2 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className={`font-anton text-2xl leading-none ${step.textColor}`}>
                    {step.n}
                  </span>
                </div>

                {/* Card */}
                <div
                  className={`w-full bg-white border border-black/6 rounded-card-lg p-6 group-hover:border-viola/30 transition-colors duration-200 shadow-sm`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${step.iconBg} flex items-center justify-center mx-auto mb-4`}
                    aria-hidden
                  >
                    <step.Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className={`font-anton text-2xl uppercase ${step.textColor} mb-3`}>
                    {step.title}
                  </h3>
                  <p className="text-inchiostro/65 text-sm font-poppins leading-relaxed mb-4">
                    {step.body}
                  </p>
                  <div
                    className={`inline-flex items-center gap-2 border ${
                      i === 1
                        ? "border-accento/25 text-accento/70"
                        : "border-viola/25 text-viola/70"
                    } rounded-full px-3 py-1 text-xs font-poppins`}
                  >
                    {step.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing statement — ScrollWords */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <div className="w-px h-10 bg-black/20 mx-auto mb-8" aria-hidden />
          <ScrollWords
            text="Il reselling non deve essere un affare occasionale. Deve diventare un processo che sai ripetere."
            highlight={["processo", "ripetere"]}
            as="p"
            className="font-poppins text-inchiostro/75 text-lg leading-relaxed italic"
            highlightClassName="text-viola not-italic"
          />
        </div>
      </div>
    </section>
  );
}
