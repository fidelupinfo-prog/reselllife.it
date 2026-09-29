"use client";

import { useEffect, useState } from "react";

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    // Show bar after scrolling past hero
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Hide when either form is visible
    const formEls = [
      document.getElementById("form-hero-mobile"),
      document.getElementById("form-cta-finale"),
    ].filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((e) => e.isIntersecting);
        setFormInView(anyVisible);
      },
      { threshold: 0.2 }
    );
    formEls.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  if (!visible || formInView) return null;

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 z-50 p-3 
        rl-bg-b border-t border-bordo
        flex md:hidden
        translate-y-0 transition-transform duration-200
      "
      aria-hidden={!visible}
    >
      <a
        href="#form-hero-mobile"
        className="
          flex-1 py-3.5 px-5 rounded-btn bg-accento text-testo
          font-anton uppercase text-base tracking-wide text-center
          hover:bg-accento-hover transition-colors
        "
      >
        SCARICA LA GUIDA GRATUITA
      </a>
    </div>
  );
}
