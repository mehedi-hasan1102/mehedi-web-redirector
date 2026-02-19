'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiExternalLink } from 'react-icons/fi';
import styles from './blog.module.css';

gsap.registerPlugin(ScrollTrigger);

const formatDate = (dateString: string) =>
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(dateString));

type BlogCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
  index: number;
};

export const BlogCard = ({
  slug,
  title,
  excerpt,
  date,
  tags,
  index,
}: BlogCardProps) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    gsap.set(card, { opacity: 0, y: 40, rotateX: -10, scale: 0.9 });

    ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        });
      },
    });
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      x: x,
      y: y,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <Link
      ref={cardRef}
      href={`/blog/${slug}`}
      className={styles.card}
      onMouseMove={handleMouseMove}
    >
      <div ref={glowRef} className={styles.cardGlow} />

      <span className={styles.cardLinkIcon} aria-hidden="true">
        <FiExternalLink size={18} />
      </span>

      <div className={styles.cardHeader}>
        <span className={styles.cardNumber}>{String(index + 1).padStart(2, '0')}</span>
        <div className={styles.metaRow}>
          <span className={styles.date}>{formatDate(date)}</span>
          {tags?.length ? (
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.excerpt}>{excerpt}</p>
      </div>
    </Link>
  );
};
