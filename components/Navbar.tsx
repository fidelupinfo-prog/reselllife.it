"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ACADEMY_URL, QUIZ_URL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

interface NavbarProps {
  academyUrl: string;
}

// Logo: aggiungi /public/logo.png dall'asset reale (Drive 01_LOGO) e cambia il valore qui sotto a false
// TODO: quando il file logo.png è caricato in /public/, imposta LOGO_MISSING = false
const LOGO_MISSING = true;
const LOGO_SRC = "/logo.png";

export default function Navbar({ academyUrl }: NavbarProps) {
  const [scrolled, setScrolled]         = useState(false);
  // logoError: inizia a true perché /public/logo.png non esiste ancora (HTTP 400 in produzione)
  // Quando il file viene aggiunto, impostare LOGO_MISSING = false in cima al file
  const [logoError, setLogoError]       = useState(LOGO_MISSING);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-notte/95 backdrop-blur-md border-b border-bordo/60 shadow-[0_4px_24px_rgba(0,0,0,0.4)] h-14"
          : "bg-transparent border-b border-transparent h-16"
      }`}
      aria-label="Navigazione principale"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

        {/* ── Logo / brand ── */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity duration-200"
          aria-label="Resellife Academy — homepage"
        >
          {!logoError ? (
            <Image
              src={LOGO_SRC}
              alt="Resellife Academy"
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
              onError={() => setLogoError(true)}
              priority
            />
          ) : (
            <span className="font-anton text-xl uppercase text-testo tracking-wide">
              Resellife <span className="text-viola">Academy</span>
            </span>
          )}
        </Link>

        {/* ── Desktop nav links ── */}
        <div className="hidden md:flex items-center gap-6 text-sm text-testo/60">
          <Link href="#metodo" className="hover:text-testo transition-colors duration-150">
            Metodo
          </Link>
          <Link href="#ecosistema" className="hover:text-testo transition-colors duration-150">
            Academy
          </Link>
          <Link href="#bot" className="hover:text-testo transition-colors duration-150">
            Bot
          </Link>
          <Link href="#fornitori" className="hover:text-testo transition-colors duration-150">
            Fornitori
          </Link>
          <a
            href={QUIZ_URL}
            onClick={() => trackEvent("quiz_click_nav")}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-testo transition-colors duration-150"
          >
            Quiz
          </a>
          <a
            href={academyUrl}
            onClick={() => trackEvent("academy_click_nav")}
            className="py-2 px-5 rounded-btn bg-viola text-testo font-semibold text-sm hover:bg-viola-hover transition-all hover:scale-[1.02] shadow-sm shadow-viola/30"
            rel="noopener"
          >
            Entra in Academy
          </a>
        </div>

        {/* ── Mobile: quiz CTA ── */}
        <a
          href={QUIZ_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("quiz_click_nav_mobile")}
          className="md:hidden py-2 px-4 rounded-btn border border-viola text-viola font-semibold text-xs hover:bg-viola/10 transition-colors"
        >
          Fai il quiz
        </a>
      </div>
    </nav>
  );
}
