import type { Metadata } from "next";
import { SITE_URL, QUIZ_URL, ACADEMY_URL } from "@/lib/config";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollMarquee from "@/components/motion/ScrollMarquee";
import ProblemSection from "@/components/ProblemSection";
import StickyStatement from "@/components/motion/StickyStatement";
import Metodo from "@/components/Metodo";
import Ecosistema from "@/components/Ecosistema";
import BotSection from "@/components/BotSection";
import FornitoriSection from "@/components/FornitoriSection";
import ProvaSociale from "@/components/ProvaSociale";
import VideoSection from "@/components/VideoSection";
import Scelta from "@/components/Scelta";
import QuizSection from "@/components/QuizSection";
import CallSection from "@/components/CallSection";
import Bonus from "@/components/Bonus";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import BonusWheel from "@/components/BonusWheel";

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Resellife Academy",
      url: SITE_URL,
      logo: `${SITE_URL}/og-image.jpg`,
      sameAs: [
        "https://www.instagram.com/resellife_/",
        "https://www.tiktok.com/@_resellife._",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: "https://wa.me/393398420279",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Quanto costa l'Academy Resellife?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "L'accesso completo all'Academy è 90€. Include fornitori, Bot Resellife, guide operative, community privata e supporto diretto.",
          },
        },
        {
          "@type": "Question",
          name: "Devo avere già esperienza con il reselling?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. L'Academy parte dal presupposto che tu non abbia mai venduto nulla online. Il primo modulo è pensato esattamente per quello.",
          },
        },
        {
          "@type": "Question",
          name: "Quanto capitale iniziale mi serve?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Si può partire con cifre piccole, anche poche decine di euro. Quanto serve dipende da cosa scegli di rivendere.",
          },
        },
        {
          "@type": "Question",
          name: "Il Bot è incluso nell'Academy?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sì, l'accesso al Bot Resellife è incluso nell'Academy.",
          },
        },
        {
          "@type": "Question",
          name: "Quanto si guadagna davvero?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dipende da impegno, tempo e scelte di acquisto. Non garantiamo cifre. Quello che diamo sono metodo, fornitori testati e strumenti.",
          },
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar academyUrl={ACADEMY_URL} />

      <main id="main-content">
        {/* 01 — Hero: INIZIA A FARE RESELLING CON UN METODO */}
        <Hero />

        {/* 02 — ScrollMarquee: pink band (replaces BrandStatement) */}
        <ScrollMarquee />

        {/* 03 — Il Problema: IL PROBLEMA NON È INIZIARE */}
        <ProblemSection />

        {/* 04 — StickyStatement: NON È FORTUNA */}
        <StickyStatement />

        {/* 05 — Il Metodo: ACQUISTA → VENDI → RIPETI (cream bg) */}
        <Metodo />

        {/* 06 — Ecosistema: horizontal pin slides */}
        <Ecosistema />

        {/* 07 — Bot Resellife: IL TUO RADAR SUL MERCATO */}
        <BotSection />

        {/* 08 — Fornitori: NON PARTI DA ZERO (white bg) */}
        <FornitoriSection />

        {/* 09 — Prova Sociale: wall of proof */}
        <ProvaSociale />

        {/* 10 — Video: GUARDA COME FUNZIONA DAVVERO */}
        <VideoSection />

        {/* 11 — Scelta: DA DOVE VUOI PARTIRE? */}
        <Scelta />

        {/* 12 — Quiz: IL RESELL FA PER TE? */}
        <QuizSection />

        {/* 13 — Call: HAI ANCORA DUBBI? */}
        <CallSection />

        {/* 14 — Bonus: INIZIA CON UN VANTAGGIO IN PIÙ */}
        <Bonus />

        {/* 15 — FAQ */}
        <FAQ />

        {/* 16 — CTA finale — bg-viola solid */}
        <section
          id="cta-finale"
          aria-labelledby="cta-finale-heading"
          className="py-16 lg:py-28 bg-viola"
        >
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              id="cta-finale-heading"
              data-reveal="zoom"
              className="font-anton text-[clamp(1.8rem,4vw,3rem)] uppercase text-white mb-4 leading-none"
            >
              PRONTO A INIZIARE?
            </h2>
            <p data-reveal className="text-white/70 font-poppins mb-8 text-sm">
              Fai prima il quiz — scopri se il reselling fa per te in 60 secondi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={QUIZ_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="cta-quiz-finale"
                className="py-4 px-8 rounded-btn bg-white text-inchiostro font-poppins font-bold text-base uppercase hover:bg-crema transition-all hover:scale-[1.02] shadow-lg"
              >
                INIZIA IL QUIZ →
              </a>
              <a
                href={ACADEMY_URL}
                rel="noopener"
                id="cta-academy-finale"
                className="py-4 px-8 rounded-btn border border-white/40 text-white font-poppins font-medium text-base hover:border-white hover:bg-white/10 transition-all"
              >
                Entra in Academy
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 17 — Footer */}
      <Footer />

      {/* Bonus Wheel — global overlay, sessionStorage-gated */}
      <BonusWheel />
    </>
  );
}
