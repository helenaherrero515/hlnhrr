"use client";

import React, { useEffect, useRef, useState } from "react";

interface LegoLoaderProps {
  onComplete?: () => void;
  once?: boolean;
}

export function LegoLoader({ onComplete, once = false }: LegoLoaderProps): React.ReactElement | null {
  const [finished, setFinished] = useState(false);
  const cvRef = useRef<HTMLCanvasElement | null>(null);
  const wallRef = useRef<HTMLCanvasElement | null>(null);
  const numRef = useRef<HTMLSpanElement | null>(null);
  const statusRef = useRef<HTMLParagraphElement | null>(null);
  const segsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const KEY = "hln-loader-seen";

    if (once) {
      try {
        if (sessionStorage.getItem(KEY)) {
          setFinished(true);
          root.dataset.loading = "false";
          window.dispatchEvent(new Event("loader:done"));
          onComplete?.();
          return;
        }
      } catch {
        // Ignore storage errors
      }
    }

    root.dataset.loading = "true";

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const COLORS = { yellow: "#ffd500", red: "#e3000b", blue: "#006cdc", green: "#00b140" };

    // Prevent scrolling while loading
    const handleScrollLock = (e: Event) => {
      if (root.dataset.loading === "true") {
        e.preventDefault();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        root.dataset.loading === "true" &&
        [" ", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "End", "Home"].includes(e.key)
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handleScrollLock, { passive: false });
    window.addEventListener("touchmove", handleScrollLock, { passive: false });
    window.addEventListener("keydown", handleKeyDown, { passive: false });

    const unlockScroll = () => {
      window.removeEventListener("wheel", handleScrollLock);
      window.removeEventListener("touchmove", handleScrollLock);
      window.removeEventListener("keydown", handleKeyDown);
    };

    // HLN brick letters definition
    const LETTERS = [
      { color: COLORS.yellow, rows: ["X...X", "X...X", "X...X", "XXXXX", "X...X", "X...X", "X...X"] }, // H
      { color: COLORS.red, rows: ["X....", "X....", "X....", "X....", "X....", "X....", "XXXXX"] }, // L
      { color: COLORS.blue, rows: ["X...X", "XX..X", "X.X.X", "X.X.X", "X..XX", "X..XX", "X...X"] }, // N
    ];
    const COLS = 17;
    const CX = 8;
    const ROWS = 7;
    const FALL_SPAN = 0.18;
    const LAND_AT = 0.7;

    function mulberry32(a: number) {
      return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    const rand = mulberry32(2026);

    interface RawBrick {
      x: number;
      y: number;
      color: string;
      j: number;
    }
    const raw: RawBrick[] = [];
    LETTERS.forEach((L, li) =>
      L.rows.forEach((row, r) =>
        [...row].forEach((ch, c) => {
          if (ch === "X") raw.push({ x: li * 6 + c, y: ROWS - 1 - r, color: L.color, j: rand() });
        })
      )
    );
    raw.sort((a, b) => a.y - b.y || a.j - b.j);

    const specs = raw.map((b, i) => ({
      x: b.x,
      y: b.y,
      color: b.color,
      start: (i / raw.length) * 0.82,
      fromY: 13 + rand() * 5,
      dx: (rand() - 0.5) * 2.4,
      rz: (rand() - 0.5) * 1.6,
      landed: false,
    }));
    const zOrder = specs.map((_, i) => i).sort((a, b) => specs[a].y - specs[b].y || specs[a].x - specs[b].x);

    const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
    const mix = (h: string, t: number, k: number) => {
      const c = hex(h);
      return `rgb(${c.map((v) => Math.round(v + (t - v) * k)).join(",")})`;
    };
    const SHADES: Record<string, { front: string; top: string; side: string; edge: string }> = {};
    Object.values(COLORS).forEach((c) => {
      SHADES[c] = {
        front: c,
        top: mix(c, 255, 0.28),
        side: mix(c, 0, 0.26),
        edge: mix(c, 0, 0.38),
      };
    });

    const cv = cvRef.current;
    const wcv = wallRef.current;
    if (!cv || !wcv) return;

    const ctx = cv.getContext("2d");
    const wctx = wcv.getContext("2d");
    if (!ctx || !wctx) return;

    let W = 0;
    let H = 0;
    let u = 40;
    let dpr = 1;

    interface WallBrick {
      r: number;
      x: number;
      color: string;
      d: number;
    }
    let wall: WallBrick[] = [];
    let wallPhase: "in" | "out" | null = null;
    let wallT = 0;
    let WB = { bw: 80, bh: 50, rows: 10 };

    function buildWall() {
      const bw = Math.max(56, Math.min(W / 12, 120));
      const bh = bw * 0.62;
      const cols = Math.ceil(W / bw) + 2;
      const rows = Math.ceil(H / bh) + 1;
      const rnd = mulberry32(7);
      const cs = Object.values(COLORS);
      WB = { bw, bh, rows };
      wall = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          wall.push({
            r,
            x: (c - 1) * bw - (r % 2 ? bw / 2 : 0),
            color: cs[(rnd() * 4) | 0],
            d: rnd() * 0.05,
          });
        }
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      cv!.width = Math.round(W * dpr);
      cv!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      wcv!.width = cv!.width;
      wcv!.height = cv!.height;
      wctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (wallPhase) buildWall();
      u = Math.min((W * 0.9) / 20.8, (H * 0.45) / 9, 66);
    }
    resize();
    window.addEventListener("resize", resize);

    const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
    const handlePointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handlePointerMove);

    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeOutBack = (x: number) => {
      const c1 = 1.2;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    };
    const easeInCubic = (x: number) => x * x * x;

    function rr(x: number, y: number, w: number, h: number, r: number) {
      ctx!.beginPath();
      if (typeof ctx!.roundRect === "function") ctx!.roundRect(x, y, w, h, r);
      else ctx!.rect(x, y, w, h);
    }

    function stud(cx: number, cy: number, s: { front: string; top: string; side: string; edge: string }) {
      const rx = u * 0.27;
      const ry = u * 0.115;
      const h = u * 0.15;
      ctx!.fillStyle = s.side;
      ctx!.beginPath();
      ctx!.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.fillRect(cx - rx, cy - h, rx * 2, h);
      ctx!.fillStyle = s.top;
      ctx!.beginPath();
      ctx!.ellipse(cx, cy - h, rx, ry, 0, 0, Math.PI * 2);
      ctx!.fill();
    }

    function brick(color: string, vx: number, vy: number) {
      const s = SHADES[color];
      const h = u / 2;
      // top face
      ctx!.fillStyle = s.top;
      ctx!.beginPath();
      ctx!.moveTo(-h, -h);
      ctx!.lineTo(h, -h);
      ctx!.lineTo(h + vx, -h + vy);
      ctx!.lineTo(-h + vx, -h + vy);
      ctx!.closePath();
      ctx!.fill();
      // right face
      ctx!.fillStyle = s.side;
      ctx!.beginPath();
      ctx!.moveTo(h, -h);
      ctx!.lineTo(h + vx, -h + vy);
      ctx!.lineTo(h + vx, h + vy);
      ctx!.lineTo(h, h);
      ctx!.closePath();
      ctx!.fill();
      // front face
      ctx!.fillStyle = s.front;
      rr(-h, -h, u, u, u * 0.06);
      ctx!.fill();
      ctx!.fillStyle = "rgba(255,255,255,.22)";
      ctx!.fillRect(-h + 1, -h + 1, u - 2, u * 0.1);
      ctx!.fillStyle = "rgba(0,0,0,.18)";
      ctx!.fillRect(-h + 1, h - u * 0.13, u - 2, u * 0.13 - 1);
      ctx!.strokeStyle = s.edge;
      ctx!.globalAlpha = 0.35;
      ctx!.lineWidth = 1;
      rr(-h + 0.5, -h + 0.5, u - 1, u - 1, u * 0.06);
      ctx!.stroke();
      ctx!.globalAlpha = 1;
      // stud on top
      stud(vx / 2, -h + vy / 2 + u * 0.02, s);
    }

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      max: number;
      s: number;
      c: string;
    }
    const parts: Particle[] = [];
    function burst(x: number, y: number, color: string, n: number, power: number, up: boolean) {
      for (let i = 0; i < n && parts.length < 160; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = power * (0.4 + Math.random() * 0.8);
        parts.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - (up ? power * 1.1 : power * 0.35),
          life: 0,
          max: 0.5 + Math.random() * 0.6,
          s: u * (0.08 + Math.random() * 0.1),
          c: color,
        });
      }
    }
    function stepParts(dt: number) {
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life += dt;
        if (p.life >= p.max) {
          parts.splice(i, 1);
          continue;
        }
        p.vy += u * 14 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        ctx!.globalAlpha = 1 - p.life / p.max;
        ctx!.fillStyle = p.c;
        ctx!.fillRect(p.x, p.y, p.s, p.s);
      }
      ctx!.globalAlpha = 1;
    }

    // HUD setup
    const numEl = numRef.current;
    const statusEl = statusRef.current;
    const segsEl = segsRef.current;
    const SEGMENTS = 10;
    if (segsEl && segsEl.children.length === 0) {
      for (let i = 0; i < SEGMENTS; i++) {
        const s = document.createElement("i");
        s.className = "seg";
        segsEl.appendChild(s);
      }
    }
    const segs = segsEl ? [...segsEl.children] : [];
    const STEPS: [number, string][] = [
      [0, "Step 1 · Snap the pieces together"],
      [30, "Step 2 · Stack it up"],
      [60, "Step 3 · Press every stud down"],
      [90, "Step 4 · Almost there"],
    ];
    let lastPct = -1;
    function hud(p: number) {
      const pct = Math.round(p * 100);
      if (pct === lastPct) return;
      lastPct = pct;
      if (numEl) numEl.textContent = String(pct).padStart(3, "0");
      const lit = Math.round(p * SEGMENTS);
      segs.forEach((el, i) => el.classList.toggle("on", i < lit));
      if (pct < 100 && statusEl) {
        const found = [...STEPS].reverse().find((s) => pct >= s[0]);
        if (found && statusEl.textContent !== found[1]) {
          statusEl.textContent = found[1];
        }
      }
    }

    const T = { buildStart: 0.45, buildDur: 3.4, complete: 3.85, waveStart: 3.8, waveDur: 1.1, cover: 5.35 };
    let t = reduce ? T.cover - 0.8 : 0;
    let completed = false;
    let covering = false;
    let isFinished = false;
    let last = performance.now();
    let animId: number;

    function complete() {
      completed = true;
      hud(1);
      segsEl?.classList.add("full");
      if (statusEl) statusEl.textContent = "HLN · Helena Herrero · Ready";
      if (!reduce) {
        const cols = Object.values(COLORS);
        for (let i = 0; i < 56; i++) {
          burst(W / 2 + (Math.random() - 0.5) * u * 14, H * 0.42, cols[i % 4], 1, u * 7, true);
        }
      }
    }

    function reveal() {
      const stage = document.getElementById("loader-stage");
      if (stage) stage.style.visibility = "hidden";
      const loaderEl = document.getElementById("loader");
      if (loaderEl) {
        loaderEl.style.pointerEvents = "none";
        loaderEl.style.touchAction = "auto";
        loaderEl.style.backgroundColor = "transparent";
      }
      root.dataset.loading = "false";
      unlockScroll();
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        // Ignore
      }
      window.dispatchEvent(new Event("loader:done"));
      onComplete?.();
    }

    function finish() {
      isFinished = true;
      unlockScroll();
      setFinished(true);
    }

    function wallBrick(b: WallBrick, y: number) {
      const { bw, bh } = WB;
      const s = SHADES[b.color];
      const x = b.x;
      [0.27, 0.73].forEach((k) => {
        const cx = x + bw * k;
        const rx = bw * 0.11;
        const ry = bh * 0.1;
        const h = bh * 0.1;
        wctx!.fillStyle = s.side;
        wctx!.beginPath();
        wctx!.ellipse(cx, y, rx, ry, 0, 0, Math.PI * 2);
        wctx!.fill();
        wctx!.fillRect(cx - rx, y - h, rx * 2, h);
        wctx!.fillStyle = s.top;
        wctx!.beginPath();
        wctx!.ellipse(cx, y - h, rx, ry, 0, 0, Math.PI * 2);
        wctx!.fill();
      });
      wctx!.fillStyle = s.front;
      wctx!.beginPath();
      if (typeof wctx!.roundRect === "function") wctx!.roundRect(x, y, bw, bh, bh * 0.08);
      else wctx!.rect(x, y, bw, bh);
      wctx!.fill();
      wctx!.fillStyle = "rgba(255,255,255,.22)";
      wctx!.fillRect(x + 1, y + 1, bw - 2, bh * 0.12);
      wctx!.fillStyle = "rgba(0,0,0,.18)";
      wctx!.fillRect(x + 1, y + bh - bh * 0.14, bw - 2, bh * 0.14 - 1);
      wctx!.fillStyle = "rgba(0,0,0,.12)";
      wctx!.fillRect(x + bw - bw * 0.04, y + 1, bw * 0.04 - 1, bh - 2);
      wctx!.strokeStyle = s.edge;
      wctx!.globalAlpha = 0.35;
      wctx!.lineWidth = 1;
      wctx!.strokeRect(x + 0.5, y + 0.5, bw - 1, bh - 1);
      wctx!.globalAlpha = 1;
    }

    function drawWall(dt: number) {
      if (!wallPhase) return;
      wallT += dt;
      const inPhase = wallPhase === "in";
      const p = clamp01(wallT / (inPhase ? 1.3 : 1.2));
      wctx!.clearRect(0, 0, W, H);
      for (const b of wall) {
        const finalY = H - (b.r + 1) * WB.bh;
        let y: number;
        if (inPhase) {
          const k = clamp01((p - (b.r / WB.rows) * 0.56 - b.d) / 0.38);
          if (k <= 0) continue;
          const startY = H + WB.bh;
          y = startY + (finalY - startY) * easeOutBack(k);
        } else {
          const k = clamp01((p - (b.r / WB.rows) * 0.45 - b.d) / 0.5);
          if (k >= 1) continue;
          y = finalY - easeInCubic(k) * (finalY + WB.bh * 3);
        }
        wallBrick(b, y);
      }
      if (p >= 1) {
        if (inPhase) {
          reveal();
          wallPhase = "out";
          wallT = 0;
        } else {
          wallPhase = null;
          wctx!.clearRect(0, 0, W, H);
          finish();
        }
      }
    }

    function startCurtain() {
      covering = true;
      if (reduce) {
        reveal();
        finish();
        return;
      }
      buildWall();
      wallPhase = "in";
      wallT = 0;
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !covering) {
        t = Math.max(t, T.cover);
      }
    };
    window.addEventListener("keydown", handleEscape);

    function frame(now: number) {
      if (isFinished) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;

      const intro = easeOutCubic(clamp01(t / 0.7));
      const build = (() => {
        const x = clamp01((t - T.buildStart) / T.buildDur);
        return x * x;
      })();
      const wave = clamp01((t - T.waveStart) / T.waveDur);
      if (!completed) hud(build);
      if (!completed && t >= T.complete) complete();
      if (!covering && t >= T.cover) startCurtain();

      pointer.sx += (pointer.x - pointer.sx) * (1 - Math.exp(-dt * 4));
      pointer.sy += (pointer.y - pointer.sy) * (1 - Math.exp(-dt * 4));
      const vx = u * (0.3 + pointer.sx * 0.1);
      const vy = -u * (0.24 - pointer.sy * 0.06);
      const Xc = W / 2 - 1.5 * vx;
      const Yp = H * 0.5 + 3.4 * u;
      const ph = u * 0.5;
      const PW = 19 * u;

      ctx!.clearRect(0, 0, W, H);

      // Baseplate
      const po = 9 * u * (1 - intro);
      if (intro > 0.001) {
        const g = SHADES[COLORS.green];
        const px = Xc - PW / 2;
        const py = Yp + po;
        ctx!.fillStyle = g.top;
        ctx!.beginPath();
        ctx!.moveTo(px, py);
        ctx!.lineTo(px + PW, py);
        ctx!.lineTo(px + PW + 3 * vx, py + 3 * vy);
        ctx!.lineTo(px + 3 * vx, py + 3 * vy);
        ctx!.closePath();
        ctx!.fill();
        ctx!.fillStyle = g.side;
        ctx!.beginPath();
        ctx!.moveTo(px + PW, py);
        ctx!.lineTo(px + PW + 3 * vx, py + 3 * vy);
        ctx!.lineTo(px + PW + 3 * vx, py + 3 * vy + ph);
        ctx!.lineTo(px + PW, py + ph);
        ctx!.closePath();
        ctx!.fill();
        ctx!.fillStyle = g.front;
        rr(px, py, PW, ph, u * 0.08);
        ctx!.fill();
        ctx!.fillStyle = "rgba(255,255,255,.2)";
        ctx!.fillRect(px + 1, py + 1, PW - 2, u * 0.08);
        ctx!.fillStyle = "rgba(0,0,0,.2)";
        ctx!.fillRect(px + 1, py + ph - u * 0.1, PW - 2, u * 0.1 - 1);
        for (let x = -9; x <= 9; x++) stud(Xc + x * u + vx * 2.5, py + vy * 2.5, g);
      }

      // Bricks poses
      interface Pose {
        fx: number;
        fy: number;
        rot: number;
        sx: number;
        sy: number;
        landed: boolean;
      }
      const poses: (Pose | undefined)[] = new Array(specs.length);
      for (let i = 0; i < specs.length; i++) {
        const sp = specs[i];
        const k0 = clamp01((build - sp.start) / FALL_SPAN);
        if (k0 <= 0) continue;
        const fall = Math.min(k0 / LAND_AT, 1);
        let yOff = 0;
        let sy = 1;
        if (k0 < LAND_AT) yOff = sp.fromY * (1 - fall * fall);
        else {
          const k = (k0 - LAND_AT) / (1 - LAND_AT);
          yOff = 0.28 * Math.sin(k * Math.PI) * (1 - k);
          sy = 1 - 0.14 * Math.sin(Math.min(k * 2.5, 1) * Math.PI);
        }
        const w = clamp01(wave * 1.8 - (sp.x / (COLS - 1)) * 0.8);
        const hop = w > 0 && w < 1 ? Math.sin(w * Math.PI) * 0.5 : 0;
        const fx = Xc + (sp.x - CX) * u + vx + sp.dx * (1 - fall) * u;
        const fy = Yp + vy - (sp.y + 0.5) * u - (yOff + hop) * u + (1 - sy) * u * 0.5;
        poses[i] = { fx, fy, rot: sp.rz * (1 - fall), sx: 1 + (1 - sy) * 0.5, sy, landed: fall >= 1 };
        if (fall >= 1 && !sp.landed) {
          sp.landed = true;
          if (dt < 0.04) burst(fx, fy + u / 2, sp.color, 5, u * 2.4, false);
        }
      }

      const draw = (i: number) => {
        const p = poses[i];
        if (!p) return;
        ctx!.save();
        ctx!.translate(p.fx, p.fy);
        ctx!.rotate(p.rot);
        ctx!.scale(p.sx, p.sy);
        brick(specs[i].color, vx, vy);
        ctx!.restore();
      };
      zOrder.forEach((i) => {
        if (poses[i] && poses[i]!.landed) draw(i);
      });

      if (intro > 0.001) {
        const g = SHADES[COLORS.green];
        for (let x = -9; x <= 9; x++) stud(Xc + x * u + vx * 0.5, Yp + po + vy * 0.5, g);
      }

      zOrder.forEach((i) => {
        if (poses[i] && !poses[i]!.landed) draw(i);
      });
      stepParts(dt);
      drawWall(dt);

      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("wheel", handleScrollLock);
      window.removeEventListener("touchmove", handleScrollLock);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      root.dataset.loading = "false";
    };
  }, [once, onComplete]);

  if (finished) return null;

  return (
    <div id="loader" role="status" aria-live="polite" aria-label="Loading HLN portfolio">
      <div id="loader-stage" className="dots">
        <canvas id="loader-cv" ref={cvRef} aria-hidden="true" />
        <div className="hud">
          <div>
            <div className="percent pixel">
              <span id="loader-num" ref={numRef} aria-hidden="true">
                000
              </span>
              <small aria-hidden="true">%</small>
            </div>
            <p id="loader-status" ref={statusRef} className="mono">
              Step 1 · Snap the pieces together
            </p>
          </div>
          <div id="loader-segs" ref={segsRef} className="segs" aria-hidden="true" />
        </div>
      </div>
      <canvas id="loader-wall" ref={wallRef} aria-hidden="true" />
    </div>
  );
}
