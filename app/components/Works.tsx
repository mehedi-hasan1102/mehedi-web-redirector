'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './works.module.css';

gsap.registerPlugin(ScrollTrigger);

interface Work {
  id: number;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  image: string;
  color: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
}

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const [works, setWorks] = useState<Work[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Load projects from JSON
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/data/projects.json');
        const data = await response.json();
        setWorks(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // GSAP animations
  useEffect(() => {
    if (works.length === 0) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.work-card') as Element[];

      cards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 0.5,
          },
          opacity: 0,
          y: 60,
          x: index % 2 === 0 ? -40 : 40,
          rotationY: index % 2 === 0 ? 10 : -10,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [works]);

  const handleHover = (id: number, isHovering: boolean) => {
    setHoveredId(isHovering ? id : null);
    const card = document.querySelector(`[data-work-id="${id}"]`);
    if (card) {
      gsap.to(card, {
        y: isHovering ? -16 : 0,
        rotationZ: isHovering ? 2 : 0,
        scale: isHovering ? 1.02 : 1,
        boxShadow: isHovering
          ? '0 30px 60px rgba(34, 211, 238, 0.25)'
          : '0 10px 30px rgba(0, 0, 0, 0.2)',
        duration: 0.4,
        ease: 'power3.out',
      });

      // Animate image overlay
      const image = card.querySelector('[data-work-image]');
      if (image) {
        gsap.to(image, {
          scale: isHovering ? 1.1 : 1,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    }
  };

  const handleProjectClick = (slug: string) => {
    router.push(`/projects/${slug}`);
  };

  if (loading) {
    return (
      <section
        id="works"
        className="section-padding relative overflow-hidden"
        style={{ background: 'var(--surface)' }}
      >
        <div className="container text-center" style={{ color: 'var(--text)' }}>
          <p>Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="works"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--surface)' }}
    >
      <div className="container">
        {/* Animated heading */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ 
            color: 'var(--text)',
            background: 'linear-gradient(135deg, var(--text) 0%, var(--accent) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Selected Works
          </h2>
          <p
            className="text-lg mt-4 max-w-2xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            Projects that showcase creative thinking, technical expertise, and
            attention to motion design details.
          </p>
        </div>

        {/* Works Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {works.map((work, idx) => (
            <div
              key={work.id}
              data-work-id={work.id}
              className="work-card group relative rounded-2xl overflow-hidden cursor-pointer perspective"
              onMouseEnter={() => handleHover(work.id, true)}
              onMouseLeave={() => handleHover(work.id, false)}
              onClick={() => handleProjectClick(work.slug)}
              style={{
                background: 'var(--bg)',
                border: `1px solid rgba(34, 211, 238, 0.3)`,
                transition: 'all 0.3s ease',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Animated border glow */}
              {hoveredId === work.id && (
                <div
                  className="absolute inset-0 rounded-2xl opacity-0"
                  style={{
                    background: `linear-gradient(135deg, transparent, rgba(34, 211, 238, 0.2), transparent)`,
                    animation: 'shimmer 1.5s infinite',
                  }}
                />
              )}

              {/* Image Placeholder with zoom effect */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900">
                <div
                  data-work-image
                  className={`h-full w-full opacity-80 group-hover:opacity-100`}
                  style={{
                    background: `linear-gradient(135deg, ${work.color}, #06b6d4)`,
                  }}
                />
                {/* Index badge */}
                <div
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
                  style={{
                    background: work.color,
                    color: 'var(--bg)',
                  }}
                >
                  {(idx + 1).toString().padStart(2, '0')}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative z-10">
                <div
                  className="text-sm font-semibold mb-2 uppercase tracking-widest"
                  style={{ color: work.color }}
                >
                  {work.category}
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: 'var(--text)' }}
                >
                  {work.title}
                </h3>
                <p
                  className="text-sm mb-4 line-clamp-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {work.shortDescription}
                </p>

                {/* Tags with animation */}
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs rounded-full border transition-all duration-300"
                      style={{
                        borderColor: work.color,
                        color:
                          hoveredId === work.id
                            ? 'var(--bg)'
                            : work.color,
                        background:
                          hoveredId === work.id ? work.color : 'transparent',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
