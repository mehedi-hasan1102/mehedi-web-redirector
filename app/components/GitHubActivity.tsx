'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionClassName =
  'relative w-full overflow-hidden bg-[var(--bg)] py-32 min-h-[10vh] max-[768px]:py-16';

const containerClassName =
  'relative z-[2] mx-auto max-w-[1400px] px-16 max-[768px]:px-8 max-[480px]:px-4';

const headerClassName = 'mb-20 overflow-hidden text-center max-[768px]:mb-12';

const graphWrapperClassName =
  'group relative overflow-hidden rounded-[24px] bg-transparent p-8 transition-all duration-[400ms] [transform-style:preserve-3d] [perspective:1000px] [will-change:transform] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] max-[768px]:p-6 max-[480px]:p-4';

const graphGlowClassName =
  'pointer-events-none absolute left-0 top-0 h-[100px] w-[100px] rounded-full opacity-0 mix-blend-screen transition-opacity duration-300 [will-change:transform] [transform:translate(-50%,-50%)] [background:radial-gradient(circle,rgba(6,182,212,0.4),transparent_50%)] blur-[20px]';

const graphBorderClassName =
  'pointer-events-none absolute inset-0 rounded-[24px] border border-[rgba(6,182,212,0.1)] transition-colors duration-[400ms] [transition-timing-function:ease] group-hover:border-[rgba(6,182,212,0.4)]';

const graphClassName = 'block h-auto w-full rounded-lg';

// Skeleton Loading Component
const GitHubActivitySkeleton = () => {
  const isDarkMode =
    typeof document !== 'undefined'
      ? !document.documentElement.classList.contains('light-mode')
      : true;
  const shimmerBg = isDarkMode ? '#2a2a2a' : '#d1d5db';

  return (
    <section className="bg-[var(--bg)] px-8 py-16 max-[480px]:px-4">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 text-center">
          <div
            className="mx-auto mb-4 h-8 w-[250px] rounded-lg"
            style={{ background: shimmerBg, animation: 'shimmer 2s infinite' }}
          />
          <div
            className="mx-auto h-5 w-full max-w-[400px] rounded"
            style={{ background: shimmerBg, animation: 'shimmer 2s infinite' }}
          />
        </div>

        <div
          className="h-[200px] w-full rounded-xl border border-[rgba(6,182,212,0.1)]"
          style={{ background: shimmerBg, animation: 'shimmer 2s infinite' }}
        />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default function GitHubActivity() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const glowXToRef = useRef<((value: number) => void) | null>(null);
  const glowYToRef = useRef<((value: number) => void) | null>(null);
  const [loading, setLoading] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotionPreference = () => {
      setPrefersReducedMotion(media.matches);
    };

    syncMotionPreference();

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', syncMotionPreference);
    } else {
      media.addListener(syncMotionPreference);
    }

    return () => {
      if (typeof media.removeEventListener === 'function') {
        media.removeEventListener('change', syncMotionPreference);
      } else {
        media.removeListener(syncMotionPreference);
      }
    };
  }, []);

  useEffect(() => {
    if (loading || !sectionRef.current) return;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(graphRef.current, {
        scrollTrigger: {
          trigger: graphRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        rotateX: -10,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, prefersReducedMotion]);

  useEffect(() => {
    if (loading || !glowRef.current || prefersReducedMotion) {
      glowXToRef.current = null;
      glowYToRef.current = null;
      return;
    }

    glowXToRef.current = gsap.quickTo(glowRef.current, 'x', {
      duration: 0.3,
      ease: 'power2.out',
    });
    glowYToRef.current = gsap.quickTo(glowRef.current, 'y', {
      duration: 0.3,
      ease: 'power2.out',
    });

    return () => {
      glowXToRef.current = null;
      glowYToRef.current = null;
    };
  }, [loading, prefersReducedMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!graphRef.current || prefersReducedMotion) return;
    const rect = graphRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glowXToRef.current?.(x);
    glowYToRef.current?.(y);
  };

  if (loading) {
    return <GitHubActivitySkeleton />;
  }

  return (
    <section ref={sectionRef} className={sectionClassName}>
      <div className={containerClassName}>
        <div ref={headerRef} className={headerClassName}>
          <h2 className="sectionTitleGlobal">
            GitHub <span className="text-[var(--accent)]">Activity</span>
          </h2>
        </div>

        <div ref={graphRef} className="mb-10" onMouseMove={handleMouseMove}>
          <div className={graphWrapperClassName}>
            <div
              ref={glowRef}
              className={
                prefersReducedMotion
                  ? graphGlowClassName
                  : `${graphGlowClassName} group-hover:opacity-100`
              }
            />
            <div className="relative z-[2]">
              <Image
                src="https://ghchart.rshah.org/22d3ee/mehedi-hasan1102"
                alt="GitHub contribution graph"
                className={graphClassName}
                width={1400}
                height={220}
                sizes="(max-width: 1400px) 100vw, 1400px"
                loading="lazy"
                unoptimized
              />
            </div>
            <div className={graphBorderClassName} />
          </div>
        </div>
      </div>
    </section>
  );
}
