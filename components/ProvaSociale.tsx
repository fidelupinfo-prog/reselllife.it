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

  const videoRef = useRef<HTMLVideoElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  const isHolding = useRef(false);
  const wasHeld = useRef(false);
  const holdTimer = useRef<NodeJS.Timeout | null>(null);
  const isChanging = useRef(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

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
    const prev = activeStory;
    setActiveStory(null);
    if (prev !== null && triggerRefs.current[prev]) {
      triggerRefs.current[prev]?.focus();
    }
  }, [activeStory]);

  const nextStory = useCallback(() => {
    if (activeStory === null || isChanging.current) return;
    isChanging.current = true;
    setTimeout(() => { isChanging.current = false; }, 300);

    if (activeStory < stories.length - 1) {
      setActiveStory(activeStory + 1);
    } else {
      closeViewer();
    }
  }, [activeStory, closeViewer]);

  const prevStory = useCallback(() => {
    if (activeStory === null || isChanging.current) return;
    isChanging.current = true;
    setTimeout(() => { isChanging.current = false; }, 300);

    if (activeStory > 0) {
      setActiveStory(activeStory - 1);
    } else {
      if (videoRef.current) {
        videoRef.current.currentTime = stories[0].start;
      }
    }
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
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || activeStory === null) return;

    const onTimeUpdate = () => {
      setTime(video.currentTime);
      const current = stories[activeStory];
      if (video.currentTime >= current.end) {
        nextStory();
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [activeStory, nextStory]);

  useEffect(() => {
    if (activeStory === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeViewer();
      else if (e.key === "ArrowRight") nextStory();
      else if (e.key === "ArrowLeft") prevStory();
      else if (e.key === " ") {
        e.preventDefault();
        if (videoRef.current) {
          if (videoRef.current.paused) videoRef.current.play();
          else videoRef.current.pause();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeStory, closeViewer, nextStory, prevStory]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.target instanceof Element && e.target.closest("button")) return;
    isHolding.current = true;
    wasHeld.current = false;
    holdTimer.current = setTimeout(() => {
      if (isHolding.current && videoRef.current) {
        videoRef.current.pause();
        wasHeld.current = true;
      }
    }, 200);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.target instanceof Element && e.target.closest("button")) return;
    isHolding.current = false;
    if (holdTimer.current) clearTimeout(holdTimer.current);

    if (wasHeld.current) {
      if (videoRef.current) videoRef.current.play().catch(() => {});
      return;
    }

    if (e.pointerType === "mouse" && e.button !== 0) return;
    
    const clientX = e.clientX;
    const width = window.innerWidth;
    if (clientX > width / 2) {
      nextStory();
    } else {
      prevStory();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const endY = e.changedTouches[0].clientY;
    if (endY - touchStartY.current > 80) {
      closeViewer();
    }
    touchStartY.current = null;
  };

  useEffect(() => {
    if (activeStory === null || !containerRef.current) return;
    const container = containerRef.current;
    const focusable = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) {
      focusable[0].focus();
    }

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (!focusable.length) {
        e.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    
    container.addEventListener("keydown", handleTab);
    return () => container.removeEventListener("keydown", handleTab);
  }, [activeStory]);

  return (
    <section id="risultati" aria-labelledby="risultati-heading" className="py-16 lg:py-28 rl-bg-d relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="risultati-heading" data-reveal="blur" className="font-anton text-[clamp(1.8rem,4vw,3rem)] uppercase text-center text-testo mb-4">
          IL RESELLING, VISTO DALLA NOSTRA COMMUNITY.
        </h2>
        <p data-reveal className="text-center text-testo/60 text-sm max-w-2xl mx-auto mb-10 leading-relaxed">
          Parlano loro. Risultati individuali, non rappresentativi né garantiti, e dipendono dall&apos;impegno e dal tempo dedicato.
        </p>

        <div className="carousel-track" role="list" aria-label="Storie degli studenti">
          {stories.map((story, idx) => (
            <button
              key={story.id}
              role="listitem"
              ref={(el) => {
                triggerRefs.current[idx] = el;
              }}
              onClick={() => {
                isChanging.current = false;
                setActiveStory(idx);
                setTime(story.start);
              }}
              aria-label={`Guarda la testimonianza di ${story.label}`}
              className="carousel-slide relative w-[min(180px,42vw)] aspect-[9/16] rounded-2xl flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-viola text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-viola to-accento rounded-2xl p-[3px]">
                <div className="w-full h-full bg-notte rounded-[13px] overflow-hidden relative">
                  <Image
                    src={story.thumb}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 45vw, 180px"
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white">
                      <Play size={20} className="ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent pt-8 pb-3 px-3">
                    <p className="text-xs font-semibold text-white truncate text-center">
                      {story.label}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeStory !== null && (
        <div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Visualizzatore testimonianze"
          className="fixed inset-0 z-[90] bg-black/90 flex items-center justify-center overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Container: mobile = full screen; desktop = centered 9:16 pillar */}
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
                    <div
                      className="h-full bg-white"
                      style={{ 
                        width, 
                        transition: reducedMotion ? "none" : "width 100ms linear" 
                      }}
                    />
                  </div>
                );
              })}
            </div>

            <div className="absolute top-6 inset-x-4 z-20 flex justify-between items-start pointer-events-none">
              <span className="text-white/80 font-medium text-sm drop-shadow-md px-1">
                {stories[activeStory].label}
              </span>
              <div className="flex gap-3 pointer-events-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeViewer();
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md"
                  aria-label="Chiudi"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div 
              className="flex-1 relative touch-none cursor-pointer"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerLeave={(e) => {
                if (isHolding.current) handlePointerUp(e);
              }}
              onContextMenu={(e) => e.preventDefault()}
            >
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
                <p className="text-white/60 text-[10px] leading-tight max-w-[70%] drop-shadow-md">
                  Risultati individuali, non garantiti.
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md"
                  aria-label={isMuted ? "Attiva audio" : "Disattiva audio"}
                >
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
