export default function BrandStatement() {
  const items = ["METODO", "FORNITORI", "BOT", "GUIDE", "COMMUNITY", "RESELLING"];

  return (
    <div
      className="border-y border-bordo py-3 relative overflow-hidden rl-bg-b"
      aria-label="Pillars: Metodo, Fornitori, Bot, Guide, Community"
    >
      {/* fade laterali */}
      <div aria-hidden className="pointer-events-none absolute left-0 top-0 h-full w-20 z-10"
        style={{ background: "linear-gradient(to right, #160D20, transparent)" }} />
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-full w-20 z-10"
        style={{ background: "linear-gradient(to left, #160D20, transparent)" }} />

      <div className="marquee-track" aria-hidden>
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-6">
            <span className="rl-label">{item}</span>
            <span className="w-1 h-1 rounded-full bg-bordo inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}
