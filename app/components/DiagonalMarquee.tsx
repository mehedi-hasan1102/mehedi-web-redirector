'use client';

import {
  FaReact,
  FaJs,
  FaFigma,
  FaDatabase,
  FaCode,
  FaPalette,
} from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DiagonalMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentRef2 = useRef<HTMLDivElement>(null);

  const items = [
    { label: 'Frontend Developer', icon: FaReact },
    { label: 'Creative Coder', icon: FaCode },
    { label: 'JS Enthusiast', icon: FaJs },
    { label: 'UI Designer', icon: FaPalette },
    { label: 'UI Engineer', icon: FaFigma },
    { label: 'Full Stack', icon: FaDatabase },
  ];

  const items2 = [
    { label: 'React.js', icon: FaReact },
    { label: 'Clean Code', icon: FaCode },
    { label: 'JavaScript', icon: FaJs },
    { label: 'Web Design', icon: FaPalette },
    { label: 'Figma', icon: FaFigma },
    { label: 'Node.js', icon: FaDatabase },
  ];

  useEffect(() => {
    if (!contentRef.current || !contentRef2.current) return;

    // First marquee animation - responds to page scroll
    const marqueeTween1 = gsap.fromTo(
      contentRef.current,
      { x: 0 },
      {
        x: () => {
          const distance = -(contentRef.current?.offsetWidth || 0) / 2;
          return distance;
        },
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 5,
          markers: false,
        },
      }
    );

    // Second marquee animation - responds to page scroll in opposite direction
    const marqueeTween2 = gsap.fromTo(
      contentRef2.current,
      { x: 0 },
      {
        x: () => {
          const distance = -(contentRef2.current?.offsetWidth || 0) / 2;
          return distance;
        },
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 5,
          markers: false,
        },
      }
    );

    return () => {
      marqueeTween1.scrollTrigger?.kill();
      marqueeTween2.scrollTrigger?.kill();
      marqueeTween1.kill();
      marqueeTween2.kill();
    };
  }, []);

  return (
    <section className="diagonalMarqueeSection" ref={marqueeRef}>
      <div className="marqueeContainer">
        {/* Single Horizontal Marquee */}
        <div className="marqueeTrack1">
          <div className="marqueeContent1" ref={contentRef}>
            {Array(4)
              .fill(null)
              .map((_, idx) =>
                items.map((item, i) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={`${idx}-${i}`} className="itemRow">
                      <IconComponent className="icon" />
                      <span className="label">{item.label}</span>
                    </div>
                  );
                })
              )}
          </div>
        </div>
      </div>

      {/* Second Marquee for X Pattern */}
      <div className="marqueeContainer2" ref={marqueeRef2}>
        <div className="marqueeTrack2">
          <div className="marqueeContent2" ref={contentRef2}>
            {Array(4)
              .fill(null)
              .map((_, idx) =>
                items2.map((item, i) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={`${idx}-${i}`} className="itemRow">
                      <IconComponent className="icon" />
                      <span className="label">{item.label}</span>
                    </div>
                  );
                })
              )}
          </div>
        </div>
      </div>
      <style jsx global>{`
        .diagonalMarqueeSection {
          position: relative;
          padding: 8.5rem 0;
          background: var(--bg);
          height: auto;
          display: grid;
          place-items: center;
        }

        .diagonalMarqueeSection .marqueeContainer {
          position: relative;
          width: 100%;
          background: rgba(34, 211, 238, 0.95);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: clamp(0.3rem, 0.7vw, 0.6rem) 0;
          border-top: 1px solid rgba(34, 211, 238, 0.15);
          border-bottom: 1px solid rgba(34, 211, 238, 0.15);
          grid-area: 1 / 1;
          transform-origin: center;
          transform: skewY(-8deg);
        }

        .diagonalMarqueeSection .marqueeContainer2 {
          position: relative;
          width: 100%;
          background: rgba(34, 211, 238, 0.95);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: clamp(0.3rem, 0.7vw, 0.6rem) 0;
          border-top: 1px solid rgba(34, 211, 238, 0.15);
          border-bottom: 1px solid rgba(34, 211, 238, 0.15);
          grid-area: 1 / 1;
          transform-origin: center;
          transform: skewY(8deg);
        }

        .diagonalMarqueeSection .marqueeTrack1 {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .diagonalMarqueeSection .marqueeContent1 {
          position: relative;
          display: flex;
          gap: 0;
          white-space: nowrap;
          width: max-content;
        }

        .diagonalMarqueeSection .marqueeTrack2 {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .diagonalMarqueeSection .marqueeContent2 {
          position: relative;
          display: flex;
          gap: 0;
          white-space: nowrap;
          width: max-content;
        }

        .diagonalMarqueeSection .itemRow {
          display: inline-flex;
          align-items: center;
          gap: 1.2rem;
          white-space: nowrap;
          font-family: 'Staatliches', serif;
          font-size: clamp(1.2rem, 2.2vw, 1.5rem);
          font-weight: 700;
          letter-spacing: 0.05em;
          color: black;
          flex-shrink: 0;
          padding: 0 1.5rem;
          transition: all 0.3s ease;
        }

        .diagonalMarqueeSection .itemRow:hover {
          transform: translateY(-2px);
        }

        .diagonalMarqueeSection .marqueeContent1 .itemRow {
          background: transparent;
          color: black;
        }

        .diagonalMarqueeSection .marqueeContent2 .itemRow {
          background: transparent;
          color: black;
        }

        .diagonalMarqueeSection .icon {
          font-size: clamp(1.2rem, 2.2vw, 1.8rem);
          color: black;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .diagonalMarqueeSection .itemRow:hover .icon {
          transform: scale(1.15);
          color: black;
        }

        .diagonalMarqueeSection .badge {
          display: none;
        }

        .diagonalMarqueeSection .label {
          display: inline;
          font-family: 'Staatliches', serif;
          font-size: inherit;
          font-weight: 700;
          letter-spacing: 0.05em;
          white-space: nowrap;
          color: inherit;
        }

        @keyframes scrollText {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollTextReverse {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(50%);
          }
        }

        .light-mode .diagonalMarqueeSection .marqueeContainer,
        .light-mode .diagonalMarqueeSection .marqueeContainer2 {
          background: #3b82f6;
          border-top: 1px solid #1e40af;
          border-bottom: 1px solid #1e40af;
        }

        .light-mode .diagonalMarqueeSection .marqueeContent1 .itemRow,
        .light-mode .diagonalMarqueeSection .marqueeContent2 .itemRow {
          color: white;
        }

        .light-mode .diagonalMarqueeSection .itemRow:hover .icon {
          color: white;
        }

        .light-mode .diagonalMarqueeSection .icon {
          color: white;
        }

        @media (max-width: 1440px) {
          .diagonalMarqueeSection {
            padding: 7rem 0;
          }

          .diagonalMarqueeSection .marqueeContainer,
          .diagonalMarqueeSection .marqueeContainer2 {
            padding: clamp(0.3rem, 0.7vw, 0.6rem) 0;
          }

          .diagonalMarqueeSection .itemRow {
            gap: 1.1rem;
            font-size: clamp(1.1rem, 2vw, 1.4rem);
          }

          .diagonalMarqueeSection .icon {
            font-size: clamp(1.1rem, 2vw, 1.7rem);
          }
        }

        @media (max-width: 1024px) {
          .diagonalMarqueeSection {
            padding: 6rem 0;
          }

          .diagonalMarqueeSection .marqueeContainer,
          .diagonalMarqueeSection .marqueeContainer2 {
            padding: clamp(0.3rem, 0.7vw, 0.6rem) 0;
          }

          .diagonalMarqueeSection .itemRow {
            gap: 1rem;
            padding: 0 0.8rem;
            font-size: clamp(1rem, 1.8vw, 1.3rem);
          }

          .diagonalMarqueeSection .icon {
            font-size: clamp(1rem, 1.8vw, 1.6rem);
          }
        }

        @media (max-width: 900px) {
          .diagonalMarqueeSection {
            padding: 5rem 0;
          }

          .diagonalMarqueeSection .marqueeContainer,
          .diagonalMarqueeSection .marqueeContainer2 {
            padding: clamp(0.3rem, 0.7vw, 0.6rem) 0;
          }

          .diagonalMarqueeSection .itemRow {
            gap: 0.95rem;
            padding: 0 0.8rem;
            font-size: clamp(0.95rem, 1.6vw, 1.2rem);
          }

          .diagonalMarqueeSection .icon {
            font-size: clamp(0.95rem, 1.6vw, 1.5rem);
          }
        }

        @media (max-width: 768px) {
          .diagonalMarqueeSection {
            padding: 4rem 0;
          }

          .diagonalMarqueeSection .marqueeContainer,
          .diagonalMarqueeSection .marqueeContainer2 {
            padding: clamp(0.3rem, 0.7vw, 0.6rem) 0;
          }

          .diagonalMarqueeSection .itemRow {
            gap: 0.9rem;
            padding: 0 0.8rem;
            font-size: clamp(0.9rem, 1.5vw, 1.1rem);
          }

          .diagonalMarqueeSection .icon {
            font-size: clamp(0.9rem, 1.5vw, 1.4rem);
          }

          .diagonalMarqueeSection .marqueeContent1 {
            letter-spacing: 0.02em;
          }
        }

        @media (max-width: 640px) {
          .diagonalMarqueeSection {
            padding: 3.5rem 0;
          }

          .diagonalMarqueeSection .marqueeContainer,
          .diagonalMarqueeSection .marqueeContainer2 {
            padding: clamp(0.3rem, 0.7vw, 0.6rem) 0;
          }

          .diagonalMarqueeSection .itemRow {
            gap: 0.85rem;
            padding: 0 0.8rem;
            font-size: clamp(0.85rem, 1.3vw, 1rem);
          }

          .diagonalMarqueeSection .icon {
            font-size: clamp(0.85rem, 1.3vw, 1.3rem);
          }
        }

        @media (max-width: 480px) {
          .diagonalMarqueeSection {
            padding: 3rem 0;
          }

          .diagonalMarqueeSection .marqueeContainer,
          .diagonalMarqueeSection .marqueeContainer2 {
            padding: clamp(0.3rem, 0.7vw, 0.6rem) 0;
          }

          .diagonalMarqueeSection .itemRow {
            gap: 0.75rem;
            padding: 0 0.6rem;
            font-size: clamp(0.8rem, 1.2vw, 0.95rem);
          }

          .diagonalMarqueeSection .icon {
            font-size: clamp(0.8rem, 1.2vw, 1.2rem);
          }

          .diagonalMarqueeSection .marqueeContent1 {
            letter-spacing: 0.02em;
          }
        }

        @media (max-width: 360px) {
          .diagonalMarqueeSection {
            padding: 2.5rem 0;
          }

          .diagonalMarqueeSection .marqueeContainer,
          .diagonalMarqueeSection .marqueeContainer2 {
            padding: clamp(0.3rem, 0.7vw, 0.6rem) 0;
          }

          .diagonalMarqueeSection .itemRow {
            gap: 0.7rem;
            padding: 0 0.6rem;
            font-size: clamp(0.75rem, 1vw, 0.9rem);
          }

          .diagonalMarqueeSection .icon {
            font-size: clamp(0.75rem, 1vw, 1.1rem);
          }
        }
      `}</style>
    </section>
  );
};

export default DiagonalMarquee;
