"use client";

import { WHATSAPP_URL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

export default function Community() {
  return (
    <section
      id="community"
      aria-labelledby="community-heading"
      className="py-16 lg:py-28 rl-bg-a relative overflow-hidden"
    >

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          id="community-heading"
          className="font-anton text-[clamp(2rem,5vw,4rem)] uppercase text-testo leading-none mb-6"
        >
          NON LO FAI
          <br />
          <span className="text-accento">DA SOLO</span>
        </h2>

        <p className="text-testo/65 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          700+ ragazzi italiani nella community privata. Ci si scambiano
          occasioni, dubbi e risultati — e noi rispondiamo tutti i giorni.
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-10">
          {[
            { value: "700+", label: "ragazzi" },
            { value: "ogni giorno", label: "supporto" },
            { value: "24h", label: "risposte" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rl-card p-4"
            >
              <p className="font-anton text-xl text-testo">{stat.value}</p>
              <p className="text-xs text-testo/40 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <a
          href={WHATSAPP_URL}
          onClick={() => trackEvent("whatsapp_click")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 py-4 px-8 rounded-btn bg-[#25D366] text-white font-semibold text-base hover:bg-[#1ebe5d] transition-all hover:scale-[1.02] active:scale-[0.99] shadow-lg shadow-[rgba(37,211,102,0.25)]"
        >
          {/* WhatsApp icon */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Entra nella community
        </a>

        <p className="text-xs text-testo/30 mt-4">
          Canale ufficiale: WhatsApp · wa.me/393398420279
        </p>
      </div>
    </section>
  );
}
