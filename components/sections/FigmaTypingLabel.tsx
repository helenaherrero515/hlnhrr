"use client";

import { useEffect, useState } from "react";
import type { ReactElement } from "react";

const phrases = [
  "INITIALIZING...",
  "HELLO, HUMAN!",
  "WELCOME TO MY PORTFOLIO!",
  "THANKS FOR STOPPING BY!",
  "BUILDING SOMETHING COOL...",
];

const typeSpeedMs = 72;
const deleteSpeedMs = 38;
const pauseMs = 980;

export function FigmaTypingLabel(): ReactElement {
  const [phraseIndex, setPhraseIndex] = useState(0);
  // Render a real label on the server and on first paint. Starting at zero
  // leaves the banner blank until the client-side typing timer first runs.
  const [visibleLength, setVisibleLength] = useState(phrases[0].length);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let delay = isDeleting ? deleteSpeedMs : typeSpeedMs;

    if (!isDeleting && visibleLength === currentPhrase.length) {
      delay = pauseMs;
    }

    const timeoutId = window.setTimeout(() => {
      if (!isDeleting && visibleLength < currentPhrase.length) {
        setVisibleLength((length) => length + 1);
        return;
      }

      if (!isDeleting && visibleLength === currentPhrase.length) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && visibleLength > 1) {
        setVisibleLength((length) => length - 1);
        return;
      }

      const nextPhraseIndex = (phraseIndex + 1) % phrases.length;
      setPhraseIndex(nextPhraseIndex);
      // Keep the last letter visible, then change it into the next phrase's
      // first letter. The banner never falls back to an empty state.
      setVisibleLength(1);
      setIsDeleting(false);
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [isDeleting, phraseIndex, visibleLength]);

  const currentPhrase = phrases[phraseIndex].slice(0, visibleLength);

  return (
    <h2 className="figma-section-label figma-typing-label figma-scroll-rise" aria-label={`About me: ${phrases[phraseIndex]}`}>
      <span className="figma-typing-prefix" aria-hidden="true">
        &gt;&gt;
      </span>
      <span className="figma-typing-phrase" aria-hidden="true">
        {currentPhrase}
      </span>
    </h2>
  );
}
