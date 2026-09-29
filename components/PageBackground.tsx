"use client";

import { useEffect, useRef } from "react";

/**
 * PageBackground — fullpage fixed canvas background.
 * Renders: animated grid + floating light orbs + noise texture.
 * Lives behind all content (z-0), fixed to viewport.
 */
export default function PageBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let W = 0, H = 0;

    // ── Orbs ──────────────────────────────────────────────────────────────────
    type Orb = {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
      color: string;
      opacity: number;
    };

    const ORB_COLORS = [
      "123,47,214",   // viola
      "100,30,180",   // viola scuro
      "255,31,168",   // magenta accento
      "80,20,160",    // viola deep
    ];

    const orbs: Orb[] = [];

    const makeOrbs = () => {
      orbs.length = 0;
      const count = Math.min(6, Math.floor(W / 250));
      for (let i = 0; i < count; i++) {
        orbs.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: 180 + Math.random() * 300,
          color: ORB_COLORS[Math.floor(Math.random() * ORB_COLORS.length)],
          opacity: 0.06 + Math.random() * 0.08,
        });
      }
    };

    // ── Resize ────────────────────────────────────────────────────────────────
    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = document.documentElement.scrollHeight;
      canvas.style.height = H + "px";
      makeOrbs();
    };

    window.addEventListener("resize", resize);
    resize();

    // ── Draw grid ─────────────────────────────────────────────────────────────
    const drawGrid = () => {
      const step = 48;
      ctx.strokeStyle = "rgba(123,47,214,0.06)";
      ctx.lineWidth = 0.5;

      for (let x = 0; x < W; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
    };

    // ── Draw orbs ─────────────────────────────────────────────────────────────
    const drawOrbs = () => {
      for (const o of orbs) {
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0,   `rgba(${o.color},${o.opacity})`);
        g.addColorStop(0.5, `rgba(${o.color},${o.opacity * 0.4})`);
        g.addColorStop(1,   `rgba(${o.color},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();

        // Move
        o.x += o.vx;
        o.y += o.vy;

        // Bounce
        if (o.x < -o.r)  o.x = W + o.r;
        if (o.x > W + o.r) o.x = -o.r;
        if (o.y < -o.r)  o.y = H + o.r;
        if (o.y > H + o.r) o.y = -o.r;
      }
    };

    // ── Render loop ───────────────────────────────────────────────────────────
    const render = () => {
      ctx.clearRect(0, 0, W, H);

      // Deep background gradient
      const bg = ctx.createLinearGradient(0, 0, W * 0.3, H);
      bg.addColorStop(0,    "#0D0714");
      bg.addColorStop(0.35, "#110820");
      bg.addColorStop(0.7,  "#0e0618");
      bg.addColorStop(1,    "#0D0714");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      drawGrid();
      drawOrbs();

      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 w-full pointer-events-none"
      style={{ zIndex: 0, top: 0, left: 0 }}
    />
  );
}
