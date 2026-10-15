"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import {
  LEGO_MANIFESTO,
  LEGO_TICKER,
  LEGO_EXPERIENCE,
  LEGO_PROJECTS,
  LEGO_WORKS,
  LEGO_TOOLS,
  LEGO_TECHNICAL_SKILLS,
  LEGO_COLOR_MAP,
  LEGO_LETTER_PATTERNS,
} from "./data";
import { renderIsoBrickSvg } from "./iso";
import { BrickFactory, BrickColorKey, LEGO_PALETTE } from "./brickFactory";
import { LegoWorksModal } from "./LegoWorksModal";
import type { GuestbookEntry } from "./types";

interface LegoPortfolioProps {
  defaultSection?: string;
}

const STEPS = [
  "Step 1 · Snap the pieces together",
  "Step 2 · Turn it around",
  "Step 3 · Selected work in orbit",
  "Step 4 · The constellation",
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 5],
  [5, 4],
  [4, 3],
  [3, 0],
  [1, 4],
];

const CONSTELLATION_COORDS: [number, number][] = [
  [-0.9, -0.55],
  [0, -0.8],
  [0.85, -0.5],
  [-0.95, 0.28],
  [0.1, 0.72],
  [0.9, 0.38],
];

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothStep = (t: number) => t * t * (3 - 2 * t);
const easeOutBounce = (x: number) => {
  const c1 = 1.1;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

export function LegoPortfolio({ defaultSection }: LegoPortfolioProps) {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(false);
  const [worksModalType, setWorksModalType] = useState<"pubmats" | "swags" | "ppt" | null>(null);

  // Playground builder state
  const [pgColor, setPgColor] = useState<BrickColorKey>("red");
  const [pgSize, setPgSize] = useState<{ w: number; d: number }>({ w: 2, d: 2 });
  const [pgBrickCount, setPgBrickCount] = useState<number>(0);
  const [pgName, setPgName] = useState<string>("");
  const [pgSaveMsg, setPgSaveMsg] = useState<string>(
    "Type your name, then save your build as a PNG, ready to post on your Instagram story."
  );
  const [isSavingStory, setIsSavingStory] = useState<boolean>(false);

  // Guestbook state
  const [guestName, setGuestName] = useState<string>("");
  const [guestMessage, setGuestMessage] = useState<string>("");
  const [guestStatus, setGuestStatus] = useState<string>("hi! write me a note");
  const [guestNotes, setGuestNotes] = useState<GuestbookEntry[]>([]);
  const [isBmoHappy, setIsBmoHappy] = useState<boolean>(false);

  // Stats counters state
  const [statTotals, setStatTotals] = useState({ contributions: 0, streak: 0, activeDays: 0 });

  // Refs for 3D and DOM
  const glCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const pgcCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const plateRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const mfiRef = useRef<HTMLDivElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);
  const clRef = useRef<SVGSVGElement | null>(null);
  const stepLabelRef = useRef<HTMLSpanElement | null>(null);
  const stepBarRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Playground builder internals ref
  const pgRef = useRef<{
    putBrick?: (cx: number, cz: number, w: number, d: number, c: BrickColorKey, instant?: boolean) => boolean;
    turn?: () => void;
    undo?: () => void;
    clear?: () => void;
    rotateLeft?: () => void;
    rotateRight?: () => void;
    surpriseMe?: () => void;
    snapStory?: (w: number, h: number) => HTMLCanvasElement | null;
  }>({});

  // Theme Sync
  const syncTheme = useCallback(
    (dark: boolean) => {
      setIsDark(dark);
      const root = document.documentElement;
      root.setAttribute("data-theme", dark ? "dark" : "light");
      try {
        localStorage.setItem("hln_brick_theme", dark ? "dark" : "light");
      } catch {}
      if (typeof window !== "undefined" && (window as unknown as { SCN?: { theme: (d: boolean) => void } }).SCN) {
        (window as unknown as { SCN: { theme: (d: boolean) => void } }).SCN.theme(dark);
      }
    },
    []
  );

  useEffect(() => {
    let mode: string | null = null;
    try {
      mode = localStorage.getItem("hln_brick_theme");
    } catch {}
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = mode === "dark" || (!mode && prefersDark);
    syncTheme(initialDark);
  }, [syncTheme]);

  // Load guestbook notes
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hln_brick_notes");
      if (saved) {
        setGuestNotes(JSON.parse(saved));
      }
    } catch {}
  }, []);

  // Handle guestbook submission
  const handleGuestbookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const m = guestMessage.trim().slice(0, 160);
    const n = guestName.trim().slice(0, 24);
    if (!m) {
      setGuestStatus("type a note first.");
      return;
    }
    const newEntry: GuestbookEntry = { n: n || "anonymous", m, t: Date.now() };
    const updated = [newEntry, ...guestNotes].slice(0, 30);
    setGuestNotes(updated);
    try {
      localStorage.setItem("hln_brick_notes", JSON.stringify(updated));
    } catch {}
    setGuestMessage("");
    setGuestStatus("saved on this device. thank you!");
    setIsBmoHappy(true);
    setTimeout(() => setIsBmoHappy(false), 2200);
  };

  // Main Three.js Scene + Lenis + ScrollTrigger Sequence
  useEffect(() => {
    if (!glCanvasRef.current) return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = () => window.innerWidth < 700;

    const BX = new BrickFactory();
    (window as unknown as { SCN: { theme: (d: boolean) => void; redraw?: () => void } }).SCN = {
      theme: (d: boolean) => {
        BX.theme(d);
        if ((window as unknown as { SCN: { redraw?: () => void } }).SCN.redraw) {
          (window as unknown as { SCN: { redraw: () => void } }).SCN.redraw();
        }
      },
    };

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: glCanvasRef.current,
        antialias: true,
        alpha: true,
      });
    } catch {
      return;
    }

    renderer.setClearColor(0x000000, 0);
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -100, 100);
    camera.position.set(14, 13, 14);
    camera.lookAt(0, 2, 0);

    const scene = new THREE.Scene();
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.78);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.85);
    directionalLight.position.set(6, 12, 8);
    scene.add(ambientLight, directionalLight);

    BX.themeCallbacks.push((d) => {
      ambientLight.intensity = d ? 0.6 : 0.78;
      directionalLight.intensity = d ? 1 : 0.85;
    });

    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const layers = isSmall() ? 3 : 4;
    const cols: BrickColorKey[] = ["red", "yellow", "blue", "green"];
    const pickColor = (L: number): BrickColorKey =>
      rnd() < 0.22 ? cols[Math.floor(rnd() * 4)] : cols[L % 4];

    const y0 = 0.408;
    interface PlanItem {
      t?: string;
      w?: number;
      d?: number;
      h?: number;
      hh?: number;
      x: number;
      y: number;
      z: number;
      c?: BrickColorKey;
      ry?: number;
    }

    const plan: PlanItem[] = [{ t: "plate", w: 12, d: 12, h: 0.34, x: 0, y: 0, z: 0, c: "bgreen" }];

    for (let L = 0; L < layers; L++) {
      const y = y0 + L * 1.2;
      const ev = L % 2 === 0;
      [-3.5, 3.5].forEach((z) => {
        (ev ? [-3, -1, 1, 3] : [-2, 0, 2]).forEach((x) =>
          plan.push({ w: 2, d: 1, h: 1, x, y, z, c: pickColor(L) })
        );
        if (!ev) {
          [-3.5, 3.5].forEach((x) => plan.push({ w: 1, d: 1, h: 1, x, y, z, c: pickColor(L) }));
        }
      });
      [-3.5, 3.5].forEach((x) => {
        (ev ? [[-2, 2], [0, 2], [2, 2]] : [[-2.5, 1], [-1, 2], [1, 2], [2.5, 1]]).forEach((a) =>
          plan.push({ w: 1, d: a[1], h: 1, x, y, z: a[0], c: pickColor(L) })
        );
      });
    }

    const top = y0 + layers * 1.2;
    plan.push(
      { w: 2, d: 2, h: 1, x: -1.5, y: y0, z: -1, c: "blue" },
      { w: 1, d: 2, h: 1, x: 1.5, y: y0, z: 1, c: "yellow" },
      { w: 2, d: 1, h: 1, x: -1, y: y0 + 1.2, z: -1.5, c: "red" }
    );
    [-3, -1, 1, 3].forEach((x) =>
      plan.push(
        { t: "wedge", w: 4, d: 2, hh: 1.8, x, y: top, z: -2, c: "red", ry: Math.PI / 2 },
        { t: "wedge", w: 4, d: 2, hh: 1.8, x, y: top, z: 2, c: "red", ry: -Math.PI / 2 }
      )
    );
    plan.push(
      { w: 1, d: 1, h: 1, x: 2, y: top + 0.2, z: -2, c: "grey" },
      { w: 1, d: 1, h: 1, x: 2, y: top + 1.4, z: -2, c: "grey" },
      { w: 1, d: 1, h: 1, x: 5, y: y0, z: -5, c: "brown" },
      { w: 1, d: 1, h: 1, x: 5, y: y0 + 1.2, z: -5, c: "brown" },
      { w: 2, d: 2, h: 1, x: 5, y: y0 + 2.4, z: -5, c: "green" },
      { w: 1, d: 1, h: 1, x: 5, y: y0 + 3.6, z: -5, c: "green" },
      { w: 2, d: 1, h: 1, x: -5, y: y0, z: 4.5, c: "green" },
      { w: 1, d: 1, h: 1, x: 2, y: y0, z: 5, c: "yellow" },
      { w: 2, d: 1, h: 1, x: 3.8, y: y0, z: 5.3, c: "red" },
      { t: "fig", x: -1.2, y: y0, z: 5 }
    );

    const root = new THREE.Group();
    scene.add(root);
    let minifig: { group: THREE.Group; rightArm: THREE.Group; leftArm: THREE.Group } | null = null;
    const maxY = top + 3.5;

    const bricks = plan.map((p) => {
      let m: THREE.Group;
      let rad: number;
      const sc0 = 0.8;
      if (p.t === "wedge") {
        m = BX.wedge(p.w!, p.d!, p.hh!, p.c!);
        rad = p.w! * 0.5 * sc0 + 0.6;
      } else if (p.t === "fig") {
        minifig = BX.figure();
        m = new THREE.Group();
        m.add(minifig.group);
        rad = 1.8;
      } else if (p.t === "plate") {
        m = BX.brick(p.w!, p.d!, p.h!, p.c!, true);
        m.add(BX.studs(12, p.c!, y0));
        rad = 12 * 0.5 * 0.28 * 1.25;
      } else {
        m = BX.brick(p.w!, p.d!, p.h!, p.c!);
        rad = Math.max(p.w!, p.d!) * 0.5 * 1.15 * sc0 + 0.6;
      }
      root.add(m);
      return {
        m,
        target: { x: p.x, y: p.y, z: p.z, ry: p.ry || 0 },
        scatter: {
          x: 0,
          y: 6,
          z: 0,
          rx: (rnd() - 0.5) * 4,
          ry: (rnd() - 0.5) * 4,
          rz: (rnd() - 0.5) * 4,
        },
        delay: clamp(p.y / maxY) * 0.7 + rnd() * 0.3,
        phase: rnd() * 6.28,
        speed: (rnd() - 0.5) * 0.8,
        sc0,
        rad,
      };
    });

    const ringG = new THREE.Group();
    ringG.position.y = 3;
    root.add(ringG);
    const ringM = new THREE.MeshBasicMaterial({ color: 0xffb400, transparent: true, opacity: 1 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(10.5, 0.07, 8, 120), ringM);
    ring.rotation.x = Math.PI / 2;
    ringG.add(ring);
    const orbiter = BX.brick(1, 1, 1, "red");
    ringG.add(orbiter);
    orbiter.scale.setScalar(0.9);

    const right = new THREE.Vector3(0.7071, 0, -0.7071);
    const clock = new THREE.Clock();
    let vs = 22;
    let lastW = 0;

    const S = {
      asm: 0,
      off: isSmall() ? 0 : 0.2,
      rot: 0,
      zoom: 1,
      ringOp: 0,
      px: 0,
      py: 0,
      dy: isSmall() ? -4 : -1.4,
      active: true,
    };
    const cur = { asm: 0, off: S.off, rot: 0, zoom: 1, ringOp: 0, dy: S.dy };

    const resize = () => {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmall() ? 1.5 : 2));
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      const aspect = window.innerWidth / window.innerHeight;
      vs = isSmall() ? 42 : 22;
      camera.left = (-vs * aspect) / 2;
      camera.right = (vs * aspect) / 2;
      camera.top = vs / 2;
      camera.bottom = -vs / 2;
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld(true);
    };

    function resample() {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const nm = nameRef.current?.getBoundingClientRect();
      const cta = document.querySelector(".cta")?.getBoundingClientRect();
      let xmin = -2;
      let ymax = 0.8;
      if (W >= 900 && nm) {
        xmin = ((nm.right + window.scrollX + 30) / W) * 2 - 1 + 0.1;
      } else if (cta) {
        const bot = cta.bottom + window.scrollY + 36;
        const yN = 1 - (2 * bot) / H;
        ymax = bot > H * 0.88 ? -0.5 : Math.min(0.8, yN);
      }

      const hw = (camera.right - camera.left) / 2;
      const hh = (camera.top - camera.bottom) / 2;
      const off = S.off * (camera.right - camera.left);
      const rp = new THREE.Vector3(right.x * off, S.dy, right.z * off);

      bricks.forEach((b) => {
        let x = 0;
        let y = 0;
        let z = 0;
        for (let n = 0; n < 90; n++) {
          x = (rnd() - 0.5) * 26;
          y = 2 + rnd() * 10;
          z = (rnd() - 0.5) * 26;
          const v = new THREE.Vector3(x + rp.x, y + rp.y, z + rp.z).project(camera);
          const rx = b.rad / hw;
          const ry = b.rad / hh;
          if (v.x - rx > xmin && v.x + rx < 0.99 && v.y - ry > -0.97 && v.y + ry < ymax) {
            break;
          }
        }
        b.scatter.x = x;
        b.scatter.y = y;
        b.scatter.z = z;
      });
    }

    function draw(snap = false) {
      const t = clock.getElapsedTime();
      const k = snap ? 1 : 0.1;
      cur.asm += (S.asm - cur.asm) * k;
      cur.off += (S.off - cur.off) * k;
      cur.rot += (S.rot - cur.rot) * k;
      cur.zoom += (S.zoom - cur.zoom) * k;
      cur.ringOp += (S.ringOp - cur.ringOp) * k;
      cur.dy += (S.dy - cur.dy) * k;

      for (const b of bricks) {
        const q = clamp(cur.asm * 1.5 - b.delay * 0.5);
        const e = easeOutBounce(q);
        const r = smoothStep(q);
        const f = isReduced ? 0 : 1 - clamp(q * 1.4);
        b.m.position.set(
          lerp(b.scatter.x, b.target.x, e),
          lerp(b.scatter.y, b.target.y, e) + Math.sin(t * 0.9 + b.phase) * 0.4 * f,
          lerp(b.scatter.z, b.target.z, e)
        );
        b.m.rotation.set(
          b.scatter.rx * (1 - r) + Math.sin(t * 0.5 + b.phase) * 0.2 * f,
          b.target.ry + b.scatter.ry * (1 - r) + t * b.speed * f,
          b.scatter.rz * (1 - r)
        );
        b.m.scale.setScalar(lerp(b.sc0, 1, r));
      }

      if (minifig) {
        const w = isReduced ? 1 : smoothStep(clamp((cur.asm - 0.9) * 10));
        minifig.rightArm.rotation.z = w * (2.4 + Math.sin(t * 6) * 0.4);
        minifig.leftArm.rotation.z = -w * 0.15;
      }

      root.rotation.y += (cur.rot + S.px * 0.2 - root.rotation.y) * (snap ? 1 : 0.06);
      root.rotation.x += (S.py * 0.05 - root.rotation.x) * (snap ? 1 : 0.06);
      const off = cur.off * (camera.right - camera.left);
      root.position.set(right.x * off, cur.dy, right.z * off);

      const a = t * 0.6;
      orbiter.position.set(Math.cos(a) * 10.5, 0, Math.sin(a) * 10.5);
      ringM.opacity = cur.ringOp;
      ring.visible = cur.ringOp > 0.02;
      orbiter.visible = ring.visible;

      if (Math.abs(camera.zoom - cur.zoom) > 0.001) {
        camera.zoom = cur.zoom;
        camera.updateProjectionMatrix();
      }
      renderer.render(scene, camera);
    }

    resize();
    lastW = window.innerWidth;
    resample();

    const handleResize = () => {
      resize();
      if (window.innerWidth !== lastW) {
        lastW = window.innerWidth;
        resample();
      }
      if (!S.active || isReduced) draw(true);
    };

    window.addEventListener("resize", handleResize);

    (window as unknown as { SCN: { redraw?: () => void } }).SCN.redraw = () => {
      if (!S.active || isReduced) draw(true);
    };

    const handlePointerMove = (e: PointerEvent) => {
      S.px = (e.clientX / window.innerWidth) * 2 - 1;
      S.py = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!isReduced) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
    }

    let animationFrameId: number;
    function renderLoop() {
      if (S.active && !isReduced && !document.hidden) {
        draw();
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    }
    renderLoop();

    // Sequence progress driver
    const words = document.querySelectorAll<HTMLElement>("#mt .w");
    const stage = stageRef.current;
    const cl = clRef.current;
    const stpEl = stepLabelRef.current;
    const sbContainer = stepBarRef.current;
    let lastStep = -1;

    // Create 10 studs inside stepBar
    if (sbContainer) {
      sbContainer.innerHTML = "<i></i>".repeat(10);
    }
    const stepStuds = sbContainer ? Array.from(sbContainer.children) : [];

    // Create SVG connector lines inside #cl
    if (cl) {
      cl.innerHTML = "";
      EDGES.forEach(() => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        cl.appendChild(line);
      });
    }
    const svgLines = cl ? Array.from(cl.querySelectorAll<SVGLineElement>("line")) : [];

    function updateSequence(P: number) {
      S.asm = smoothStep(clamp(P / 0.34));
      const p1 = clamp(P / 0.3);
      words.forEach((w, i) => {
        w.classList.toggle("on", i / words.length < p1 + 0.001);
      });

      const out = clamp((P - 0.36) / 0.12);
      if (mfiRef.current) {
        mfiRef.current.style.opacity = String(1 - out);
        mfiRef.current.style.transform = `translate3d(${(-out * 70).toFixed(1)}px,0,0)`;
        mfiRef.current.style.pointerEvents = out > 0.9 ? "none" : "";
      }

      S.off = lerp(isSmall() ? 0 : 0.2, 0, smoothStep(clamp((P - 0.34) / 0.2)));
      S.rot = P * Math.PI * 1.1;
      S.zoom = lerp(1, isSmall() ? 0.95 : 0.92, smoothStep(clamp((P - 0.5) / 0.3)));
      S.ringOp = smoothStep(clamp((P - 0.45) / 0.15));

      const vis = smoothStep(clamp((P - 0.5) / 0.08));
      const ob = clamp((P - 0.55) / 0.25);
      const cb = smoothStep(clamp((P - 0.8) / 0.16));

      const W = stage?.clientWidth || window.innerWidth;
      const H = stage?.clientHeight || window.innerHeight;
      const cx = W / 2;
      const cy = H * (isSmall() ? 0.58 : 0.5);
      const rx = Math.min(W * 0.4, 520);
      const ry = Math.min(H * 0.3, 230);
      const sx = Math.min(W * 0.4, 520);
      const sy = H * 0.36;
      const positions: [number, number][] = [];

      chipRefs.current.forEach((c, i) => {
        if (!c) return;
        const a = (i / LEGO_PROJECTS.length) * 6.2832 + ob * 6.2832 * 0.6 - 1.5708;
        const dep = (Math.sin(a) + 1) / 2;
        const ox = cx + Math.cos(a) * rx;
        const oy = cy + Math.sin(a) * ry * (isSmall() ? 1.2 : 1);
        const tx = cx + CONSTELLATION_COORDS[i][0] * sx * (isSmall() ? 0.55 : 1);
        const ty = cy + CONSTELLATION_COORDS[i][1] * sy;
        const x = lerp(ox, tx, cb);
        const y = lerp(oy, ty, cb);
        const sc = lerp(0.7 + 0.4 * dep, 1, cb);
        const op = vis * lerp(0.55 + 0.45 * dep, 1, cb);
        positions.push([x, y]);

        c.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) translate(-50%,-50%) scale(${sc.toFixed(3)})`;
        c.style.opacity = op.toFixed(3);
        c.style.zIndex = String(Math.round(dep * 10));
        c.style.visibility = op < 0.02 ? "hidden" : "visible";
      });

      EDGES.forEach((e, i) => {
        const l = svgLines[i];
        if (!l || !positions[e[0]] || !positions[e[1]]) return;
        l.setAttribute("x1", positions[e[0]][0].toFixed(1));
        l.setAttribute("y1", positions[e[0]][1].toFixed(1));
        l.setAttribute("x2", positions[e[1]][0].toFixed(1));
        l.setAttribute("y2", positions[e[1]][1].toFixed(1));
        l.style.opacity = (cb * 0.6).toFixed(2);
      });

      const st = P < 0.34 ? 0 : P < 0.55 ? 1 : P < 0.8 ? 2 : 3;
      if (st !== lastStep && stpEl) {
        lastStep = st;
        stpEl.textContent = STEPS[st];
      }
      stepStuds.forEach((s, i) => {
        s.classList.toggle("on", i < Math.round(P * 10));
      });
    }

    // Lenis Smooth Scroll Setup
    let lenis: Lenis | null = null;
    try {
      lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
      });
      gsap.registerPlugin(ScrollTrigger);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis?.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } catch {}

    if (!isReduced) {
      ScrollTrigger.create({
        trigger: "#build",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => updateSequence(self.progress),
      });
      updateSequence(0);

      // Hero animations
      gsap.from(".lt i", {
        y: () => -(260 + Math.random() * 420),
        rotation: () => (Math.random() - 0.5) * 140,
        duration: 1,
        ease: "power3.out",
        stagger: { each: 0.0035, from: "random" },
      });
      gsap.from(".hl, .lead, .cta", {
        y: 26,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.5,
      });
      gsap.to("#name", {
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: "#top",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to("#plate", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: "#top",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Section headings reveal
      document.querySelectorAll<HTMLElement>(".h2").forEach((h) => {
        const text = h.textContent || "";
        h.setAttribute("aria-label", text);
        h.innerHTML = text
          .split(" ")
          .map((w) => `<span class="ch" aria-hidden="true">${w}</span>`)
          .join(" ");
        gsap.from(h.querySelectorAll(".ch"), {
          yPercent: 55,
          rotate: 4,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.07,
          scrollTrigger: { trigger: h, start: "top 92%", once: true },
        });
      });

      // Card reveals
      document.querySelectorAll<HTMLElement>("[data-rv]").forEach((el) => {
        gsap.from(el, {
          y: el.classList.contains("row") ? -34 : 40,
          rotate: el.classList.contains("row") ? -1 : 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 94%", once: true },
        });
      });

      // Stat tile number animations
      ScrollTrigger.create({
        trigger: ".stl",
        start: "top 85%",
        once: true,
        onEnter: () => {
          document.querySelectorAll<HTMLElement>(".stl [data-n]").forEach((el) => {
            const target = +(el.dataset.n || 0);
            const obj = { n: 0 };
            gsap.to(obj, {
              n: target,
              duration: 1.2,
              ease: "power3.out",
              onUpdate: () => {
                el.textContent = String(Math.round(obj.n));
              },
            });
          });
        },
      });

      // GitHub stats count-up
      ScrollTrigger.create({
        trigger: ".sg",
        start: "top 85%",
        once: true,
        onEnter: () => {
          const s1 = document.getElementById("s1");
          const s2 = document.getElementById("s2");
          const s3 = document.getElementById("s3");
          if (s1 && s2 && s3) {
            const targets = [
              { el: s1, val: statTotals.contributions },
              { el: s2, val: statTotals.streak },
              { el: s3, val: statTotals.activeDays },
            ];
            targets.forEach(({ el, val }) => {
              const obj = { n: 0 };
              gsap.to(obj, {
                n: val,
                duration: 1.5,
                ease: "power3.out",
                onUpdate: () => {
                  el.textContent = String(Math.round(obj.n));
                },
              });
            });
          }
        },
      });
    }

    // 3D Pointer Lift on Hero Name Bricks
    const heroEl = heroRef.current;
    const cellElements = Array.from(document.querySelectorAll<HTMLElement>("#name i"));
    let cache: { el: HTMLElement; x: number; y: number; f: number; s: boolean }[] = [];
    let targetPos: { x: number; y: number } | null = null;
    let waveRaf = 0;

    const measureCells = () => {
      if (!heroEl) return;
      const hr = heroEl.getBoundingClientRect();
      cache = cellElements.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          el,
          x: r.left - hr.left + r.width / 2,
          y: r.top - hr.top + r.height / 2,
          f: 0,
          s: false,
        };
      });
    };
    const timerId = setTimeout(measureCells, 1800);

    const onWaveTick = () => {
      let anyActive = false;
      cache.forEach((c) => {
        const dist = targetPos ? Math.hypot(c.x - targetPos.x, c.y - targetPos.y) : 999;
        const t = Math.max(0, 1 - dist / 130);
        c.f += (t - c.f) * 0.2;
        if (c.f > 0.01) {
          anyActive = true;
          c.el.style.translate = `0 ${(-c.f * 12).toFixed(1)}px`;
          c.el.style.scale = (1 + c.f * 0.3).toFixed(3);
          c.s = true;
        } else if (c.s) {
          c.el.style.translate = "";
          c.el.style.scale = "";
          c.s = false;
        }
      });
      waveRaf = anyActive || targetPos ? requestAnimationFrame(onWaveTick) : 0;
    };

    const onHeroPointerMove = (e: PointerEvent) => {
      if (!cache.length || !heroEl) return;
      const hr = heroEl.getBoundingClientRect();
      targetPos = { x: e.clientX - hr.left, y: e.clientY - hr.top };
      if (!waveRaf) waveRaf = requestAnimationFrame(onWaveTick);
    };

    const onHeroPointerLeave = () => {
      targetPos = null;
      if (!waveRaf) waveRaf = requestAnimationFrame(onWaveTick);
    };

    if (heroEl && !isReduced) {
      heroEl.addEventListener("pointermove", onHeroPointerMove);
      heroEl.addEventListener("pointerleave", onHeroPointerLeave);
    }

    // 3D Perspective Tilt on Photo Plate and Tiles
    const tiltElement = (el: HTMLElement, maxDeg: number, persp: number) => {
      gsap.set(el, { transformPerspective: persp });
      const rx = gsap.quickTo(el, "rotationX", { duration: 0.4, ease: "power3" });
      const ry = gsap.quickTo(el, "rotationY", { duration: 0.4, ease: "power3" });

      const onMove = (e: MouseEvent) => {
        const b = el.getBoundingClientRect();
        ry(((e.clientX - b.left) / b.width - 0.5) * maxDeg * 2);
        rx(-((e.clientY - b.top) / b.height - 0.5) * maxDeg * 2);
      };
      const onLeave = () => {
        rx(0);
        ry(0);
      };
      el.addEventListener("pointermove", onMove as EventListener);
      el.addEventListener("pointerleave", onLeave);
    };

    if (plateRef.current && !isReduced) {
      tiltElement(plateRef.current, 14, 800);
    }
    document.querySelectorAll<HTMLElement>(".tilt").forEach((el) => {
      if (!isReduced) tiltElement(el, 9, 700);
    });

    // Cleanup
    return () => {
      clearTimeout(timerId);
      window.removeEventListener("resize", handleResize);
      if (!isReduced) {
        window.removeEventListener("pointermove", handlePointerMove);
      }
      if (heroEl) {
        heroEl.removeEventListener("pointermove", onHeroPointerMove);
        heroEl.removeEventListener("pointerleave", onHeroPointerLeave);
      }
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(waveRaf);
      lenis?.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [statTotals]);

  // Playground 3D Builder Canvas Engine
  useEffect(() => {
    if (!pgcCanvasRef.current) return;
    const cv = pgcCanvasRef.current;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const BX = new BrickFactory();

    let rd: THREE.WebGLRenderer;
    try {
      rd = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    } catch {
      return;
    }

    rd.setClearColor(0x000000, 0);
    const N = 14;
    const PH = 0.408;
    const scene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, -100, 100);
    cam.position.set(14, 13, 14);
    cam.lookAt(0, 1.5, 0);

    const amb = new THREE.AmbientLight(0xffffff, 0.8);
    const dir = new THREE.DirectionalLight(0xffffff, 0.85);
    dir.position.set(6, 12, 8);
    scene.add(amb, dir);

    BX.themeCallbacks.push((d) => {
      amb.intensity = d ? 0.6 : 0.8;
      dir.intensity = d ? 1 : 0.85;
    });

    const world = new THREE.Group();
    scene.add(world);

    const plate = BX.brick(N, N, 0.34, "bgreen", true);
    plate.add(BX.studs(N, "bgreen", PH));
    world.add(plate);
    const plateBody = plate.children[0];

    const H = Array.from({ length: N }, () => Array(N).fill(0));
    interface PlacedBrick {
      m: THREE.Group;
      cx: number;
      cz: number;
      w: number;
      d: number;
      y: number;
      t0: number;
      a: number;
    }
    const placed: PlacedBrick[] = [];
    const bodies: THREE.Object3D[] = [];

    let turned = false;
    let cell = { x: 6, z: 6 };
    let showGhost = false;
    let ang = 0;
    let angT = 0;
    let ghost: THREE.Group | null = null;
    let funTimer = 0;

    const fp = () => (turned ? { w: pgSize.d, d: pgSize.w } : { w: pgSize.w, d: pgSize.d });
    const hAt = (cx: number, cz: number, w: number, d: number) => {
      let m = 0;
      for (let i = 0; i < w; i++) {
        for (let j = 0; j < d; j++) {
          m = Math.max(m, H[cx + i]?.[cz + j] || 0);
        }
      }
      return m;
    };

    const updateCount = () => {
      setPgBrickCount(placed.length);
    };

    const putBrick = (cx: number, cz: number, w: number, d: number, c: BrickColorKey, instant = false) => {
      const y = hAt(cx, cz, w, d);
      if (y >= 14) return false;
      const m = BX.brick(w, d, 1, c);
      m.position.set(cx + w / 2 - N / 2, PH + y * 1.2, cz + d / 2 - N / 2);
      world.add(m);
      bodies.push(m.children[0]);
      for (let i = 0; i < w; i++) {
        for (let j = 0; j < d; j++) {
          if (H[cx + i]) H[cx + i][cz + j] = y + 1;
        }
      }
      placed.push({
        m,
        cx,
        cz,
        w,
        d,
        y,
        t0: performance.now(),
        a: instant || isReduced ? 1 : 0,
      });
      updateCount();
      return true;
    };

    const rebuildH = () => {
      H.forEach((r) => r.fill(0));
      placed.forEach((o) => {
        for (let i = 0; i < o.w; i++) {
          for (let j = 0; j < o.d; j++) {
            if (H[o.cx + i]) H[o.cx + i][o.cz + j] = o.y + 1;
          }
        }
      });
    };

    const undo = () => {
      const o = placed.pop();
      if (!o) return;
      world.remove(o.m);
      bodies.pop();
      rebuildH();
      updateCount();
      posGhost();
    };

    const clear = () => {
      while (placed.length) {
        const o = placed.pop();
        if (o) {
          world.remove(o.m);
          bodies.pop();
        }
      }
      rebuildH();
      updateCount();
      posGhost();
    };

    const gm = new THREE.MeshLambertMaterial({ transparent: true, opacity: 0.6, depthWrite: false });

    function mkGhost() {
      if (ghost) {
        world.remove(ghost);
        ghost = null;
      }
      const f = fp();
      cell.x = clamp(cell.x, 0, N - f.w);
      cell.z = clamp(cell.z, 0, N - f.d);
      ghost = BX.brick(f.w, f.d, 1, pgColor);
      ghost.traverse((o) => {
        if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).material = gm;
        if ((o as THREE.LineSegments).isLineSegments) o.visible = false;
      });
      gm.color.set(LEGO_PALETTE[pgColor]);
      world.add(ghost);
      posGhost();
    }

    function posGhost() {
      if (!ghost) return;
      const f = fp();
      const y = hAt(cell.x, cell.z, f.w, f.d);
      ghost.position.set(cell.x + f.w / 2 - N / 2, PH + y * 1.2, cell.z + f.d / 2 - N / 2);
      ghost.visible = showGhost;
    }

    const ray = new THREE.Raycaster();
    const v2 = new THREE.Vector2();

    function hitCell(e: MouseEvent | PointerEvent) {
      const b = cv.getBoundingClientRect();
      v2.set(((e.clientX - b.left) / b.width) * 2 - 1, -(((e.clientY - b.top) / b.height) * 2 - 1));
      ray.setFromCamera(v2, cam);
      const hit = ray.intersectObjects([plateBody, ...bodies], false)[0];
      if (!hit) return null;
      const p = world.worldToLocal(hit.point.clone());
      const f = fp();
      return {
        x: clamp(Math.round(p.x + N / 2 - f.w / 2), 0, N - f.w),
        z: clamp(Math.round(p.z + N / 2 - f.d / 2), 0, N - f.d),
      };
    }

    const placeBrick = () => {
      const f = fp();
      putBrick(cell.x, cell.z, f.w, f.d, pgColor);
      posGhost();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const c = hitCell(e);
      showGhost = !!c;
      if (c) cell = c;
      posGhost();
    };

    const handlePointerLeave = () => {
      showGhost = false;
      posGhost();
    };

    const handleClick = (e: MouseEvent) => {
      const c = hitCell(e);
      if (c) {
        cell = c;
        showGhost = true;
        placeBrick();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const f = fp();
      let handled = true;
      switch (e.key) {
        case "ArrowLeft":
          cell.x = clamp(cell.x - 1, 0, N - f.w);
          break;
        case "ArrowRight":
          cell.x = clamp(cell.x + 1, 0, N - f.w);
          break;
        case "ArrowUp":
          cell.z = clamp(cell.z - 1, 0, N - f.d);
          break;
        case "ArrowDown":
          cell.z = clamp(cell.z + 1, 0, N - f.d);
          break;
        case "Enter":
        case " ":
          showGhost = true;
          placeBrick();
          break;
        case "r":
        case "R":
          turned = !turned;
          mkGhost();
          break;
        case "z":
        case "Z":
          undo();
          break;
        default:
          handled = false;
      }
      if (handled) {
        e.preventDefault();
        showGhost = true;
        posGhost();
      }
    };

    cv.addEventListener("pointermove", handlePointerMove);
    cv.addEventListener("pointerleave", handlePointerLeave);
    cv.addEventListener("click", handleClick);
    cv.addEventListener("keydown", handleKeyDown);

    // Initial default bricks on baseplate
    const starterBricks: [number, number, number, number, BrickColorKey][] = [
      [5, 5, 2, 2, "red"],
      [7, 5, 2, 1, "yellow"],
      [5, 5, 2, 2, "blue"],
      [3, 8, 4, 2, "green"],
      [8, 8, 2, 2, "blue"],
      [8, 8, 1, 1, "yellow"],
    ];
    starterBricks.forEach((a) => putBrick(a[0], a[1], a[2], a[3], a[4], true));
    mkGhost();

    const size = () => {
      const w = cv.clientWidth;
      const h = cv.clientHeight;
      if (!w || !h) return;
      rd.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      rd.setSize(w, h, false);
      const aspect = w / h;
      const v = Math.max(21, 30 / aspect);
      cam.left = (-v * aspect) / 2;
      cam.right = (v * aspect) / 2;
      cam.top = v / 2;
      cam.bottom = -v / 2;
      cam.updateProjectionMatrix();
    };
    size();

    const ro = window.ResizeObserver ? new ResizeObserver(size) : null;
    if (ro) ro.observe(cv);
    else window.addEventListener("resize", size);

    let drawRaf = 0;
    function draw() {
      const now = performance.now();
      ang += (angT - ang) * (isReduced ? 1 : 0.12);
      world.rotation.y = ang;

      for (const o of placed) {
        if (o.a < 1) {
          o.a = clamp((now - o.t0) / 420);
          o.m.position.y = PH + o.y * 1.2 + (1 - easeOutBounce(o.a)) * 7;
        }
      }

      if (ghost && showGhost) {
        const f = fp();
        ghost.position.y = PH + hAt(cell.x, cell.z, f.w, f.d) * 1.2 + Math.sin(now / 260) * 0.06;
      }
      rd.render(scene, cam);
      drawRaf = requestAnimationFrame(draw);
    }
    draw();

    // Attach builder action methods to ref
    pgRef.current = {
      putBrick,
      turn: () => {
        turned = !turned;
        mkGhost();
      },
      undo,
      clear,
      rotateLeft: () => {
        angT -= Math.PI / 2;
      },
      rotateRight: () => {
        angT += Math.PI / 2;
      },
      surpriseMe: () => {
        if (funTimer) return;
        let count = 0;
        const colList: BrickColorKey[] = ["red", "yellow", "blue", "green", "white"];
        funTimer = window.setInterval(() => {
          const w = [1, 2, 2, 4][Math.floor(Math.random() * 4)];
          const d = [1, 1, 2, 2][Math.floor(Math.random() * 4)];
          const cx = 2 + Math.floor(Math.random() * (N - 4 - w + 1));
          const cz = 2 + Math.floor(Math.random() * (N - 4 - d + 1));
          putBrick(cx, cz, w, d, colList[Math.floor(Math.random() * 5)]);
          posGhost();
          if (++count >= 14) {
            clearInterval(funTimer);
            funTimer = 0;
          }
        }, 110);
      },
      snapStory: (width: number, height: number) => {
        const gv = ghost ? ghost.visible : false;
        if (ghost) ghost.visible = false;
        placed.forEach((o) => {
          o.a = 1;
          o.m.position.y = PH + o.y * 1.2;
        });

        const aspect = width / height;
        const v = Math.max(30, 34 / aspect);
        rd.setPixelRatio(1);
        rd.setSize(width, height, false);
        cam.left = (-v * aspect) / 2;
        cam.right = (v * aspect) / 2;
        cam.top = v / 2;
        cam.bottom = -v / 2;
        cam.updateProjectionMatrix();
        rd.render(scene, cam);

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.drawImage(cv, 0, 0);

        size();
        if (ghost) ghost.visible = gv;
        return canvas;
      },
    };

    return () => {
      cv.removeEventListener("pointermove", handlePointerMove);
      cv.removeEventListener("pointerleave", handlePointerLeave);
      cv.removeEventListener("click", handleClick);
      cv.removeEventListener("keydown", handleKeyDown);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", size);
      cancelAnimationFrame(drawRaf);
      clearInterval(funTimer);
    };
  }, [pgColor, pgSize]);

  // Instagram Story PNG Export Handler
  const handleSaveStory = async () => {
    if (!pgRef.current.snapStory) {
      setPgSaveMsg("The builder needs WebGL to save your build. Please turn it on in your browser.");
      return;
    }
    setIsSavingStory(true);
    setPgSaveMsg("Building your story…");

    try {
      try {
        await Promise.all([
          document.fonts.load("700 100px 'Pixelify Sans'"),
          document.fonts.load("500 28px 'DM Mono'"),
          document.fonts.load("800 30px 'Nunito'"),
        ]);
      } catch {}

      const W = 1080;
      const H = 1920;
      const c = document.createElement("canvas");
      c.width = W;
      c.height = H;
      const x = c.getContext("2d");
      if (!x) throw new Error("No 2D context");

      const INK = "#14171c";
      const RED = "#e3000b";
      const YEL = "#ffb400";
      const BLU = "#2aa7f2";
      const GRN = "#5bb838";
      const SITE = "hlnhrr.pages.dev";

      const rr = (ctx: CanvasRenderingContext2D, rx: number, ry: number, rw: number, rh: number, r: number) => {
        ctx.beginPath();
        ctx.moveTo(rx + r, ry);
        ctx.arcTo(rx + rw, ry, rx + rw, ry + rh, r);
        ctx.arcTo(rx + rw, ry + rh, rx, ry + rh, r);
        ctx.arcTo(rx, ry + rh, rx, ry, r);
        ctx.arcTo(rx, ry, rx + rw, ry, r);
        ctx.closePath();
      };

      const brickRect = (
        ctx: CanvasRenderingContext2D,
        bx: number,
        by: number,
        bw: number,
        bh: number,
        col: string,
        r = 12
      ) => {
        ctx.fillStyle = col;
        for (let sx = bx + 28; sx + 36 <= bx + bw - 14; sx += 56) {
          rr(ctx, sx, by - 14, 36, 18, 7);
          ctx.fill();
        }
        rr(ctx, bx, by, bw, bh, r);
        ctx.fill();
        ctx.save();
        rr(ctx, bx, by, bw, bh, r);
        ctx.clip();
        ctx.fillStyle = "rgba(0,0,0,.18)";
        ctx.fillRect(bx, by + bh - 14, bw, 14);
        ctx.fillStyle = "rgba(255,255,255,.22)";
        ctx.fillRect(bx, by, bw, 6);
        ctx.restore();
      };

      const fitText = (
        ctx: CanvasRenderingContext2D,
        text: string,
        wt: number,
        px: number,
        fam: string,
        maxW: number
      ) => {
        while (px > 24) {
          ctx.font = `${wt} ${px}px ${fam}`;
          if (ctx.measureText(text).width <= maxW) break;
          px -= 2;
        }
        return px;
      };

      // Background plate
      x.fillStyle = "#ffffff";
      x.fillRect(0, 0, W, H);
      x.fillStyle = "#e6e9ee";
      for (let gy = 20; gy < H; gy += 40) {
        for (let gx = 20; gx < W; gx += 40) {
          x.beginPath();
          x.arc(gx, gy, 3.5, 0, 7);
          x.fill();
        }
      }

      const PX = "'Pixelify Sans', ui-monospace, monospace";
      const MO = "'DM Mono', ui-monospace, monospace";
      const NU = "Nunito, system-ui, sans-serif";

      x.textBaseline = "alphabetic";
      x.textAlign = "left";

      // Tag
      x.font = `500 26px ${MO}`;
      const tag = "PLAYGROUND · BUILD WITH ME";
      const tw = x.measureText(tag).width;
      brickRect(x, 90, 246, tw + 44, 54, YEL, 8);
      x.fillStyle = "#1b1400";
      x.fillText(tag, 112, 282);

      // Heading
      x.fillStyle = INK;
      const hp = fitText(x, "i built this!", 700, 160, PX, 900);
      x.font = `700 ${hp}px ${PX}`;
      x.fillText("i built this!", 90, 450);

      x.font = `800 36px ${NU}`;
      x.fillStyle = "#566070";
      x.fillText("snap. stack. repeat.", 92, 508);

      // Scene panel
      const px = 90;
      const py = 548;
      const pw = 900;
      const ph = 700;
      x.fillStyle = "rgba(0,0,0,.2)";
      rr(x, px, py + 14, pw, ph, 26);
      x.fill();

      x.fillStyle = "#f4f5f7";
      rr(x, px, py, pw, ph, 26);
      x.fill();

      x.save();
      rr(x, px + 6, py + 6, pw - 12, ph - 12, 20);
      x.clip();
      x.fillStyle = "#e3e6ec";
      for (let gy = py + 20; gy < py + ph; gy += 34) {
        for (let gx = px + 20; gx < px + pw; gx += 34) {
          x.beginPath();
          x.arc(gx, gy, 3, 0, 7);
          x.fill();
        }
      }

      const iw = pw - 12;
      const ih = ph - 12;
      const snapCanvas = pgRef.current.snapStory(iw * 2, ih * 2);
      if (snapCanvas) {
        x.drawImage(snapCanvas, px + 6, py + 6, iw, ih);
      }
      x.restore();

      x.lineWidth = 6;
      x.strokeStyle = INK;
      rr(x, px + 3, py + 3, pw - 6, ph - 6, 24);
      x.stroke();

      // Name brick
      const n = pgName.trim();
      const t = n ? `${n}'s work` : "my work";
      const by = 1322;
      const bh = 140;
      brickRect(x, 90, by, 900, bh, BLU, 14);

      x.fillStyle = "#04101c";
      const np = fitText(x, t, 700, 112, PX, 830);
      x.font = `700 ${np}px ${PX}`;
      x.textAlign = "center";
      x.textBaseline = "middle";
      x.fillText(t, 540, by + bh / 2 - 6);

      // Visit banner
      x.textAlign = "left";
      x.textBaseline = "alphabetic";
      x.fillStyle = INK;
      const yp = fitText(x, "YOUR TURN TO BUILD WITH ME", 700, 52, PX, 900);
      x.font = `700 ${yp}px ${PX}`;
      x.fillText("YOUR TURN TO BUILD WITH ME", 90, 1524);

      brickRect(x, 90, 1576, 900, 90, RED, 12);
      x.fillStyle = "#fff";
      const up = fitText(x, SITE, 700, 64, PX, 840);
      x.font = `700 ${up}px ${PX}`;
      x.textAlign = "center";
      x.textBaseline = "middle";
      x.fillText(SITE, 540, 1576 + 45 - 4);

      // Color studs
      [RED, YEL, BLU, GRN].forEach((k, i) => {
        x.fillStyle = k;
        x.beginPath();
        x.arc(540 - 84 + i * 56, 1716, 15, 0, 7);
        x.fill();
        x.fillStyle = "rgba(0,0,0,.2)";
        x.beginPath();
        x.arc(540 - 84 + i * 56, 1721, 15, 0, 3.1416);
        x.fill();
      });

      const blob = await new Promise<Blob | null>((resolve) => c.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("Could not export blob");

      const slug =
        (pgName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "my") +
        "-lego-story.png";
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = slug;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);

      setPgSaveMsg("Saved! Open it from your gallery and add it to your Instagram story.");
    } catch {
      setPgSaveMsg("Could not save the image. Please try again.");
    } finally {
      setIsSavingStory(false);
    }
  };

  // GitHub commit plate generation
  const [githubGridHtml, setGithubGridHtml] = useState<string>("");
  useEffect(() => {
    let seed = 42;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    let tot = 0;
    let act = 0;
    let best = 0;
    let run = 0;
    let gh = "";

    for (let i = 0; i < 371; i++) {
      const d = i % 7;
      const w = Math.floor(i / 7);
      let l = 0;
      const p = rnd() * (d === 0 || d === 6 ? 0.6 : 1) * (0.5 + 0.5 * Math.sin(w / 5));
      if (p > 0.78) l = 4;
      else if (p > 0.55) l = 3;
      else if (p > 0.32) l = 2;
      else if (p > 0.15) l = 1;
      tot += [0, 1, 3, 6, 10][l];
      if (l) {
        act++;
        run++;
        best = Math.max(best, run);
      } else {
        run = 0;
      }
      gh += `<i class="${l ? "l" + l : ""}"></i>`;
    }

    setGithubGridHtml(gh);
    setStatTotals({ contributions: tot, streak: best, activeDays: act });
  }, []);

  // GitHub twinkling studs animation
  useEffect(() => {
    const gridEl = document.getElementById("grid");
    if (!gridEl) return;
    const interval = setInterval(() => {
      if (document.hidden) return;
      const items = gridEl.children;
      if (!items.length) return;
      for (let k = 0; k < 4; k++) {
        const item = items[Math.floor(Math.random() * items.length)] as HTMLElement;
        item?.classList.add("tw");
        setTimeout(() => item?.classList.remove("tw"), 500);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [githubGridHtml]);

  // Section observer for fixed Nav active links
  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>(".nav a");
    const sections = document.querySelectorAll<HTMLElement>("#top, main > section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((a) => {
              a.classList.toggle("on", a.getAttribute("href") === "#" + entry.target.id);
            });
            const on = document.querySelector<HTMLElement>(".nav a.on");
            const nv = document.querySelector<HTMLElement>(".nav");
            if (on && nv && nv.scrollWidth > nv.clientWidth) {
              nv.scrollTo({
                left: on.offsetLeft - nv.clientWidth / 2 + on.offsetWidth / 2,
                behavior: "smooth",
              });
            }
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Jump to defaultSection if provided
  useEffect(() => {
    if (defaultSection) {
      setTimeout(() => {
        const target = document.getElementById(defaultSection);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, [defaultSection]);

  // Render brick word letters
  const renderWord = (text: string, colorClass: string) => {
    return (
      <div className={`wd ${colorClass}`} aria-hidden="true">
        {Array.from(text).map((char, cIdx) => (
          <div key={cIdx} className="lt">
            {LEGO_LETTER_PATTERNS[char]?.map((row, r) =>
              Array.from(row).map((v, k) =>
                v === "1" ? (
                  <i key={`${r}-${k}`} style={{ gridArea: `${r + 1}/${k + 1}` }} />
                ) : null
              )
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Fixed Three.js loose brick snap background scene */}
      <canvas id="gl" ref={glCanvasRef} aria-hidden="true" />

      {/* Floating pill navigation */}
      <nav className="nav" aria-label="Sections">
        <a href="#top" className="on">Home</a>
        <a href="#about">About</a>
        <a href="#work">Work</a>
        <a href="#skills">Skills</a>
        <a href="#exp">Exp</a>
        <a href="#works">Designs</a>
        <a href="#play">Play</a>
        <a href="#gh">Git</a>
        <a href="#contact">Contact</a>
        <button
          className="tgl"
          id="tg"
          type="button"
          aria-pressed={isDark}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          onClick={() => syncTheme(!isDark)}
        >
          <svg className="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4.5" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
          </svg>
          <svg className="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 6.8 6.8 0 0 0 20 14.5z" />
          </svg>
          <span className="tl">{isDark ? "Dark" : "Light"}</span>
        </button>
      </nav>

      {/* 3D Zone */}
      <div id="zone">
        {/* Hero */}
        <section className="hero" id="top" ref={heroRef}>
          <div className="wrap">
            <div className="hl">
              <span className="pill c-yellow">Hello, human!</span>
              <span className="mono">BS Computer Science · PUP Manila · Navotas, PH</span>
            </div>

            {/* Brick-built Name */}
            <h1 className="name" id="name" ref={nameRef} aria-label="Helena Herrero">
              {renderWord("HELENA", "c-yellow")}
              {renderWord("HERRERO", "c-red")}
            </h1>

            <p className="lead">
              Obsessed with <span>growth</span>. I got into tech through robotics research in high school and keep building what I&apos;m curious about.
            </p>

            <div className="cta">
              <a className="btn bt c-red" href="#build">
                Start the build <span aria-hidden="true">↓</span>
              </a>
              <a className="btn bt c-blue" href="#contact">
                Contact me
              </a>
            </div>

            {/* 3D Tilted Photo Plate */}
            <figure className="plate" id="plate" ref={plateRef}>
              <div className="base">
                <div className="mat">
                  <Image
                    src="/images/profile/lego-portrait.jpg"
                    alt="Portrait of Helena Herrero"
                    width={400}
                    height={432}
                    priority
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center 20%",
                    }}
                  />
                </div>
              </div>
              <figcaption className="mono">Minifig ID · HLN-2026</figcaption>
            </figure>
          </div>
        </section>

        {/* Ticker marquee strip */}
        <div className="strip" aria-hidden="true">
          <div className="tt" id="tick">
            {LEGO_TICKER.concat(LEGO_TICKER).map((t, idx) => (
              <span key={idx}>{t} ✦</span>
            ))}
          </div>
        </div>

        {/* Sticky Sequence */}
        <section className="sw" id="build" aria-label="Manifesto and selected work sequence">
          <div className="stage" id="stage" ref={stageRef}>
            <div className="mf">
              <div className="mfi" id="mfi" ref={mfiRef}>
                <span className="pill c-red">Manifesto</span>
                <h2 className="mt" id="mt">
                  {LEGO_MANIFESTO.map((w, i) => (
                    <span
                      key={i}
                      className={`w${w[1] ? ` hi ${w[2]}` : ""}`}
                    >
                      {w[0]}{" "}
                    </span>
                  ))}
                </h2>
              </div>
            </div>

            {/* Orbiting project chips */}
            <div className="orb" id="orb" ref={orbRef}>
              <svg id="cl" ref={clRef} aria-hidden="true" />
              {LEGO_PROJECTS.map((p, idx) => (
                <a
                  key={idx}
                  ref={(el) => {
                    chipRefs.current[idx] = el;
                  }}
                  href="#work"
                  className={`chip bt ${p.color}`}
                  style={{ opacity: 0 }}
                >
                  {p.title}
                  <small>{p.award || "Project"}</small>
                </a>
              ))}
            </div>

            <div className="wrap capb">
              <span className="mono" id="stp" ref={stepLabelRef}>
                Step 1 · Snap the pieces together
              </span>
              <div className="sb" id="sb" ref={stepBarRef} aria-hidden="true" />
            </div>

            <span className="mono hint" aria-hidden="true">
              Keep scrolling
            </span>
          </div>
        </section>
      </div>

      <main>
        {/* About Me: Instruction Booklet */}
        <section className="solid" id="about">
          <div className="wrap">
            <div className="lab c-red">
              <span className="tag">Instructions</span>
              <h2 className="h2">About me</h2>
            </div>
            <div className="abt">
              <ol className="man" data-rv>
                <li className="c-red">
                  <span className="sn">1</span>
                  <p>
                    I&apos;m <em>Helena Herrero</em>. I started getting into tech back in high school through robotics research, and honestly, it just kept growing from there.
                  </p>
                </li>
                <li className="c-yellow">
                  <span className="sn">2</span>
                  <p>
                    I started working on different projects in data science, analytics, web development, information systems, and machine learning. Most of the time, I was just curious about something and wanted to see if I could build it.
                  </p>
                </li>
                <li className="c-blue">
                  <span className="sn">3</span>
                  <p>
                    I&apos;m currently focused on data science, AI, and machine learning. I also enjoy learning by experimenting, breaking things, fixing them, and trying new technologies.
                  </p>
                </li>
                <li className="c-green">
                  <span className="sn">4</span>
                  <p>
                    Lately, I&apos;ve been getting into cybersecurity, especially digital forensics. I find it interesting how you can look at digital evidence and piece together what actually happened.
                  </p>
                </li>
                <li className="c-grey">
                  <span className="sn">5</span>
                  <p>
                    I don&apos;t really have everything figured out yet. I&apos;m just enjoying the process of learning, building, and seeing where it takes me.
                  </p>
                </li>
              </ol>

              <div>
                <div className="stl">
                  <div className="tile tilt brk bt c-yellow" data-rv>
                    <b data-n="6">6</b>
                    <span>Projects</span>
                  </div>
                  <div className="tile tilt brk bt c-blue" data-rv>
                    <b data-n="7">7</b>
                    <span>Hackathons</span>
                  </div>
                  <div className="tile tilt brk bt c-green" data-rv>
                    <b data-n="7">7</b>
                    <span>Volunteer roles</span>
                  </div>
                  <div className="tile tilt brk bt c-red" data-rv>
                    <b data-n="6">6</b>
                    <span>Org roles</span>
                  </div>
                  <div className="tile tilt w brk bt c-grey" data-rv>
                    <b>BS Computer Science</b>
                    <span>2nd year · PUP Manila · 2025-2029</span>
                  </div>
                </div>

                <div className="tg" data-rv>
                  <span>Robotics</span>
                  <span>Data science</span>
                  <span>AI / ML</span>
                  <span>Cybersecurity</span>
                  <span>Digital forensics</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Work: Projects */}
        <section className="solid" id="work">
          <div className="wrap">
            <div className="lab c-blue">
              <span className="tag">Selected work</span>
              <h2 className="h2">Projects</h2>
            </div>
            <div className="rows" id="pr">
              {LEGO_PROJECTS.map((p, idx) => (
                <a
                  key={idx}
                  className={`row ${p.color}`}
                  href="#work"
                  data-rv
                  onClick={(e) => {
                    e.preventDefault();
                    setWorksModalType("ppt");
                  }}
                >
                  <div
                    className="ico"
                    dangerouslySetInnerHTML={{
                      __html: renderIsoBrickSvg(LEGO_COLOR_MAP[p.color], 2, 2),
                    }}
                  />
                  <div>
                    <h3>{p.title}</h3>
                    {p.award && <span className="aw">{p.award}</span>}
                  </div>
                  <div>
                    <p>{p.description}</p>
                    <div className="sm">
                      {p.tags.map((tag, tIdx) => (
                        <span key={tIdx}>{tag}</span>
                      ))}
                    </div>
                    <span className="go">
                      Open project <span>↗</span>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="solid" id="skills">
          <div className="wrap">
            <div className="lab c-green">
              <span className="tag">Disciplines</span>
              <h2 className="h2">Skills</h2>
            </div>

            <div className="wall" data-rv>
              <div className="wr">
                <b className="br brk bt c-red" style={{ flex: "2 1 0" }}>Robotics</b>
                <b className="br brk bt c-yellow" style={{ flex: "3 1 0" }}>Data science</b>
              </div>
              <div className="wr off">
                <b className="br brk bt c-blue" style={{ flex: "3 1 0" }}>AI / ML</b>
                <b className="br brk bt c-green" style={{ flex: "3 1 0" }}>Cybersecurity</b>
              </div>
              <div className="wr off2">
                <b className="br brk bt c-grey" style={{ flex: "4 1 0" }}>Cloud computing</b>
              </div>
            </div>

            <div className="tech" data-rv>
              <div className="mono">Technical skills</div>
              <div className="tgrid">
                {LEGO_TECHNICAL_SKILLS.map((grp, idx) => (
                  <div key={idx} className={`tc ${grp.color}`}>
                    <b className="tcl brk bt">{grp.category}</b>
                    <div className="tcs">
                      {grp.items.map((item, iIdx) => (
                        <span key={iIdx}>{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mono" style={{ marginBottom: "12px", color: "var(--mut)" }} data-rv>
              Used across my projects
            </div>
            <div className="tools" id="tools" data-rv>
              {LEGO_TOOLS.map((t, idx) => {
                const colors = ["var(--red)", "var(--yellow)", "var(--blue)", "var(--green)"];
                const color = colors[idx % 4];
                return (
                  <span
                    key={idx}
                    style={
                      {
                        "--c": color,
                        borderLeft: `7px solid ${color}`,
                      } as React.CSSProperties
                    }
                  >
                    {t}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* Experience: Bento grid */}
        <section className="solid" id="exp">
          <div className="wrap">
            <div className="lab c-yellow">
              <span className="tag">Experience</span>
              <h2 className="h2">Experiences</h2>
            </div>
            <div className="exg" id="ex">
              {LEGO_EXPERIENCE.map((category, idx) => (
                <div key={idx} className={`exb bt ${category.color}`} data-rv>
                  <div className="hd">
                    <span>{category.title}</span>
                    <span className="mono">{category.code}</span>
                  </div>
                  {category.items.map(([role, company], rIdx) => (
                    <div key={rIdx} className="rw">
                      <b>{role}</b>
                      <span>{company}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Creative Works: Mosaic cards */}
        <section className="solid" id="works">
          <div className="wrap">
            <div className="lab c-red">
              <span className="tag">Creative</span>
              <h2 className="h2">Works</h2>
            </div>
            <div className="wk" id="wk">
              {LEGO_WORKS.map((work, idx) => (
                <a
                  key={idx}
                  className="wc tilt"
                  href="#works"
                  data-rv
                  onClick={(e) => {
                    e.preventDefault();
                    setWorksModalType(work.type);
                  }}
                >
                  <div className="mx">
                    {Array.from({ length: 64 }).map((_, studIdx) => {
                      const colors = ["#e3000b", "#ffb400", "#2aa7f2", "#5bb838", "#b9bec7"];
                      const c = colors[studIdx % colors.length];
                      return (
                        <i
                          key={studIdx}
                          className={studIdx % 2 === 0 ? "on" : ""}
                          style={
                            {
                              "--k": c,
                              background: studIdx % 2 === 0 ? c : undefined,
                            } as React.CSSProperties
                          }
                        />
                      );
                    })}
                  </div>
                  <div className="cp">
                    <b>{work.title}</b>
                    <span>{work.subtitle} ↗</span>
                  </div>
                </a>
              ))}
            </div>
            <a
              className="btn bt c-yellow more"
              href="https://artletsstudentcouncilmock.my.canva.site/helena-herrero"
              target="_blank"
              rel="noreferrer"
            >
              More designs →
            </a>
          </div>
        </section>

        {/* Playground: 3D Brick Builder */}
        <section className="solid" id="play">
          <div className="wrap">
            <div className="lab c-yellow">
              <span className="tag">Playground</span>
              <h2 className="h2">Build with me</h2>
            </div>
            <div className="pgbox" data-rv>
              <div className="pgui" role="toolbar" aria-label="Brick builder controls">
                {/* Color swatches */}
                <div className="grp" role="group" aria-label="Color">
                  {(["red", "yellow", "blue", "green", "white"] as BrickColorKey[]).map((c) => (
                    <button
                      key={c}
                      className="sw3"
                      data-col={c}
                      style={{
                        backgroundColor: c === "white" ? "#f4f5f7" : `var(--${c})`,
                      }}
                      aria-label={c}
                      aria-pressed={pgColor === c}
                      onClick={() => setPgColor(c)}
                    />
                  ))}
                </div>

                {/* Size buttons */}
                <div className="grp" role="group" aria-label="Size">
                  {[
                    { label: "1×1", w: 1, d: 1 },
                    { label: "2×1", w: 2, d: 1 },
                    { label: "2×2", w: 2, d: 2 },
                    { label: "4×2", w: 4, d: 2 },
                  ].map((sz) => (
                    <button
                      key={sz.label}
                      data-sz={`${sz.w}x${sz.d}`}
                      aria-pressed={pgSize.w === sz.w && pgSize.d === sz.d}
                      onClick={() => setPgSize({ w: sz.w, d: sz.d })}
                    >
                      {sz.label}
                    </button>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="grp">
                  <button type="button" onClick={() => pgRef.current.turn?.()}>
                    Turn
                  </button>
                  <button type="button" onClick={() => pgRef.current.undo?.()}>
                    Undo
                  </button>
                  <button type="button" onClick={() => pgRef.current.clear?.()}>
                    Clear
                  </button>
                </div>

                {/* Orbit & Surprise */}
                <div className="grp">
                  <button type="button" aria-label="Orbit left" onClick={() => pgRef.current.rotateLeft?.()}>
                    ◀
                  </button>
                  <button type="button" aria-label="Orbit right" onClick={() => pgRef.current.rotateRight?.()}>
                    ▶
                  </button>
                  <button type="button" onClick={() => pgRef.current.surpriseMe?.()}>
                    Surprise me
                  </button>
                </div>

                <span className="mono" id="pCount">
                  Bricks {pgBrickCount}
                </span>
              </div>

              {/* 3D Canvas */}
              <canvas
                id="pgc"
                ref={pgcCanvasRef}
                tabIndex={0}
                aria-label="3D brick builder. Click the baseplate to place a brick. Arrow keys move it, Enter places it, R turns it, Z undoes."
              />

              {/* Instagram Story Export Bar */}
              <div className="pgsave">
                <div className="pgshow">Show it off!</div>
                <label className="mono" htmlFor="pgName">
                  Your name
                  <input
                    id="pgName"
                    maxLength={20}
                    placeholder="e.g. helena"
                    autoComplete="off"
                    value={pgName}
                    onChange={(e) => setPgName(e.target.value)}
                  />
                </label>
                <button
                  className="btn bt c-red"
                  id="pSave"
                  type="button"
                  disabled={isSavingStory}
                  onClick={handleSaveStory}
                >
                  <span>Save my work ↓</span>
                  <small>share it on ig!</small>
                </button>
                <div id="pgSaveMsg" aria-live="polite">
                  {pgSaveMsg}
                </div>
              </div>

              <p className="pgnote mono">Click to place · Arrow keys move · Enter places · R turns · Z undoes</p>
            </div>
          </div>
        </section>

        {/* Contributions: GitHub Studs Plate */}
        <section className="solid" id="gh">
          <div className="wrap">
            <div className="lab c-green">
              <span className="tag">Studs = commits</span>
              <h2 className="h2">Contributions</h2>
            </div>
            <div className="gh" data-rv>
              <div className="sw2 mono">← swipe the plate →</div>
              <div className="gw">
                <div id="grid" dangerouslySetInnerHTML={{ __html: githubGridHtml }} />
              </div>
              <div className="sg">
                <div className="seg brk bt c-red">
                  <b id="s1">{statTotals.contributions}</b>
                  <span>contributions</span>
                </div>
                <div className="seg brk bt c-yellow">
                  <b id="s2">{statTotals.streak}</b>
                  <span>longest streak</span>
                </div>
                <div className="seg brk bt c-blue">
                  <b id="s3">{statTotals.activeDays}</b>
                  <span>active days</span>
                </div>
              </div>
              <div className="nt">{"// Connect with @helenaherrero on GitHub for real-time commits."}</div>
            </div>
          </div>
        </section>

        {/* Contact Me & BMO Guestbook */}
        <section className="solid" id="contact">
          <div className="wrap">
            <div className="lab c-blue">
              <span className="tag">Say hi</span>
              <h2 className="h2">Contact me!</h2>
            </div>

            <div className="ct">
              <div>
                <h3 className="big" data-rv>
                  <span className="c-red">Projects /</span>
                  <span className="c-yellow">Meetups /</span>
                  <span className="c-blue">Collabs</span>
                </h3>
                <p>
                  I&apos;m a 2nd-year Bachelor of Science in Computer Science student at PUP Manila, based in Navotas, Philippines. For me, learning is more than just a part of college. It is something I genuinely enjoy and choose to pursue every day.
                </p>
                <p>
                  I love attending tech conferences, meetups, and events where I can connect with people, exchange ideas, discover new perspectives, and be inspired by others in the field. Every conversation and experience reminds me why I chose this path and motivates me to keep growing with purpose and passion.
                </p>
                <p>
                  I&apos;m always open to learning, creating, connecting, and taking on new opportunities. If you&apos;re looking for someone curious, creative, and passionate about technology,{" "}
                  <a href="mailto:helenaherrero515@gmail.com">feel free to book a meeting with me</a>.
                </p>
                <div className="tags">
                  <span>
                    <i />Available for projects / meetups / collabs
                  </span>
                  <span>Based in Navotas, PH</span>
                </div>
              </div>

              <div className="btns" data-rv>
                <div className="mono">Press a brick</div>
                <a className="btn bt c-green" href="https://github.com/helenaherrero" target="_blank" rel="noreferrer">
                  GitHub <span>↗</span>
                </a>
                <a className="btn bt c-blue" href="https://linkedin.com/in/helena-herrero" target="_blank" rel="noreferrer">
                  LinkedIn <span>↗</span>
                </a>
                <a className="btn bt c-yellow" href="mailto:helenaherrero515@gmail.com">
                  Email <span>↗</span>
                </a>
                <a className="btn bt c-red" href="/images/works/ppt-decks/Copy of GUIDHER PITCH DECK.pdf" target="_blank" rel="noreferrer">
                  Download CV <span>↓</span>
                </a>
              </div>
            </div>

            {/* BMO Guestbook */}
            <div className="lab c-yellow" style={{ marginTop: "80px" }}>
              <span className="tag">Guestbook</span>
              <h2 className="h2">Leave a note</h2>
            </div>

            <div className="gbk">
              <form
                className={`nf bmo${isBmoHappy ? " happy" : ""}`}
                id="nf"
                autoComplete="off"
                data-rv
                onSubmit={handleGuestbookSubmit}
              >
                <div className="bmo-arm l" aria-hidden="true" />
                <div className="bmo-arm r" aria-hidden="true" />
                <div className="bmo-body bt">
                  <div className="bmo-top" aria-hidden="true">
                    <div className="bmo-spk">
                      <i /><i /><i /><i /><i /><i />
                    </div>
                    <div className="bmo-led">
                      <i className="g" />
                      <i className="b" />
                    </div>
                  </div>

                  <div className="bmo-screen">
                    <div className="bmo-face" aria-hidden="true">
                      <i /><i /><b />
                    </div>
                    <input
                      id="gn"
                      maxLength={24}
                      placeholder="your name"
                      aria-label="Your name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                    />
                    <textarea
                      id="gm"
                      rows={4}
                      maxLength={160}
                      placeholder="leave a note for Helena..."
                      aria-label="Your note for Helena"
                      value={guestMessage}
                      onChange={(e) => setGuestMessage(e.target.value)}
                    />
                    <div id="gst" aria-live="polite">
                      {guestStatus}
                    </div>
                  </div>

                  <div className="bmo-ctl">
                    <div className="bmo-pad" aria-hidden="true">
                      <i className="dp" />
                      <i className="tri" />
                      <i className="dot" />
                    </div>
                    <button className="bmo-send" id="gs" type="submit" aria-label="Send note">
                      Send
                    </button>
                  </div>
                </div>

                <div className="bmo-ports" aria-hidden="true">
                  <i /><i /><i /><i /><i /><i />
                </div>
              </form>

              <div>
                <div className="log" id="gb" aria-live="polite">
                  {guestNotes.length === 0 ? (
                    <p>No notes yet. Be the first.</p>
                  ) : (
                    guestNotes.map((note, idx) => {
                      const d = new Date(note.t);
                      const timeStr = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
                      return (
                        <p key={idx}>
                          <b>{timeStr}</b>
                          <span>
                            <em>{note.n}</em> {note.m}
                          </span>
                        </p>
                      );
                    })
                  )}
                </div>
                <div className="nt">{"// Saved on this device only."}</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="ft">
        <div className="wrap ftw">
          <a className="flogo brk bt c-yellow" href="#top" aria-label="hln, back to top">
            hln
          </a>
          <p>© 2026 hln. All rights reserved.</p>
        </div>
      </footer>

      {/* Creative Works Modal */}
      <LegoWorksModal type={worksModalType} onClose={() => setWorksModalType(null)} />
    </>
  );
}
