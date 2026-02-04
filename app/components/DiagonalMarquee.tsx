'use client';

import styles from './diagonalMarquee.module.css';
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
  const contentRef = useRef<HTMLDivElement>(null);

  const items = [
    { label: 'Frontend Developer', icon: FaReact },
    { label: 'Creative Coder', icon: FaCode },
    { label: 'JS Enthusiast', icon: FaJs },
    { label: 'UI Designer', icon: FaPalette },
    { label: 'UI Engineer', icon: FaFigma },
    { label: 'Full Stack', icon: FaDatabase },
  ];

  useEffect(() => {
    // Marquee animation handled by CSS
  }, []);

  return (
    <section className={styles.section} ref={marqueeRef}>
      <div className={styles.marqueeContainer}>
        {/* Single Horizontal Marquee */}
        <div className={styles.marqueeTrack1}>
          <div className={styles.marqueeContent1} ref={contentRef}>
            {Array(4)
              .fill(null)
              .map((_, idx) =>
                items.map((item, i) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={`${idx}-${i}`} className={styles.itemRow}>
                      <IconComponent className={styles.icon} />
                      <span className={styles.label}>{item.label}</span>
                    </div>
                  );
                })
              )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiagonalMarquee;
