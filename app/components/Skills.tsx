'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './skills.module.css';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number; // 1-10
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools';
  icon?: string;
  color?: string;
  featured?: boolean;
}

const skills: Skill[] = [
  // Frontend (React ecosystem)
  { name: 'React', level: 9, category: 'Frontend', icon: '⚛️', color: '#61dafb', featured: true },
  { name: 'Next.js', level: 9, category: 'Frontend', icon: '▲', color: '#ffffff', featured: true },
  { name: 'TypeScript', level: 8, category: 'Frontend', icon: 'TS', color: '#3178c6' },
  { name: 'Tailwind CSS', level: 9, category: 'Frontend', icon: '🎨', color: '#06b6d4' },
  { name: 'GSAP', level: 10, category: 'Frontend', icon: '✨', color: '#88ce02', featured: true },
  { name: 'Three.js', level: 7, category: 'Frontend', icon: '🎭', color: '#ffffff' },
  
  // Backend (Node.js ecosystem)
  { name: 'Node.js', level: 9, category: 'Backend', icon: '🟢', color: '#68a063', featured: true },
  { name: 'Express.js', level: 8, category: 'Backend', icon: '⚡', color: '#ffffff' },
  { name: 'RESTful APIs', level: 9, category: 'Backend', icon: '🔗', color: '#ff6b6b' },
  { name: 'JWT Auth', level: 8, category: 'Backend', icon: '🔐', color: '#ffd93d' },
  
  // Database
  { name: 'MongoDB', level: 9, category: 'Database', icon: '🍃', color: '#13aa52', featured: true },
  { name: 'Mongoose', level: 8, category: 'Database', icon: '🦁', color: '#880000' },
  { name: 'Firebase', level: 7, category: 'Database', icon: '🔥', color: '#ffa726' },
  { name: 'SQL Basics', level: 7, category: 'Database', icon: '🗄️', color: '#336791' },
  
  // Tools & Others
  { name: 'Git & GitHub', level: 9, category: 'Tools', icon: '💻', color: '#f1502f', featured: true },
  { name: 'WebGL', level: 7, category: 'Tools', icon: '📐', color: '#990000' },
  { name: 'Performance', level: 8, category: 'Tools', icon: '⚙️', color: '#f59e0b' },
  { name: 'Figma', level: 8, category: 'Tools', icon: '🎯', color: '#f24e1e' },
];

