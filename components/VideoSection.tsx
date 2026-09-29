"use client";

import { useState, useRef } from "react";
import Image from "next/image";

const videos = [
  {
    id: "principale",
    src: "/videos/sito/video-principale.mp4",
    poster: "/videos/sito/thumb-principale.jpg",
    title: "Il metodo Resellife",
    subtitle: "Come funziona l'Academy",
    tag: "Academy",
    tagColor: "var(--color-viola)",
  },
  {
    id: "testimonial",
    src: "/videos/sito/video-story-2.mp4",
    poster: "/videos/sito/thumb-story-2.jpg",
    title: "Dicono di noi",
    subtitle: "Community · Risultati reali",
    tag: "Testimonial",
    tagColor: "var(--color-accento)",
  },
  {
    id: "bot",
    src: "/videos/sito/video-bot-demo.mp4",
    poster: "/videos/sito/thumb-bot.jpg",
    title: "Il bot in azione",
    subtitle: "Ralph Lauren a €2 — demo live",
    tag: "Bot",
    tagColor: "var(--color-blu)",
  },
  {
    id: "vip",
    src: "/videos/sito/video-vip.mp4",
    poster: "/videos/sito/thumb-vip.jpg",
    title: "I Vip Resellife",
    subtitle: "Lorenzo Xavier Fierro · 164K",
    tag: "Community",
    tagColor: "#888",
  },
];

export default function VideoSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [globalMuted, setGlobalMuted] = useState(true);
  const [swap, setSwap] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeVideo = videos[activeIdx];

  const handleSelect = (idx: number) => {
    if (idx === activeIdx) return;
    setSwap(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setIsPlaying(false);
      setSwap(false);
    }, 250);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    setGlobalMuted(!globalMuted);
  };

  return (
    <section className="sec vid py-16 lg:py-28" id="video">
      <div className="wrap relative z-10 mx-auto px-4 max-w-7xl">
        <div className="grid-layout">
          <div className={`player ${swap ? 'swap' : ''}`} id="player" data-reveal="zoom">
            <video
              ref={videoRef}
              src={activeVideo.src}
              poster={activeVideo.poster}
              muted={globalMuted}
              playsInline
              loop
              onClick={togglePlay}
              className={isPlaying ? "opacity-100" : "opacity-0"}
              style={{ position: isPlaying ? "relative" : "absolute", zIndex: isPlaying ? 10 : -1 }}
            />
            {!isPlaying && (
              <img src={activeVideo.poster} alt={activeVideo.title} onClick={togglePlay} className="absolute inset-0 w-full h-full object-cover cursor-pointer z-0" />
            )}
            
            {!isPlaying && (
              <div className="ov z-10">
                <div className="topb">
                  <span className="pill" style={{ "--c": activeVideo.tagColor } as React.CSSProperties}>{activeVideo.tag}</span>
                  <button className="audio" type="button" onClick={(e) => { e.stopPropagation(); toggleMute(); }}>
                    {globalMuted ? "🔈 Attiva audio" : "🔊 Disattiva audio"}
                  </button>
                </div>
                <div className="ttl">
                  <small>{activeVideo.subtitle}</small>
                  <b>{activeVideo.title}</b>
                  <div className="prog"><i className={swap ? "" : "run"}></i></div>
                </div>
              </div>
            )}
            {!isPlaying && (
              <button className="bigplay z-20" type="button" aria-label="Riproduci video" onClick={togglePlay}>▶</button>
            )}
          </div>

          <div>
            <h2 data-reveal>
              Guarda come<br />funziona davvero
            </h2>
            <ul className="list">
              {videos.map((vid, idx) => (
                <li key={vid.id} data-reveal style={{ "--reveal-delay": `${idx * 120}ms` } as React.CSSProperties}>
                  <button className={`item ${idx === activeIdx ? 'on' : ''}`} onClick={() => handleSelect(idx)}>
                    <Image src={vid.poster} alt={vid.title} width={78} height={78} className="object-cover" />
                    <div className="text-left w-full">
                      <span className="pill" style={{ "--c": vid.tagColor } as React.CSSProperties}>{vid.tag}</span>
                      <small>{vid.subtitle}</small>
                      <b>{vid.title}</b>
                    </div>
                    <span className="eq" aria-hidden="true"><i></i><i></i><i></i></span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="note" data-reveal>I risultati mostrati sono individuali e non garantiti. Dipendono dall&apos;impegno e dal tempo dedicato.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
