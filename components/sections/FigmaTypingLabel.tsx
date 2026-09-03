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
  const [visibleLength, setVisibleLength] = useState(0);
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

      if (isDeleting && visibleLength > 0) {
        setVisibleLength((length) => length - 1);
        return;
      }

      setIsDeleting(false);
      setPhraseIndex((index) => (index + 1) % phrases.length);
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
