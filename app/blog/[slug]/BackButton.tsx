'use client';

import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex cursor-pointer items-center gap-2 rounded-[8px] border border-transparent bg-transparent px-0 py-0 font-['Inter',sans-serif] text-[0.95rem] font-medium text-[var(--accent)] transition-all duration-300 [transition-timing-function:ease] hover:translate-x-[-2px] [html.light-mode_&]:border-[rgba(37,99,235,0.3)] [html.light-mode_&]:text-[var(--accent)] [html.light-mode_&]:hover:border-[rgba(37,99,235,0.6)] [html.light-mode_&]:hover:bg-[rgba(37,99,235,0.1)]"
      aria-label="Go back to blog"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Back to Blog
    </button>
  );
}
