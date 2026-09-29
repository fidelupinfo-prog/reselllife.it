"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Play, Volume2, VolumeX, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const stories = [
  { id: 1, start: 0,    end: 8.7,  label: "Studente 1", thumb: "/videos/dicono/thumb-1.jpg" },
  { id: 2, start: 8.7,  end: 24.3, label: "Studente 2", thumb: "/videos/dicono/thumb-2.jpg" },
  { id: 3, start: 24.3, end: 33.5, label: "Studente 3", thumb: "/videos/dicono/thumb-3.jpg" },
  { id: 4, start: 33.5, end: 40.7, label: "Studente 4", thumb: "/videos/dicono/thumb-4.jpg" },
  { id: 5, start: 40.7, end: 46.1, label: "Studente 5", thumb: "/videos/dicono/thumb-5.jpg" },
];

export default function ProvaSociale() {
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  const [centerIdx, setCenterIdx] = useState(2);
  const [openFactor, setOpenFactor] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Scroll listener for fan
  useEffect(() => {
    const handleScroll = () => {
      if (reducedMotion) {
        setOpenFactor(1);
        return;
      }
      if (!fanRef.current) return;
      const fn = fanRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const fp2 = Math.min(1, Math.max(0, (vh * 0.75 - fn.top) / (vh * 0.6)));
      setOpenFactor(fp2 * 1.8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reducedMotion]);

  useEffect(() => {
    if (activeStory !== null) {
      document.body.style.overflow = "hidden";
      trackEvent("testimonial_open", { story: stories[activeStory].id });
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeStory]);

  const closeViewer = useCallback(() => {
    setActiveStory(null);
  }, []);

  const nextStory = useCallback(() => {
    if (activeStory === null) return;
    if (activeStory < stories.length - 1) setActiveStory(activeStory + 1);
    else closeViewer();
  }, [activeStory, closeViewer]);

  const prevStory = useCallback(() => {
    if (activeStory === null) return;
    if (activeStory > 0) setActiveStory(activeStory - 1);
    else if (videoRef.current) videoRef.current.currentTime = stories[0].start;
  }, [activeStory]);

  useEffect(() => {
    const video = videoRef.current;
    if (video && activeStory !== null) {
      video.currentTime = stories[activeStory].start;
      video.play().catch(() => {
        setIsMuted(true);
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, [activeStory]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || activeStory === null) return;
    const onTimeUpdate = () => {
      setTime(video.currentTime);
      if (video.currentTime >= stories[activeStory].end) nextStory();
    };
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [activeStory, nextStory]);

  return (
    <section id="risultati" aria-labelledby="risultati-heading" className="sec prova relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="risultati-heading" data-reveal="blur" className="h">
          Il reselling, visto dalla nostra <span className="gt">community.</span>
        </h2>
        <p data-reveal className="note" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          Parlano loro. Risultati individuali, non rappresentativi né garantiti, e dipendono dall&apos;impegno e dal tempo dedicato.
        </p>

        <div className="fan" id="fan" ref={fanRef}>
          {stories.map((story, i) => {
            const d = i - centerIdx;
            let rot = d * 5 * openFactor;
            let y = Math.abs(d) * 12 * openFactor;
            if (centerIdx === i) {
              rot = 0; y = 0;
            }

            return (
              <button
                key={story.id}
                onClick={() => {
                  if (centerIdx !== i) {
                    setCenterIdx(i);
                  } else {
                    setActiveStory(i);
                    setTime(story.start);
                  }
                }}
                aria-label={`Studente ${i + 1}`}
                className={`story ${centerIdx === i ? 'active' : ''}`}
                style={{ transform: `rotate(${rot}deg) translateY(${y}px)` }}
              >
                <div className="bars"><i></i><i></i><i></i></div>
                <Image src={story.thumb} alt="" fill sizes="(max-width: 640px) 45vw, 230px" className="object-cover" />
                <span className="play" aria-hidden="true">▶</span>
                <span className="who"><i></i>{story.label}</span>
              </button>
            );
          })}
        </div>
        <p className="hint">Tocca una storia per portarla al centro</p>
      </div>

      {activeStory !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[90] bg-black/90 flex items-center justify-center overflow-hidden"
        >
          <div className="relative w-full h-full sm:w-[calc(95vh*(9/16))] sm:h-[95vh] sm:rounded-2xl overflow-hidden bg-black flex flex-col">
            <div className="absolute top-0 inset-x-0 z-20 flex gap-1 px-2 pt-2 sm:pt-4">
              {stories.map((s, i) => {
                let width = "0%";
                if (i < activeStory) width = "100%";
                else if (i === activeStory) {
                  const p = Math.max(0, Math.min(100, ((time - s.start) / (s.end - s.start)) * 100));
                  width = `${p}%`;
                }
                return (
                  <div key={s.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
                    <div className="h-full bg-white" style={{ width }} />
                  </div>
                );
              })}
            </div>

            <div className="absolute top-6 inset-x-4 z-20 flex justify-between items-start pointer-events-none">
              <span className="text-white/80 font-medium text-sm drop-shadow-md px-1">
                {stories[activeStory].label}
              </span>
              <button onClick={(e) => { e.stopPropagation(); closeViewer(); }} className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md pointer-events-auto">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 relative touch-none cursor-pointer" onClick={() => {
              if (videoRef.current) {
                if (videoRef.current.paused) videoRef.current.play();
                else videoRef.current.pause();
              }
            }}>
              <video
                ref={videoRef}
                src="/videos/dicono/dicono-di-noi.mp4"
                poster="/videos/dicono/dicono-di-noi-poster.jpg"
                className="w-full h-full object-cover pointer-events-none"
                playsInline
                preload="metadata"
                muted={isMuted}
              />
            </div>
            
            <div className="absolute bottom-4 inset-x-4 z-20 flex flex-col gap-3 pointer-events-none">
              <div className="flex justify-between items-end pointer-events-auto">
                <p className="text-white/60 text-[10px] leading-tight max-w-[70%] drop-shadow-md">Risultati individuali, non garantiti.</p>
                <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md">
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
