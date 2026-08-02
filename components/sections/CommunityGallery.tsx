"use client";

import { UsersRound } from "lucide-react";
import type { CSSProperties, PointerEvent, ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import type { Community } from "@/types";
import { formatDate } from "@/utils";

interface CommunityGalleryProps {
  communities: Community[];
}

type CommunityGalleryStyle = CSSProperties & {
  "--community-image": string;
  "--community-index": string;
};

function compactDate(startDate: string, endDate?: string): string {
  return `${formatDate(startDate)} - ${endDate ? formatDate(endDate) : "Present"}`;
}

function communityMeta(community: Community): string {
  const dates = community.startDate ? compactDate(community.startDate, community.endDate) : "";
  return [community.location, dates].filter(Boolean).join(" • ");
}

function communityGalleryStyle(community: Community, index: number): CommunityGalleryStyle {
  return {
    "--community-image": `url(${community.image ?? "/images/communities/community-placeholder.jpg"})`,
    "--community-index": `${index}`,
  };
}

export function CommunityGallery({ communities }: CommunityGalleryProps): ReactElement {
  const trackRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const dragStateRef = useRef<{ pointerId: number; startX: number; scrollLeft: number } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  function scrollToIndex(index: number): void {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: track.clientWidth * index, behavior: "smooth" });
    setActiveIndex(index);
  }

  function pauseBriefly(): void {
    setIsPaused(true);

    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = window.setTimeout(() => {
      setIsPaused(false);
    }, 2800);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>): void {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const track = trackRef.current;
    if (!track) return;

    setIsPaused(true);
    setIsDragging(true);
    dragStateRef.current = { pointerId: event.pointerId, startX: event.clientX, scrollLeft: track.scrollLeft };
    track.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>): void {
    const track = trackRef.current;
    const dragState = dragStateRef.current;

    if (!track || !dragState || dragState.pointerId !== event.pointerId) return;

    const walk = event.clientX - dragState.startX;
    track.scrollLeft = dragState.scrollLeft - walk;
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>): void {
    const track = trackRef.current;
    const dragState = dragStateRef.current;

    if (!track || !dragState || dragState.pointerId !== event.pointerId) return;

    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }

    const dragOffset = event.clientX - dragState.startX;
    dragStateRef.current = null;
    setIsDragging(false);

    if (track.clientWidth > 0) {
      let targetIndex = activeIndex;
      if (Math.abs(dragOffset) > 50) {
        if (dragOffset > 0 && activeIndex > 0) {
          targetIndex = activeIndex - 1;
        } else if (dragOffset < 0 && activeIndex < communities.length - 1) {
          targetIndex = activeIndex + 1;
        }
      }
      scrollToIndex(targetIndex);
    }

    pauseBriefly();
  }

  function handleScroll(): void {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0 || isDragging) return;

    const nextIndex = Math.round(track.scrollLeft / track.clientWidth);
    setActiveIndex(Math.min(Math.max(nextIndex, 0), communities.length - 1));
  }

  useEffect(() => {
    if (communities.length <= 1 || isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        const nextIndex = (currentIndex + 1) % communities.length;
        const track = trackRef.current;

        if (track) {
          track.scrollTo({ left: track.clientWidth * nextIndex, behavior: "smooth" });
        }

        return nextIndex;
      });
    }, 3200);

    return () => window.clearInterval(timer);
  }, [communities.length, isPaused]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      className="community-gallery"
      aria-label="Automatic and manually scrollable community gallery slideshow"
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={() => setIsPaused(false)}
    >
      <div className="community-gallery-heading">
        <UsersRound aria-hidden="true" size={20} />
        <span>Communities & Leadership</span>
      </div>
      <div
        ref={trackRef}
        className={`community-gallery-track ${isDragging ? "is-dragging" : ""}`}
        onBlur={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onScroll={handleScroll}
        tabIndex={0}
      >
        {communities.map((community, index) => (
          <article key={community.name} className="community-gallery-slide" style={communityGalleryStyle(community, index)}>
            <div className="community-gallery-overlay">
              <p className="text-base font-black leading-tight text-white drop-shadow-sm">{community.shortName ?? community.name}</p>
              <p className="mt-1 max-w-[17rem] text-[0.72rem] font-semibold leading-snug text-white/88 drop-shadow-sm">{community.role}</p>
              <p className="mt-2 text-[0.66rem] font-bold uppercase tracking-[0.08em] text-white/68 drop-shadow-sm">{communityMeta(community)}</p>
            </div>
          </article>
        ))}
      </div>
      {communities.length > 1 ? (
        <div className="community-gallery-dots" aria-label="Community gallery slides">
          {communities.map((community, index) => (
            <button
              key={`${community.name}-dot`}
              type="button"
              aria-label={`Show ${community.shortName ?? community.name}`}
              className={index === activeIndex ? "is-active" : undefined}
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
