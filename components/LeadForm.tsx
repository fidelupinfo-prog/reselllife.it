"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { CheckCircle2 } from "lucide-react";

interface LeadFormProps {
  id?: string;
  formEndpoint: string;
}

type FormState = "idle" | "loading" | "success" | "error";

export default function LeadForm({
  id = "lead-form",
  formEndpoint,
}: LeadFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [started, setStarted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function validate(data: FormData): Record<string, string> {
    const errs: Record<string, string> = {};
    const nome = String(data.get("nome") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const privacy = data.get("privacy");

    if (!nome) errs.nome = "Il nome è obbligatorio.";
    if (!email) {
      errs.email = "L'email è obbligatoria.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Inserisci un indirizzo email valido.";
    }
    if (!privacy) errs.privacy = "Devi accettare per continuare.";
    return errs;
  }

  function handleChange() {
    if (!started) {
      setStarted(true);
      trackEvent("form_start");
    }
    // Clear errors on change
    setErrors({});
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setState("loading");
    trackEvent("form_submit");

    const payload = {
      nome: String(data.get("nome") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      telefono: String(data.get("telefono") ?? "").trim(),
    };

    try {
      const res = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setState("success");
      trackEvent("form_success");
    } catch {
      setState("error");
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackEvent("view_hero");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (formRef.current) observer.observe(formRef.current);
    return () => observer.disconnect();
  }, []);

  if (state === "success") {
    return (
      <div
        id={id}
        className="rl-card p-8 text-center"
        role="alert"
        aria-live="polite"
      >
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-viola/15 border border-viola/30 mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-viola" strokeWidth={1.75} />
        </div>
        <h3 className="font-anton text-2xl uppercase text-accento mb-3">
          Guida inviata!
        </h3>
        <p className="text-testo/80 mb-5 text-sm leading-relaxed">
          Controlla la tua email — trovi il link diretto alla guida.
          <br />
          Nel frattempo, esplora tutto quello che c&apos;è inside:
        </p>
        <a
          href="/guida-gratuita.pdf"
          download
          className="block w-full py-3 px-6 rounded-btn bg-accento text-testo font-anton uppercase text-base tracking-wide text-center hover:bg-accento-hover transition-transform hover:scale-[1.02] active:scale-[0.99]"
        >
          Scarica subito la guida
        </a>
      </div>
    );
  }

  return (
    <form
      id={id}
      ref={formRef}
      onSubmit={handleSubmit}
      onChange={handleChange}
      noValidate
      className="rl-card p-6 md:p-8 space-y-5"
      aria-label="Modulo per scaricare la guida gratuita"
    >
      {/* Nome */}
      <div>
        <label
          htmlFor={`${id}-nome`}
          className="block text-sm font-medium text-testo/80 mb-1.5"
        >
          Nome <span className="text-accento">*</span>
        </label>
        <input
          id={`${id}-nome`}
          name="nome"
          type="text"
          required
          autoComplete="given-name"
          placeholder="Il tuo nome"
          className={`w-full bg-notte border rounded-btn px-4 py-3 text-testo placeholder-testo/30 text-sm focus:outline-none focus:ring-2 focus:ring-viola transition-colors ${
            errors.nome ? "border-red-500" : "border-bordo"
          }`}
          aria-invalid={!!errors.nome}
          aria-describedby={errors.nome ? `${id}-nome-error` : undefined}
        />
        {errors.nome && (
          <p
            id={`${id}-nome-error`}
            className="mt-1 text-xs text-red-400"
            role="alert"
          >
            {errors.nome}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor={`${id}-email`}
          className="block text-sm font-medium text-testo/80 mb-1.5"
        >
          Email <span className="text-accento">*</span>
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="tua@email.com"
          className={`w-full bg-notte border rounded-btn px-4 py-3 text-testo placeholder-testo/30 text-sm focus:outline-none focus:ring-2 focus:ring-viola transition-colors ${
            errors.email ? "border-red-500" : "border-bordo"
          }`}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${id}-email-error` : undefined}
        />
        {errors.email && (
          <p
            id={`${id}-email-error`}
            className="mt-1 text-xs text-red-400"
            role="alert"
          >
            {errors.email}
          </p>
        )}
      </div>

      {/* Telefono — facoltativo */}
      <div>
        <label
          htmlFor={`${id}-telefono`}
          className="block text-sm font-medium text-testo/80 mb-1.5"
        >
          Telefono{" "}
          <span className="text-testo/40 font-normal">(facoltativo)</span>
        </label>
        <input
          id={`${id}-telefono`}
          name="telefono"
          type="tel"
          autoComplete="tel"
          placeholder="+39 XXX XXX XXXX"
          className="w-full bg-notte border border-bordo rounded-btn px-4 py-3 text-testo placeholder-testo/30 text-sm focus:outline-none focus:ring-2 focus:ring-viola transition-colors"
        />
      </div>

      {/* Privacy checkbox — never pre-checked */}
      <div className="flex items-start gap-3">
        <input
          id={`${id}-privacy`}
          name="privacy"
          type="checkbox"
          required
          className="mt-0.5 w-4 h-4 rounded border-bordo accent-viola flex-shrink-0 cursor-pointer"
          aria-invalid={!!errors.privacy}
          aria-describedby={
            errors.privacy ? `${id}-privacy-error` : undefined
          }
        />
        <label
          htmlFor={`${id}-privacy`}
          className="text-xs text-testo/60 leading-relaxed cursor-pointer"
        >
          Ho letto l&apos;
          <a
            href="/informativa-sulla-privacy"
            className="text-viola underline hover:text-viola-hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            informativa sulla privacy
          </a>{" "}
          e acconsento a essere ricontattato via email da Resellife.
        </label>
      </div>
      {errors.privacy && (
        <p
          id={`${id}-privacy-error`}
          className="text-xs text-red-400 -mt-3"
          role="alert"
        >
          {errors.privacy}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={state === "loading"}
        onClick={() => trackEvent("cta_guida_click")}
        className="w-full py-4 px-6 rounded-btn bg-accento text-testo font-anton uppercase text-lg tracking-wide hover:bg-accento-hover transition-all hover:scale-[1.02] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {state === "loading" ? "Invio in corso…" : "SCARICA LA GUIDA"}
      </button>

      {state === "error" && (
        <p className="text-sm text-red-400 text-center" role="alert">
          Si è verificato un errore. Riprova o scrivici su WhatsApp.
        </p>
      )}
    </form>
  );
}