const categories = ['Frontend', 'Backend', 'Database', 'Tools'] as const;

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate skill items on scroll
      const items = gsap.utils.toArray('[data-skill]') as Element[];

      items.forEach((item, index) => {
        const isFeatured = (item as HTMLElement).hasAttribute('data-featured');
        
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            end: 'top 65%',
            scrub: 0.5,
          },
          opacity: 0,
          scale: 0.6,
          y: 50,
          rotationX: 20,
          duration: 0.8,
        });
      });

      // Floating animation for decorative elements
      const floaters = gsap.utils.toArray('[data-float]') as Element[];
      floaters.forEach((floater, index) => {
        gsap.to(floater, {
          y: -30,
          duration: 4 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      // Stagger animation for category reveals
      gsap.to('[data-category-item]', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-32"
      style={{ background: 'var(--bg)' }}
    >
      {/* Animated gradient background elements */}
      <div 
        className="absolute -top-1/3 -right-1/3 w-full h-full rounded-full opacity-20 pointer-events-none"
        data-float
        style={{
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />
      <div 
        className="absolute -bottom-1/3 -left-1/3 w-full h-full rounded-full opacity-20 pointer-events-none"
        data-float
        style={{
          background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full" style={{
            background: 'rgba(34, 211, 238, 0.1)',
            border: '1px solid rgba(34, 211, 238, 0.2)',
          }}>
            <span className="text-lg">🛠️</span>
            <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
              FULL-STACK MERN DEVELOPER
            </span>
          </div>

          <h2 
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            style={{
              color: 'var(--text)',
              backgroundImage: 'linear-gradient(135deg, var(--text) 0%, var(--accent) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Technical Arsenal
          </h2>

          <p 
            className="text-base md:text-lg leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Master of modern web technologies. Building scalable applications with beautiful interactions.
          </p>

          <div className="w-16 h-1.5 rounded-full mx-auto mt-6" style={{
            background: 'linear-gradient(90deg, var(--accent), #7c3aed)',
          }} />
        </div>

        {/* All Skills in Masonry Grid */}
        <div ref={containerRef} className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-max">
            {skills.map((skill, index) => {
              const isVisible = activeCategory === null || activeCategory === skill.category;
              
              return (
                <div
                  key={skill.name}
                  data-skill
                  data-category-item
                  data-featured={skill.featured}
                  className={`group relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer hover:scale-105 ${
                    skill.featured ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''
                  }`}
                  style={{
                    opacity: isVisible ? 1 : 0.5,
                    pointerEvents: isVisible ? 'auto' : 'none',
                    background: `linear-gradient(135deg, rgba(34, 211, 238, ${skill.featured ? '0.15' : '0.08'}), rgba(${
                      skill.color === '#61dafb' ? '97, 218, 251' :
                      skill.color === '#88ce02' ? '136, 206, 2' :
                      skill.color === '#68a063' ? '104, 160, 99' :
                      skill.color === '#13aa52' ? '19, 170, 82' :
                      skill.color === '#f1502f' ? '241, 80, 47' :
                      '34, 211, 238'
                    }, ${skill.featured ? '0.08' : '0.03'}))`,
                    border: `1px solid rgba(34, 211, 238, ${skill.featured ? '0.3' : '0.1'})`,
                    padding: skill.featured ? '2rem' : '1.5rem',
                    minHeight: skill.featured ? '280px' : '200px',
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      background: `linear-gradient(135deg, rgba(34, 211, 238, ${skill.featured ? '0.25' : '0.15'}), rgba(${
                        skill.color === '#61dafb' ? '97, 218, 251' :
                        skill.color === '#88ce02' ? '136, 206, 2' :
                        skill.color === '#68a063' ? '104, 160, 99' :
                        skill.color === '#13aa52' ? '19, 170, 82' :
                        skill.color === '#f1502f' ? '241, 80, 47' :
                        '34, 211, 238'
                      }, ${skill.featured ? '0.12' : '0.08'}))`,
                      borderColor: `rgba(34, 211, 238, ${skill.featured ? '0.5' : '0.3'})`,
                      boxShadow: `0 20px 40px rgba(34, 211, 238, ${skill.featured ? '0.2' : '0.1'})`,
                      duration: 0.3,
                    });
                    gsap.to(e.currentTarget.querySelector('[data-glow]'), {
                      opacity: 1,
                      duration: 0.3,
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      background: `linear-gradient(135deg, rgba(34, 211, 238, ${skill.featured ? '0.15' : '0.08'}), rgba(${
                        skill.color === '#61dafb' ? '97, 218, 251' :
                        skill.color === '#88ce02' ? '136, 206, 2' :
                        skill.color === '#68a063' ? '104, 160, 99' :
                        skill.color === '#13aa52' ? '19, 170, 82' :
                        skill.color === '#f1502f' ? '241, 80, 47' :
                        '34, 211, 238'
                      }, ${skill.featured ? '0.08' : '0.03'}))`,
                      borderColor: `rgba(34, 211, 238, ${skill.featured ? '0.3' : '0.1'})`,
                      boxShadow: '0 0 0 rgba(34, 211, 238, 0)',
                      duration: 0.3,
                    });
                    gsap.to(e.currentTarget.querySelector('[data-glow]'), {
                      opacity: 0,
                      duration: 0.3,
                    });
                  }}
                >
                  {/* Glow effect on hover */}
                  <div
                    data-glow
                    className="absolute inset-0 opacity-0 transition-opacity"
                    style={{
                      background: `radial-gradient(circle at center, ${skill.color || 'var(--accent)'} 0%, transparent 70%)`,
                      filter: 'blur(40px)',
                    }}
                  />

                  {/* Featured badge */}
                  {skill.featured && (
                    <div 
                      className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: 'rgba(34, 211, 238, 0.2)',
                        color: 'var(--accent)',
                        border: '1px solid rgba(34, 211, 238, 0.3)',
                      }}
                    >
                      🌟 Expert
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <span className={skill.featured ? 'text-6xl' : 'text-4xl'}>
                        {skill.icon}
                      </span>
                      <h4
                        className={`font-bold mt-3 ${skill.featured ? 'text-2xl' : 'text-lg'}`}
                        style={{ color: 'var(--text)' }}
                      >
                        {skill.name}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span 
                        className="text-xs md:text-sm font-semibold uppercase tracking-wider"
                        style={{ color: 'var(--accent)' }}
                      >
                        {skill.category}
                      </span>
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${skill.color || 'var(--accent)'}, rgba(34, 211, 238, 0.5))`,
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          color: skill.color === '#ffffff' ? 'black' : 'white',
                        }}
                      >
                        →
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 md:mt-24 text-center">
          <p 
            className="text-sm md:text-base mb-6"
            style={{ color: 'var(--text-secondary)' }}
          >
            Ready to collaborate on your next project?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, var(--accent), #7c3aed)',
              color: 'white',
              border: 'none',
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.08,
                boxShadow: '0 15px 35px rgba(34, 211, 238, 0.4)',
                duration: 0.3,
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                boxShadow: '0 0 0 rgba(34, 211, 238, 0)',
                duration: 0.3,
              });
            }}
          >
            Let's Build Something 🚀
          </a>
        </div>
      </div>
    </section>
  );
}
