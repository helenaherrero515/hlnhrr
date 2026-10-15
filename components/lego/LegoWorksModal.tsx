"use client";

import React, { useState, useEffect } from "react";

interface LegoWorksModalProps {
  type: "pubmats" | "swags" | "ppt" | "branding" | null;
  onClose: () => void;
}

const PUBMATS = [
  // AWS Community Day PH 2026
  { org: "AWS Community Day PH", title: "Venue Reveal Poster", img: "/images/works/pubmats/aws community day 2026/venue reveal.png" },
  { org: "AWS Community Day PH", title: "Official Event Banner", img: "/images/works/pubmats/aws community day 2026/banner.png" },
  { org: "AWS Community Day PH", title: "Countdown Teaser Poster", img: "/images/works/pubmats/aws community day 2026/countdown.png" },
  { org: "AWS Community Day PH", title: "Program Flow & Schedule", img: "/images/works/pubmats/aws community day 2026/program flow.png" },
  { org: "AWS Community Day PH", title: "Meet The Host Announcement", img: "/images/works/pubmats/aws community day 2026/meet the host.png" },
  { org: "AWS Community Day PH", title: "Call for Media Team Volunteers", img: "/images/works/pubmats/aws community day 2026/call for media team.png" },
  { org: "AWS Community Day PH", title: "Official Email Header", img: "/images/works/pubmats/aws community day 2026/email header.png" },
  { org: "AWS Community Day PH", title: "Application Closed Notice", img: "/images/works/pubmats/aws community day 2026/application closed.png" },
  // AWS BuildNights
  { org: "AWS BuildNights", title: "Meet The Judges", img: "/images/works/pubmats/aws build night/meet the judgess.png" },
  { org: "AWS BuildNights", title: "Meet The Winners", img: "/images/works/pubmats/aws build night/meet the winners.png" },
  { org: "AWS BuildNights", title: "Event Highlights & Recap", img: "/images/works/pubmats/aws build night/recap pics.png" },
  { org: "AWS BuildNights", title: "Registration Call", img: "/images/works/pubmats/aws build night/registration.png" },
  { org: "AWS BuildNights", title: "Challenge Reveal & Onboarding", img: "/images/works/pubmats/aws build night/reveal and onboarding.png" },
  // AWS SBG PUP
  { org: "AWS SBG PUP", title: "Cloud Workshop 1 Poster", img: "/images/works/pubmats/aws sbg pup/workshop 1 poster.png" },
  { org: "AWS SBG PUP", title: "Top DataCamp Scholars Recognition", img: "/images/works/pubmats/aws sbg pup/top datacamp scholars.png" },
  // AWS User Group PH
  { org: "AWS User Group PH", title: "Agentic Football Cup Poster", img: "/images/works/pubmats/aws user group ph/agentic football cup pubs.png" },
  { org: "AWS User Group PH", title: "Community Cover Photo", img: "/images/works/pubmats/aws user group ph/cover photo.png" },
  { org: "AWS User Group PH", title: "Kiro Night Community Pub", img: "/images/works/pubmats/aws user group ph/kiro night pubs.png" },
  { org: "AWS User Group PH", title: "Community Logo & Brand Identity", img: "/images/works/pubmats/aws user group ph/logo.png" },
  { org: "AWS User Group PH", title: "Meet The Speaker & Fun Fact", img: "/images/works/pubmats/aws user group ph/meet the speaker and fun fact pubs.png" },
  // Founders Live Manila
  { org: "Founders Live Manila", title: "Founders Live Manila Pitch Teaser", img: "/images/works/pubmats/founders live manila/teaser.png" },
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
  const [filter, setFilter] = useState<string>("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filteredPubmats = filter === "all" ? PUBMATS : PUBMATS.filter((p) => p.org === filter);

  useEffect(() => {
    if (!type) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxIdx !== null) {
          setLightboxIdx(null);
        } else {
          onClose();
        }
      } else if (lightboxIdx !== null) {
        if (e.key === "ArrowLeft") {
          setLightboxIdx((prev) => (prev !== null ? (prev - 1 + filteredPubmats.length) % filteredPubmats.length : 0));
        } else if (e.key === "ArrowRight") {
          setLightboxIdx((prev) => (prev !== null ? (prev + 1) % filteredPubmats.length : 0));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [type, onClose, lightboxIdx, filteredPubmats.length]);

  if (!type) return null;

  const currentLightboxItem = lightboxIdx !== null ? filteredPubmats[lightboxIdx] : null;

  return (
    <>
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
          className="lego-modal-box exhibit-box"
          style={{
            width: "100%",
            maxWidth: type === "pubmats" ? "1120px" : "960px",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            borderRadius: "12px",
            border: "3px solid var(--ink)",
            background: "var(--panel)",
            boxShadow: "0 16px 0 #0004",
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
                {type === "pubmats"
                  ? "Publication Materials Exhibit"
                  : type === "swags"
                  ? "Swags & Merch Design"
                  : type === "branding"
                  ? "Branding & Visual Systems"
                  : "PPT Decks & Pitches"}
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

          {/* Filter Bar for Pubmats */}
          {type === "pubmats" && (
            <div className="exhibit-filter-bar">
              {[
                { key: "all", label: `All (${PUBMATS.length})` },
                { key: "AWS Community Day PH", label: "AWS Community Day" },
                { key: "AWS BuildNights", label: "AWS BuildNights" },
                { key: "AWS SBG PUP", label: "AWS SBG PUP" },
                { key: "AWS User Group PH", label: "AWS User Group" },
                { key: "Founders Live Manila", label: "Founders Live" },
              ].map((c) => (
                <button
                  key={c.key}
                  type="button"
                  className={`exhibit-filter-btn ${filter === c.key ? "active" : ""}`}
                  onClick={() => setFilter(c.key)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}

          {/* Modal Content Scroll Area */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              overscrollBehavior: "contain",
            }}
          >
            {type === "pubmats" && (
              <div className="exhibit-gallery">
                {filteredPubmats.map((item, idx) => (
                  <div
                    key={idx}
                    className="exhibit-card"
                    onClick={() => setLightboxIdx(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setLightboxIdx(idx);
                      }
                    }}
                  >
                    <div className="exhibit-media">
                      <img src={item.img} alt={item.title} loading="lazy" />
                    </div>
                    <div className="exhibit-caption">
                      <span className="exhibit-pill">{item.org}</span>
                      <h4 className="exhibit-title">{item.title}</h4>
                      <div className="exhibit-action-row">
                        <span className="exhibit-inspect">🔍 Inspect full size</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {type === "swags" && (
              <div className="lego-work-grid">
                {SWAGS.map((item, idx) => (
                  <div key={idx} className="lego-work-item">
                    <div className="lego-work-item-img">
                      <img src={item.img} alt={item.title} loading="lazy" />
                    </div>
                    <div className="lego-work-item-info">
                      <div>
                        <span className="mono" style={{ color: "var(--mut)", fontSize: "11px" }}>
                          {item.org}
                        </span>
                        <b style={{ display: "block", font: "700 18px/1.2 var(--fd)", marginTop: "4px" }}>
                          {item.title}
                        </b>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {type === "branding" && (
              <div style={{ padding: "40px 24px", textAlign: "center", maxWidth: "580px", margin: "0 auto" }}>
                <div style={{ maxWidth: "240px", margin: "0 auto 24px" }}>
                  <img
                    src="/images/works/branding-construction.svg"
                    alt="Branding Under Construction"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "12px",
                      border: "3px solid var(--ink)",
                      boxShadow: "4px 4px 0 var(--ink)",
                    }}
                  />
                </div>
                <span
                  className="mono"
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    background: "var(--yellow)",
                    color: "#000",
                    fontWeight: 700,
                    borderRadius: "4px",
                    border: "2px solid var(--ink)",
                    marginBottom: "14px",
                    fontSize: "12px",
                  }}
                >
                  🚧 WORK IN PROGRESS · REBUILDING BRICKS
                </span>
                <h3 style={{ font: "700 clamp(24px, 3.5vw, 32px)/1.2 var(--fd)", margin: "0 0 12px" }}>
                  Branding & Identity System
                </h3>
                <p style={{ color: "var(--mut)", fontSize: "15px", lineHeight: 1.6, margin: "0 0 24px" }}>
                  I'm curating and refining case studies for visual brand identities, logo marks, typography guidelines, and design collateral created for student orgs and tech communities. Check back soon for the full breakdown!
                </p>
                <button
                  type="button"
                  className="btn bt c-blue"
                  onClick={onClose}
                  style={{ margin: "0 auto", padding: "10px 24px", fontSize: "14px" }}
                >
                  Got it, keep building 🧱
                </button>
              </div>
            )}

            {type === "ppt" && (
              <div className="lego-work-grid">
                {DECKS.map((item, idx) => (
                  <div key={idx} className="lego-work-item">
                    <div className="lego-work-item-img">
                      <img src={item.cover} alt={item.title} loading="lazy" />
                    </div>
                    <div className="lego-work-item-info">
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
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Viewer */}
      {currentLightboxItem && lightboxIdx !== null && (
        <div className="exhibit-lightbox" role="dialog" aria-modal="true">
          <div className="exhibit-lightbox-backdrop" onClick={() => setLightboxIdx(null)} />
          <div className="exhibit-lightbox-box">
            <div className="exhibit-lightbox-top">
              <div className="exhibit-lightbox-meta">
                <span className="exhibit-pill">{currentLightboxItem.org}</span>
                <h3 style={{ margin: "4px 0 0", font: "700 20px/1.2 var(--fd)", color: "#fff" }}>
                  {currentLightboxItem.title}
                </h3>
              </div>
              <button
                type="button"
                className="pm-close"
                onClick={() => setLightboxIdx(null)}
                aria-label="Close Lightbox"
              >
                ✕
              </button>
            </div>
            <div className="exhibit-lightbox-viewer">
              <button
                type="button"
                className="exhibit-nav-btn prev"
                onClick={() => setLightboxIdx((lightboxIdx - 1 + filteredPubmats.length) % filteredPubmats.length)}
                aria-label="Previous artwork"
              >
                ‹
              </button>
              <div className="exhibit-lightbox-img-wrap">
                <img src={currentLightboxItem.img} alt={currentLightboxItem.title} />
              </div>
              <button
                type="button"
                className="exhibit-nav-btn next"
                onClick={() => setLightboxIdx((lightboxIdx + 1) % filteredPubmats.length)}
                aria-label="Next artwork"
              >
                ›
              </button>
            </div>
            <div className="exhibit-lightbox-bar">
              <span className="mono" style={{ color: "#a0a9b8", fontSize: "12px" }}>
                Artwork {lightboxIdx + 1} of {filteredPubmats.length} · Use ‹ › or Arrow keys
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
