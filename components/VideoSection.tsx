"use client";

import { useEffect, useRef, useState, useCallback, useId } from "react";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   VIDEO DATA
   ───────────────────────────────────────────────────────── */
const videos = [
  {
    id: "principale",
    src: "/videos/sito/video-principale.mp4",
    poster: "/videos/sito/thumb-principale.jpg",
    title: "IL METODO RESELLIFE",
    subtitle: "Come funziona l'Academy",
    tag: "Academy",
    tagColor: "bg-viola/80 text-white",
    loop: true,
  },
  {
    id: "testimonial",
    src: "/videos/sito/video-story-2.mp4",
    poster: "/videos/sito/thumb-story-2.jpg",
    title: "DICONO DI NOI",
    subtitle: "Community · Risultati reali",
    tag: "Testimonial",
    tagColor: "bg-accento/80 text-white",
    loop: true,
  },
  {
    id: "bot",
    src: "/videos/sito/video-bot-demo.mp4",
    poster: "/videos/sito/thumb-bot.jpg",
    title: "IL BOT IN AZIONE",
    subtitle: "Ralph Lauren a €2 — demo live",
    tag: "Bot",
    tagColor: "bg-viola/80 text-white",
    loop: true,
  },
  {
    id: "vip",
    src: "/videos/sito/video-vip.mp4",
    poster: "/videos/sito/thumb-vip.jpg",
    title: "I VIP RESELLIFE",
    subtitle: "Lorenzo Xavier Fierro · 164K",
    tag: "Community",
    tagColor: "bg-white/20 text-white",
    loop: true,
  },
];

/* ─────────────────────────────────────────────────────────
   Single video reel card — autoplays when visible
   ───────────────────────────────────────────────────────── */
function ReelCard({
  video,
  globalMuted,
  onToggleMute,
  index,
  sectionVisible,
}: {
  video: (typeof videos)[0];
  globalMuted: boolean;
  onToggleMute: () => void;
  index: number;
  sectionVisible: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  /* Intersection Observer — autoplay quando visibile */
  useEffect(() => {
    const el = cardRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.intersectionRatio >= 0.5;
        setIsVisible(visible);
        if (visible) {
          video.muted = globalMuted;
          video
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {
              video.muted = true;
              video.play().then(() => setIsPlaying(true)).catch(() => {});
            });
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: [0.3, 0.5, 0.8] }
    );

    obs.observe(el);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // solo al mount

  /* Sync global mute */
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = globalMuted;
  }, [globalMuted]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      ref={cardRef}
      id={`reel-${video.id}`}
      className="relative flex-shrink-0 w-[min(280px,72vw)] sm:w-72 lg:w-64 xl:w-72 aspect-[9/16] rounded-2xl overflow-hidden bg-notte border border-bordo group"
      style={{
        opacity: sectionVisible ? 1 : 0,
        transform: sectionVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
        transition: `opacity 0.55s ease ${index * 120}ms, transform 0.55s ease ${index * 120}ms`,
      }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={video.src}
        poster={video.poster}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted={globalMuted}
        loop={video.loop}
        preload="metadata"
      />

      {/* Gradient scuro bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

      {/* Glow ring quando visibile */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500"
        style={{
          boxShadow: isVisible
            ? "inset 0 0 0 2px rgba(123,47,214,0.7), 0 0 30px rgba(123,47,214,0.25)"
            : "inset 0 0 0 1px rgba(42,26,64,1)",
        }}
      />

      {/* Tag */}
      <div className="absolute top-3 left-3">
        <span className={`text-[10px] font-poppins font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm ${video.tagColor}`}>
          {video.tag}
        </span>
      </div>

      {/* Mute + Play controls (top right) */}
      <div className="absolute top-3 right-3 flex flex-col gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); onToggleMute(); }}
          aria-label={globalMuted ? "Attiva audio" : "Silenzia"}
          className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors"
        >
          {globalMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </div>

      {/* Centro — play/pause tap */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pausa" : "Riproduci"}
        className="absolute inset-0 w-full h-full flex items-center justify-center"
      >
        {/* Icona centrale solo se in pausa */}
        {!isPlaying && (
          <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <Play size={22} className="ml-1 text-white" fill="currentColor" />
          </div>
        )}
      </button>

      {/* Bottom text */}
      <div className="absolute bottom-0 inset-x-0 px-4 pb-4 pointer-events-none">
        <p className="text-white/60 font-poppins text-[11px] mb-0.5">{video.subtitle}</p>
        <h3 className="font-anton text-base uppercase text-white leading-tight">{video.title}</h3>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN SECTION
   ───────────────────────────────────────────────────────── */
export default function VideoSection() {
  const [globalMuted, setGlobalMuted] = useState(true);
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingId = useId();

  const toggleMute = useCallback(() => setGlobalMuted((m) => !m), []);

  /* Section entry */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="video"
      aria-labelledby={headingId}
      className="py-16 lg:py-28 rl-bg-a relative overflow-hidden"
    >

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div
          className="mb-10 lg:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div>
            <p className="text-viola font-poppins font-semibold text-sm uppercase tracking-[0.2em] mb-3">
              Video & Contenuti
            </p>
            <h2
              id={headingId}
              className="font-anton text-[clamp(2rem,5vw,3.5rem)] uppercase text-testo leading-none"
            >
              GUARDA COME
              <br />
              <span className="text-viola">FUNZIONA DAVVERO</span>
            </h2>
          </div>

          {/* Global mute toggle */}
          <button
            onClick={toggleMute}
            aria-label={globalMuted ? "Attiva audio per tutti i video" : "Silenzia tutti i video"}
            className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-xl rl-card hover:border-viola/50 transition-all duration-300 group"
          >
            {globalMuted ? (
              <VolumeX size={16} className="text-muted/60 group-hover:text-viola transition-colors" />
            ) : (
              <Volume2 size={16} className="text-viola" />
            )}
            <span className="font-poppins text-sm font-medium text-muted/60 group-hover:text-testo transition-colors">
              {globalMuted ? "Attiva audio" : "Silenzia"}
            </span>
          </button>
        </div>

        {/* ── Reels grid / horizontal scroll on mobile ── */}
        <div
          className="
            flex gap-4 overflow-x-auto pb-4
            lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0
            scroll-smooth snap-x snap-mandatory
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          "
          role="list"
          aria-label="Video Resellife"
        >
          {videos.map((video, i) => (
            <div key={video.id} role="listitem" className="snap-center">
              <ReelCard
                video={video}
                globalMuted={globalMuted}
                onToggleMute={toggleMute}
                index={i}
                sectionVisible={sectionVisible}
              />
            </div>
          ))}
        </div>

        {/* ── Swipe hint mobile only ── */}
        <p
          className="mt-5 text-center text-muted/40 text-xs font-poppins lg:hidden"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transition: "opacity 0.6s ease 0.6s",
          }}
        >
          ← Scorri per vedere tutti i video →
        </p>

        {/* ── Disclaimer ── */}
        <p
          className="mt-6 text-center text-testo/20 text-[11px] font-poppins max-w-xl mx-auto leading-relaxed"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transition: "opacity 0.6s ease 0.7s",
          }}
        >
          I risultati mostrati sono individuali e non garantiti. Dipendono dall&apos;impegno e dal tempo dedicato.
        </p>
      </div>
    </section>
  );
}
