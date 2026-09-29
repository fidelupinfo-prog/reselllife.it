"use client";

import { Package, Bot, BookOpen, Users, Headphones } from "lucide-react";
import HorizontalPin from "@/components/motion/HorizontalPin";

// Alternating slide backgrounds per spec
const pillars = [
  {
    id: "fornitori",
    Icon: Package,
    num: "01",
    label: "FORNITORI VERIFICATI",
    desc: "Contatti reali e testati, non liste generiche trovate online.",
    bg: "#7B2FD6",
    text: "#FFFFFF",
    numColor: "rgba(255,255,255,0.25)",
    iconColor: "rgba(255,255,255,0.85)",
  },
  {
    id: "bot",
    Icon: Bot,
    num: "02",
    label: "BOT RESELLIFE",
    desc: "Il tuo radar sul mercato, attivo 24 ore su 24.",
    bg: "#FF1FA8",
    text: "#0A0A0A",
    numColor: "rgba(10,10,10,0.25)",
    iconColor: "#0A0A0A",
  },
  {
    id: "guide",
    Icon: BookOpen,
    num: "03",
    label: "GUIDE OPERATIVE",
    desc: 'PDF pratici, dalla guida "Da 0 a 1000" alle strategie avanzate.',
    bg: "#2F6BFF",
    text: "#FFFFFF",
    numColor: "rgba(255,255,255,0.25)",
    iconColor: "#FFFFFF",
  },
  {
    id: "community",
    Icon: Users,
    num: "04",
    label: "COMMUNITY PRIVATA",
    desc: "700+ persone che stanno facendo la stessa cosa.",
    bg: "#141414",
    text: "#FFFFFF",
    numColor: "rgba(255,255,255,0.25)",
    iconColor: "#FF1FA8",
    border: "#2F6BFF",
  },
  {
    id: "supporto",
    Icon: Headphones,
    num: "05",
    label: "SUPPORTO DIRETTO",
    desc: "Rispondiamo noi, non un bot di assistenza.",
    bg: "linear-gradient(140deg, #FF1FA8, #7B2FD6 55%, #2F6BFF)",
    text: "#FFFFFF",
    numColor: "rgba(255,255,255,0.25)",
    iconColor: "#FFFFFF",
  },
];

const SLIDE_WIDTH = "min(78vw, 380px)";

function Slide({
  pillar,
}: {
  pillar: (typeof pillars)[0];
}) {
  return (
    <div
      id={`ecosistema-${pillar.id}`}
      style={{
        width: SLIDE_WIDTH,
        aspectRatio: "3/4",
        background: pillar.bg,
        color: pillar.text,
        border: pillar.border ? `1px solid ${pillar.border}` : undefined,
      }}
      className="rounded-[22px] p-6 flex flex-col justify-between flex-shrink-0"
    >
      {/* Top: big number */}
      <span
        className="font-anton text-[clamp(3rem,8vw,5rem)] leading-none"
        style={{ color: pillar.numColor }}
        aria-hidden
      >
        {pillar.num}
      </span>

      {/* Bottom: icon + title + desc */}
      <div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${pillar.iconColor}18` }}
          aria-hidden
        >
          <pillar.Icon
            className="w-6 h-6"
            strokeWidth={1.75}
            style={{ color: pillar.iconColor }}
          />
        </div>
        <h3
          className="font-anton text-xl uppercase leading-tight mb-2"
          style={{ color: pillar.text }}
        >
          {pillar.label}
        </h3>
        <p
          className="font-poppins text-sm leading-relaxed"
          style={{ color: `${pillar.text}BB` }}
        >
          {pillar.desc}
        </p>
      </div>
    </div>
  );
}

const heading = (
  <div>
    <p className="text-blu font-poppins font-semibold text-sm uppercase tracking-[0.2em] mb-3">
      L&apos;ecosistema
    </p>
    <h2
      id="ecosistema-heading"
      data-reveal="blur"
      className="font-anton text-[clamp(1.8rem,4vw,3rem)] uppercase text-testo leading-none"
    >
      COSA C&apos;È DENTRO
      <br />
      <span className="rl-grad-text">RESELLIFE ACADEMY</span>
    </h2>
  </div>
);

export default function Ecosistema() {
  return (
    <HorizontalPin
      heading={heading}
      heightVh={320}
      showCounter
      className="bg-notte"
    >
      {pillars.map((p) => (
        <Slide key={p.id} pillar={p} />
      ))}
    </HorizontalPin>
  );
}
