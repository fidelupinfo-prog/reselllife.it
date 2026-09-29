"use client";

import { trackEvent } from "@/lib/analytics";

const faqs = [
  {
    q: "Quanto costa?",
    a: "L'accesso completo all'Academy è 90€. Include fornitori, Bot Resellife, guide operative, community privata e supporto diretto. Dentro trovi anche la guida ai bonus di benvenuto per recuperare parte o tutta la quota.",
  },
  {
    q: "Serve esperienza?",
    a: "No. L'Academy parte dal presupposto che tu non abbia mai venduto nulla online. Il primo modulo è pensato esattamente per chi inizia da zero.",
  },
  {
    q: "Quanto capitale serve per iniziare?",
    a: "Si può partire con cifre piccole, anche poche decine di euro. Quanto serve dipende da cosa scegli di rivendere: dentro l'Academy trovi come impostare il primo acquisto in base al budget che hai.",
  },
  {
    q: "Che marketplace posso utilizzare?",
    a: "Il più usato è Vinted, ma l'Academy tratta anche Subito, Vinted Pro, marketplace di settore e canali propri. Ogni fornitore ha i marketplace più adatti al tipo di prodotto.",
  },
  {
    q: "Come funziona il Bot?",
    a: "Il Bot Resellife scansiona continuamente il mercato e ti invia notifiche quando trova annunci sottovalutati: errori di prezzo, prodotti pubblicati sotto il valore reale, o opportunità da valutare rapidamente. È incluso nell'Academy.",
  },
  {
    q: "Cosa ricevo entrando nell'Academy?",
    a: "Accesso a: fornitori privati verificati (italiani e internazionali), Bot Resellife, guide operative PDF, community privata con 700+ studenti, supporto diretto e guida ai bonus di benvenuto.",
  },
  {
    q: "Come funziona la call?",
    a: "È un confronto gratuito da 15 minuti con il nostro team. Non è una telefonata di vendita: serve a capire da dove iniziare in base alla tua situazione. Puoi prenotarla dopo aver fatto il quiz.",
  },
  {
    q: "Posso iniziare anche se studio o lavoro?",
    a: "Sì. Il reselling non ha orari fissi — puoi dedicarci il tempo che hai. Molti studenti dell'Academy lo fanno parallelamente a studio o lavoro. I risultati dipendono dal tempo che ci dedichi.",
  },
  {
    q: "Ho meno di 18 anni, posso iscrivermi?",
    a: "Per l'acquisto dell'Academy serve il consenso di un genitore o di chi esercita la responsabilità genitoriale. I bonus bancari di benvenuto, invece, richiedono la maggiore età.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-16 lg:py-28 rl-bg-b relative"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            id="faq-heading"
            data-reveal="blur"
            className="font-anton text-[clamp(2.5rem,6vw,4rem)] uppercase text-testo"
          >
            DOMANDE?
          </h2>
        </div>

        <div className="space-y-0 divide-y divide-bordo">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group py-1"
              onToggle={(e) => {
                if ((e.target as HTMLDetailsElement).open) {
                  trackEvent("faq_open", { question: faq.q.slice(0, 50) });
                }
              }}
            >
              <summary
                className="
                  flex items-center justify-between gap-4 py-4 cursor-pointer
                  text-testo/85 font-poppins font-medium text-sm sm:text-base leading-snug
                  hover:text-testo transition-colors duration-150
                  list-none [&::-webkit-details-marker]:hidden
                  focus-visible:outline-none focus-visible:text-testo
                "
              >
                <span>{faq.q}</span>
                <span
                  className="
                    w-7 h-7 flex-shrink-0 rounded-full border border-bordo
                    flex items-center justify-center text-testo/50 text-lg leading-none
                    group-open:border-viola group-open:text-viola
                    transition-colors duration-150
                  "
                  aria-hidden
                >
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">×</span>
                </span>
              </summary>

              <div className="faq-body pb-5 pr-11 text-sm text-testo/60 font-poppins leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        <p className="mt-8 text-xs text-testo/30 text-center font-poppins">
          La risposta relativa ai minori è indicativa — per i dettagli legali
          consulta le condizioni generali di vendita.
        </p>
      </div>
    </section>
  );
}
