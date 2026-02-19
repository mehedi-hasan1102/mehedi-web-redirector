'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TEXT = "let's work together ✦";
const REPEAT_COUNT = 8;

export default function InfiniteMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 56,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  const items = Array.from({ length: REPEAT_COUNT }, (_, index) => (
    <span
      className="font-['Staatliches',serif] text-[clamp(1.25rem,2.5vw,2.25rem)] tracking-[0.18em] uppercase text-[var(--text)] opacity-[0.92]"
      key={`marquee-item-${index}`}
    >
      {TEXT}
    </span>
  ));

  return (
    <div className="relative overflow-hidden py-5 max-[768px]:py-4" aria-label={TEXT}>
      <div className="flex w-max [will-change:transform]" ref={trackRef}>
        <div className="flex items-center gap-5 whitespace-nowrap pr-5 max-[768px]:gap-[0.85rem] max-[768px]:pr-[0.85rem]">
          {items}
        </div>
        <div
          className="flex items-center gap-5 whitespace-nowrap pr-5 max-[768px]:gap-[0.85rem] max-[768px]:pr-[0.85rem]"
          aria-hidden="true"
        >
          {items}
        </div>
      </div>
    </div>
  );
}
