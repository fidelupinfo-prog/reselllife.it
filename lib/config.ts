/**
 * lib/config.ts — Single source of truth for all external URLs and env vars.
 *
 * PLACEHOLDERS PENDIENTES:
 *   NEXT_PUBLIC_ACADEMY_URL   ← BLOQUEANTE — completare prima del deploy
 *   NEXT_PUBLIC_FORM_ENDPOINT ← destino del formulario di lead
 *   NEXT_PUBLIC_CALENDLY_URL  ← Calendly
 *   NEXT_PUBLIC_GA4_ID        ← Google Analytics 4
 *   NEXT_PUBLIC_META_PIXEL_ID ← Meta Pixel
 *   NEXT_PUBLIC_TIKTOK_PIXEL_ID ← TikTok Pixel
 *
 * NOTA: le variabili NEXT_PUBLIC_ sono inlinate nel bundle client al momento
 * della compilazione da Turbopack/webpack. Il controllo di validità avviene
 * a build-time nei Server Components — non in runtime nel browser.
 */

function get(key: string, fallback = ""): string {
  // In client bundles, NEXT_PUBLIC_ vars are statically replaced at compile time.
  // In server context, process.env is available normally.
  return process.env[key] ?? fallback;
}

// ── Academy URL ──
// Completare NEXT_PUBLIC_ACADEMY_URL nelle env vars Railway (produzione)
// e in .env.local (sviluppo) con l'URL reale del checkout Academy.
// Fallback temporaneo: WhatsApp per non lasciare un link rotto.
export const ACADEMY_URL =
  get("NEXT_PUBLIC_ACADEMY_URL") ||
  "https://wa.me/393398420279?text=Ciao%2C+voglio+entrare+in+Academy+Resellife";

export const FORM_ENDPOINT = get(
  "NEXT_PUBLIC_FORM_ENDPOINT",
  "https://httpbin.org/post"
);

export const CALENDLY_URL = get(
  "NEXT_PUBLIC_CALENDLY_URL",
  "https://calendly.com/resellifeacademy/30min"
);

export const COACHING_APPLY_URL = get(
  "NEXT_PUBLIC_COACHING_APPLY_URL",
  "https://tally.so/r/Xx7jqO"
);

// ── Canonical external links ──
export const WHATSAPP_URL =
  "https://wa.me/393398420279?text=Ciao%2C+ho+visto+Resellife+e+vorrei+saperne+di+pi%C3%B9";
export const FORNITORI_URL = "/fornitori";
export const INSTAGRAM_URL = "https://www.instagram.com/resellife_/";
export const TIKTOK_URL = "https://www.tiktok.com/@_resellife._";
// Quiz — sostituire con URL proprietario quando pronto
export const QUIZ_URL = get(
  "NEXT_PUBLIC_QUIZ_URL",
  "https://tally.so/r/81Je8o"
);

// ── Analytics (empty string = disabled) ──
export const GA4_ID = get("NEXT_PUBLIC_GA4_ID");
export const META_PIXEL_ID = get("NEXT_PUBLIC_META_PIXEL_ID");
export const TIKTOK_PIXEL_ID = get("NEXT_PUBLIC_TIKTOK_PIXEL_ID");

// ── Feature flags ──
export const SHOW_BOT_SECTION =
  get("NEXT_PUBLIC_SHOW_BOT_SECTION", "true") === "true";

export const SHOW_COLLAB_LABEL =
  get("NEXT_PUBLIC_SHOW_COLLAB_LABEL", "true") === "true";

// ── Site metadata ──
export const SITE_URL = get(
  "NEXT_PUBLIC_SITE_URL",
  "https://www.resellife.it"
);
