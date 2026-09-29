export default function Bonus() {
  const steps = [
    {
      n: "1",
      title: "Registrazione",
      text: "Ti registri sulle piattaforme indicate nella guida interna all'Academy.",
    },
    {
      n: "2",
      title: "Riscatto",
      text: "Riscatti i bonus di benvenuto disponibili seguendo le istruzioni.",
    },
    {
      n: "3",
      title: "Recupero",
      text: "Molti studenti recuperano parte dell'investimento tramite i bonus di benvenuto — tempi e importi variano da persona a persona.",
    },
  ];

  return (
    <section
      id="bonus"
      aria-labelledby="bonus-heading"
      className="py-10 lg:py-16 rl-bg-a relative overflow-hidden"
    >
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-viola font-poppins font-semibold text-xs uppercase tracking-[0.2em] mb-1">
              Incluso nell&apos;Academy
            </p>
            <h2
              id="bonus-heading"
              className="font-anton text-[clamp(1.4rem,3vw,2rem)] uppercase text-testo leading-none"
            >
              INIZIA CON UN{" "}
              <span className="text-viola">VANTAGGIO IN PIÙ.</span>
            </h2>
          </div>
          <p className="text-muted/60 font-poppins text-sm max-w-xs">
            Bonus di benvenuto per i nuovi membri.
          </p>
        </div>

        {/* Steps — compact horizontal */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {steps.map((step) => (
            <div
              key={step.n}
              className="rl-card p-4 flex gap-3"
            >
              <span className="font-anton text-lg text-viola/60 flex-shrink-0 leading-none mt-0.5">
                {step.n}
              </span>
              <div>
                <p className="font-poppins font-semibold text-testo text-xs mb-1">{step.title}</p>
                <p className="text-muted/55 text-xs font-poppins leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Legal note — compact */}
        <p className="text-xs text-testo/35 leading-relaxed font-poppins text-center">
          Bonus di terze parti. Le piattaforme cambiano nel tempo.{" "}
          <strong className="text-testo/50">Richiedono 18 anni compiuti.</strong>{" "}
          Possono essere link di affiliazione.
        </p>
      </div>
    </section>
  );
}
