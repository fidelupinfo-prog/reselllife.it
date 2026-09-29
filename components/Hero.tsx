"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { QUIZ_URL } from "@/lib/config";

const VIDEO_SRC    = "/videos/sito/video-principale.mp4";
const VIDEO_POSTER = "/videos/sito/thumb-principale.jpg";
// TODO: logo reale → aggiungere /public/logo.png da Drive 01_LOGO e abilitare in Navbar.tsx

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const [videoReady,  setVideoReady]  = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { trackEvent("view_hero"); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
    const onCan = () => setVideoReady(true);
    v.addEventListener("canplaythrough", onCan);
    return () => v.removeEventListener("canplaythrough", onCan);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero Resellife Academy"
      className="relative min-h-screen flex items-end overflow-hidden"
    >
      {/* ── VIDEO FULLSCREEN ── */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        poster={VIDEO_POSTER}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />

      {/* Poster visibile finché il video non è pronto */}
      {!videoReady && (
        <div
          aria-hidden
          className="absolute inset-0 bg-notte"
          style={{
            backgroundImage: `url(${VIDEO_POSTER})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* ── OVERLAY: gradiente basso → alto, legibilità testo ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(13,7,20,0.96) 0%, rgba(13,7,20,0.6) 40%, rgba(13,7,20,0.25) 100%)",
        }}
      />

      {/* ── CONTENUTO — allineato in basso ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 lg:pb-24">
        <div className="max-w-3xl">

          {/* Numero sezione editoriale */}
          <p className="rl-section-num mb-4">— 01</p>

          {/* H1 */}
          <h1 className="hero-animate-h1 font-anton text-[clamp(3rem,8vw,6.5rem)] leading-[0.93] uppercase tracking-tight text-white mb-6">
            INIZIA A FARE
            <br />
            RESELLING
            <br />
            <span className="text-viola">CON UN METODO.</span>
          </h1>

          <p className="hero-animate-sub font-poppins text-[clamp(0.95rem,1.8vw,1.1rem)] text-white/65 leading-relaxed max-w-xl mb-8">
            Fornitori verificati, Bot Resellife, guide operative e community.
            Tutto quello che serve per iniziare — senza andare a tentativi.
          </p>

          {/* CTAs */}
          <div className="hero-animate-cta flex flex-col sm:flex-row gap-3">
            <a
              href={QUIZ_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("cta_quiz_hero")}
              id="cta-quiz-hero"
              className="py-4 px-7 rounded-btn bg-viola text-white font-poppins font-bold text-sm uppercase tracking-wide hover:bg-viola-hover transition-colors whitespace-nowrap"
            >
              SCOPRI SE FA PER TE →
            </a>
            <a
              href="#scelta"
              onClick={() => trackEvent("cta_academy_hero")}
              id="cta-academy-hero"
              className="py-4 px-7 rounded-btn border border-white/25 text-white font-poppins font-medium text-sm uppercase tracking-wide hover:border-white/50 hover:bg-white/5 transition-colors whitespace-nowrap"
            >
              SCOPRI L&apos;ACADEMY
            </a>
          </div>
        </div>
      </div>

      {/* ── Linea divisore in basso ── */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 rl-divider"
      />
    </section>
  );
}
