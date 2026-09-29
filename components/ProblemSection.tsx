import { XCircle } from "lucide-react";
import Parallax from "@/components/motion/Parallax";

const problems = [
  "NON SAI COSA VENDERE",
  "NON SAI DOVE COMPRARE",
  "NON SAI COME TROVARE GLI AFFARI",
];

export default function ProblemSection() {
  return (
    <section
      id="problema"
      aria-labelledby="problema-heading"
      className="py-16 lg:py-28 relative overflow-hidden rl-bg-c"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: copy */}
          <div>
            <h2
              id="problema-heading"
              className="font-anton text-[clamp(2.2rem,6vw,4.5rem)] leading-none uppercase mb-8"
            >
              <span data-reveal-line className="text-testo block">
                <span>IL PROBLEMA</span>
              </span>
              <span data-reveal-line style={{ "--reveal-delay": "110ms" } as React.CSSProperties} className="text-testo block">
                <span>NON È INIZIARE.</span>
              </span>
              <span data-reveal-line style={{ "--reveal-delay": "220ms" } as React.CSSProperties} className="text-viola block">
                <span>È INIZIARE</span>
              </span>
              <span data-reveal-line style={{ "--reveal-delay": "330ms" } as React.CSSProperties} className="text-viola block">
                <span>SENZA METODO.</span>
              </span>
            </h2>

            <div className="space-y-4 mb-10">
              {problems.map((p, i) => (
                <div
                  key={i}
                  data-reveal="left"
                  style={{ "--reveal-delay": `${300 + i * 120}ms` } as React.CSSProperties}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-8 h-8 rounded-full bg-accento/15 border border-accento/30 flex items-center justify-center flex-shrink-0 group-hover:bg-accento/25 transition-colors duration-200">
                    <XCircle className="w-4 h-4 text-accento" strokeWidth={2} />
                  </div>
                  <p className="font-poppins font-semibold text-sm sm:text-base uppercase tracking-wide text-testo/80">
                    {p}
                  </p>
                </div>
              ))}
            </div>

            <p data-reveal className="text-muted/70 font-poppins leading-relaxed text-sm max-w-md">
              Molte persone iniziano il reselling senza un metodo, e si fermano
              nei primi mesi — è quello che vediamo ogni giorno nella nostra
              community. Non perché non funziona, ma perché partono senza una
              struttura.
            </p>
          </div>

          {/* Right: immagini reali prodotti con Parallax */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[480px] max-w-[400px] lg:max-w-none mx-auto w-full">
            <Parallax strength={60} rotate={-3} className="absolute top-0 left-0 w-[60%]">
              <div className="aspect-[4/3] rounded-2xl rl-card overflow-hidden shadow-xl">
                <img src="/fornitori/bundle-italiani.jpg" alt="Bundle Fornitori Italiani" className="w-full h-full object-cover" />
              </div>
            </Parallax>

            <Parallax strength={-50} rotate={2} className="absolute top-[15%] right-0 w-[52%]">
              <div className="aspect-[4/3] rounded-2xl rl-card overflow-hidden shadow-xl">
                <img src="/fornitori/bundle-internazionali.jpg" alt="Bundle Fornitori Internazionali" className="w-full h-full object-cover" />
              </div>
            </Parallax>

            <Parallax strength={110} rotate={-2} className="absolute bottom-0 left-[10%] w-[40%]">
              <div className="aspect-square rounded-2xl rl-card overflow-hidden shadow-xl">
                <img src="/fornitori/manuale-vinted.jpg" alt="Manuale Vinted" className="w-full h-full object-cover" />
              </div>
            </Parallax>

            {/* Fade lato sinistro per raccordo col testo */}
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-16 pointer-events-none"
              style={{ background: "linear-gradient(to right, #0A0A0A, transparent)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
