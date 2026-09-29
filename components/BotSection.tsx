"use client";

import { SHOW_BOT_SECTION } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";
import { useEffect, useRef, useState } from "react";

const FLOW = ["TROVA", "VALUTA", "ACQUISTA", "RIVENDI"];

export default function BotSection() {
  if (!SHOW_BOT_SECTION) return null;

  return <BotSectionInner />;
}

function BotSectionInner() {
  const [statusIdx, setStatusIdx] = useState(0);
  const [flowActive, setFlowActive] = useState(-1);
  const [activeChip, setActiveChip] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const animating = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animating.current) {
          animating.current = true;
          // Status animation
          const cycleStatus = () => {
            setStatusIdx((prev) => (prev + 1) % 4);
            setTimeout(cycleStatus, 850);
          };
          cycleStatus();

          // Messages animation
          let m = 0;
          const cycleMsg = () => {
            m = (m + 1) % 4;
            setMsgIdx(m);
            if (m === 0) {
              setTimeout(cycleMsg, 2000);
            } else {
              setTimeout(cycleMsg, 800);
            }
          };
          cycleMsg();

          FLOW.forEach((_, idx) => {
            setTimeout(() => setFlowActive(idx), idx * 600 + 1200);
          });
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="sec bot" id="bot" aria-labelledby="bot-h">
      <div className="wrap relative z-10 mx-auto px-4 max-w-7xl">
        <p className="eyebrow" data-reveal>Lo strumento</p>
        <h2 className="h" id="bot-h" data-reveal style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
          Il tuo radar<br /><span className="o">sul mercato.</span>
        </h2>
        <p className="sub" data-reveal style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
          Il Bot scansiona il mercato 24/7. Quando c&apos;è qualcosa che vale, ti arriva una notifica.
        </p>

        <div className="stage" data-reveal="zoom">
          <div className="radar" aria-hidden="true">
            <span className="blip" style={{ "--t": "0s", top: "20%", left: "26%" } as React.CSSProperties}></span>
            <span className="blip" style={{ "--t": ".8s", top: "60%", left: "82%" } as React.CSSProperties}></span>
            <span className="blip" style={{ "--t": "1.6s", top: "80%", left: "34%" } as React.CSSProperties}></span>
          </div>

          <div className="phone" aria-label="Esempio di notifiche del Bot Resellife" onClick={() => trackEvent("bot_panel_click")}>
            <div className="screen">
              <div className="pbar">
                <div className="avatar" aria-hidden="true">R</div>
                <div><b>Bot Resellife</b><small><i></i>scansione attiva</small></div>
                <span className={`state ${statusIdx === 1 ? 'found' : ''}`} id="state">
                  {statusIdx === 0 ? "SCAN" : statusIdx === 1 ? "FOUND" : statusIdx === 2 ? "ALERT" : "BUY?"}
                </span>
              </div>
              <div className="feed" id="feed">
                <div className={`msg ${msgIdx >= 1 ? 'show' : ''} ${msgIdx === 1 ? 'hl' : ''}`}>
                  <span className="tag bg-red-500">URGENTE</span>
                  <b>Ralph Lauren · 2€</b>
                  <span className="s">Sotto il valore di mercato</span>
                </div>
                <div className={`msg ${msgIdx >= 2 ? 'show' : ''} ${msgIdx === 2 ? 'hl' : ''}`}>
                  <span className="tag">OCCASIONE</span>
                  <b>Sneaker premium</b>
                  <span className="s">Sotto la media di categoria</span>
                </div>
                <div className={`msg ${msgIdx >= 3 ? 'show' : ''} ${msgIdx === 3 ? 'hl' : ''}`}>
                  <span className="tag bg-emerald-500">VALUTA</span>
                  <b>Trend stagionale</b>
                  <span className="s">Finestra limitata</span>
                </div>
              </div>
            </div>
          </div>

          <ul className="chips" id="types">
            <li>
              <button 
                className={`chip c1 ${activeChip === 0 ? 'on' : ''}`} 
                onClick={() => setActiveChip(0)}
                title="Chi pubblica non conosce il valore reale del capo. Il Bot intercetta questi errori prima che vengano corretti."
              >
                <span className="n">01</span>
                <span><b>Errori di prezzo</b><small>Prima che vengano corretti</small></span>
              </button>
            </li>
            <li>
              <button 
                className={`chip c2 ${activeChip === 1 ? 'on' : ''}`} 
                onClick={() => setActiveChip(1)}
                title="Occasioni dove il venditore ha fretta e accetta un margine ridotto."
              >
                <span className="n">02</span>
                <span><b>Sottoprezzati</b><small>Margini alti, tempi brevi</small></span>
              </button>
            </li>
            <li>
              <button 
                className={`chip c3 ${activeChip === 2 ? 'on' : ''}`} 
                onClick={() => setActiveChip(2)}
                title="Alert su prodotti ad alta probabilità di rivendita rapida."
              >
                <span className="n">03</span>
                <span><b>Da valutare</b><small>Prima che la visibilità scada</small></span>
              </button>
            </li>
          </ul>
        </div>

        <div className="flow" id="flow">
          <div className="track">
            <div className="rail" aria-hidden="true">
              <i id="rail" style={{ transform: flowActive >= 0 ? `scaleX(${(flowActive / 3) * 100}%)` : "scaleX(0)" }}></i>
            </div>
            {FLOW.map((step, i) => (
              <div key={i} className={`stp ${flowActive >= i ? 'on' : ''}`}>
                <span className="n">{i + 1}</span>
                <b>{step}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
