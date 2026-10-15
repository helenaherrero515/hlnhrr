"use client";

import React, { useEffect } from "react";
import Image from "next/image";

interface LegoWorksModalProps {
  type: "pubmats" | "swags" | "ppt" | null;
  onClose: () => void;
}

const PUBMATS = [
  { org: "AWS Community Day PH", title: "Venue Reveal", img: "/images/works/pubmats/aws community day 2026/venue reveal.png" },
  { org: "AWS Community Day PH", title: "Banner", img: "/images/works/pubmats/aws community day 2026/banner.png" },
  { org: "AWS Community Day PH", title: "Countdown", img: "/images/works/pubmats/aws community day 2026/countdown.png" },
  { org: "AWS Community Day PH", title: "Program Flow", img: "/images/works/pubmats/aws community day 2026/program flow.png" },
  { org: "AWS Community Day PH", title: "Meet The Host", img: "/images/works/pubmats/aws community day 2026/meet the host.png" },
  { org: "AWS BuildNights", title: "Meet The Judges", img: "/images/works/pubmats/aws build night/meet the judgess.png" },
  { org: "AWS BuildNights", title: "Meet The Winners", img: "/images/works/pubmats/aws build night/meet the winners.png" },
  { org: "AWS BuildNights", title: "Registration", img: "/images/works/pubmats/aws build night/registration.png" },
  { org: "AWS SBG PUP", title: "Workshop Poster", img: "/images/works/pubmats/aws sbg pup/workshop 1 poster.png" },
  { org: "AWS User Group PH", title: "Agentic Football Cup", img: "/images/works/pubmats/aws user group ph/agentic football cup pubs.png" },
  { org: "Founders Live Manila", title: "Teaser Poster", img: "/images/works/pubmats/founders live manila/teaser.png" },
];

const SWAGS = [
  { org: "AWS Community Day PH 2026", title: "T-Shirt & Sticker Pack Collateral", img: "/images/works/swags-design/aws-community-day-2026.png" },
  { org: "Microsoft Build 2026", title: "Developer Merch & Sticker Badge Set", img: "/images/works/swags-design/microsoft-build-2026.png" },
];

const DECKS = [
  {
    org: "GuidHer Pitch Deck",
    title: "Community-Sourced Safer Routing For Women",
    cover: "/images/works/ppt-decks/guidher-pitch-deck-cover.png",
    pdf: "/images/works/ppt-decks/Copy of GUIDHER PITCH DECK.pdf",
  },
  {
    org: "Academic Presentation",
    title: "Computer Science Portfolio & Research Deck",
    cover: "/images/works/ppt-decks/act1-herrero-helena-cover.png",
    pdf: "/images/works/ppt-decks/ACT1_HERRERO, HELENA.pdf",
  },
];

export function LegoWorksModal({ type, onClose }: LegoWorksModalProps) {
  useEffect(() => {
    if (!type) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        backgroundColor: "rgba(10, 14, 20, 0.75)",
        backdropFilter: "blur(6px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          maxHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "12px",
          border: "3px solid var(--ink)",
          background: "var(--panel)",
          boxShadow: "0 12px 0 #0004",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            background: type === "pubmats" ? "var(--red)" : type === "swags" ? "var(--yellow)" : "var(--blue)",
            color: type === "swags" ? "var(--on-yellow)" : "#ffffff",
            boxShadow: "inset 0 -5px 0 #0000002e",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                font: "700 24px/1 var(--fd)",
                letterSpacing: "-0.01em",
                color: type === "swags" ? "#1b1400" : "#ffffff",
              }}
            >
              {type === "pubmats" ? "Publication Materials" : type === "swags" ? "Swags & Merch Design" : "PPT Decks & Pitches"}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn bt c-red"
            style={{ padding: "6px 14px", fontSize: "14px" }}
          >
            ✕ Close
          </button>
        </div>

        {/* Content list */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {type === "pubmats" &&
            PUBMATS.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--paper)",
                  border: "2px solid var(--line)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 4px 0 #0002",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ position: "relative", width: "100%", aspectRatio: "1" }}>
                  <Image src={item.img} alt={item.title} fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ padding: "12px 14px" }}>
                  <span className="mono" style={{ color: "var(--mut)", fontSize: "11px" }}>
                    {item.org}
                  </span>
                  <b style={{ display: "block", font: "700 16px/1.2 var(--fd)", marginTop: "4px" }}>
                    {item.title}
                  </b>
                </div>
              </div>
            ))}

          {type === "swags" &&
            SWAGS.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--paper)",
                  border: "2px solid var(--line)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 4px 0 #0002",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ position: "relative", width: "100%", aspectRatio: "1.2" }}>
                  <Image src={item.img} alt={item.title} fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ padding: "12px 14px" }}>
                  <span className="mono" style={{ color: "var(--mut)", fontSize: "11px" }}>
                    {item.org}
                  </span>
                  <b style={{ display: "block", font: "700 18px/1.2 var(--fd)", marginTop: "4px" }}>
                    {item.title}
                  </b>
                </div>
              </div>
            ))}

          {type === "ppt" &&
            DECKS.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--paper)",
                  border: "2px solid var(--line)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 4px 0 #0002",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ position: "relative", width: "100%", aspectRatio: "1.4" }}>
                  <Image src={item.cover} alt={item.title} fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ padding: "14px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "12px" }}>
                  <div>
                    <span className="mono" style={{ color: "var(--mut)", fontSize: "11px" }}>
                      {item.org}
                    </span>
                    <b style={{ display: "block", font: "700 18px/1.2 var(--fd)", marginTop: "4px" }}>
                      {item.title}
                    </b>
                  </div>
                  <a
                    href={item.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="btn bt c-blue"
                    style={{ fontSize: "13px", padding: "8px 14px", textAlign: "center", justifyContent: "center" }}
                  >
                    View Presentation PDF ↗
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
