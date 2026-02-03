'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import gsap from 'gsap';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const themeInitRef = useRef(false);

  // Suppress error for safe one-time initialization with ref check
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useLayoutEffect(() => {
    if (themeInitRef.current) return;
    themeInitRef.current = true;

    // Check if theme is stored in localStorage
    const stored = localStorage.getItem('theme');
    if (stored === 'light') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(false);
      document.documentElement.classList.add('light-mode');
    } else if (stored === 'dark') {
      setIsDark(true);
      document.documentElement.classList.remove('light-mode');
    } else {
      // Default to dark mode for first-time visitors
      setIsDark(true);
      document.documentElement.classList.remove('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    // Animate the toggle
    const button = document.querySelector('[data-theme-toggle]');
    if (button) {
      gsap.to(button, {
        rotation: 360,
        duration: 0.6,
        ease: 'expo.out',
      });
    }

    // Toggle class on html element
    if (newIsDark) {
      document.documentElement.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      data-theme-toggle
      onClick={toggleTheme}
         className="fixed top-6 right-6 z-50 p-3 rounded-full bg-(--surface) border border-(--accent) text-(--accent) hover:bg-(--accent) hover:text-(--bg) transition-colors duration-300"
      aria-label="Toggle theme"
    >
      {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
}
