"use client";

import { useEffect } from "react";

/**
 * RevealObserver — renders nothing, mounts once in layout.
 * Adds class `reveal-ready` to <html> so CSS initial states activate.
 * Uses IntersectionObserver + MutationObserver to add `is-revealed`
 * to elements with data-reveal or data-reveal-line.
 * Server components can use reveals just by adding these attributes.
 */
export default function RevealObserver() {
  useEffect(() => {
    // Mark html so CSS hidden states engage
    document.documentElement.classList.add("reveal-ready");

    const THRESHOLD = 0.15;
    const ROOT_MARGIN = "0px 0px -8% 0px";

    function observe(el: Element) {
      io.observe(el);
    }

    function revealAll(root: Element | Document = document) {
      root
        .querySelectorAll("[data-reveal], [data-reveal-line]")
        .forEach(observe);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: THRESHOLD, rootMargin: ROOT_MARGIN }
    );

    // Observe existing elements
    revealAll();

    // Watch for new elements added to DOM
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          const el = node as Element;
          if (
            el.hasAttribute("data-reveal") ||
            el.hasAttribute("data-reveal-line")
          ) {
            observe(el);
          }
          // Also check descendants
          el
            .querySelectorAll?.("[data-reveal], [data-reveal-line]")
            .forEach(observe);
        });
      });
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
