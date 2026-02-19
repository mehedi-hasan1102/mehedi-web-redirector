'use client';

import type { ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './mdx-components.module.css';

type CodeBlockProps = {
  children?: ReactNode;
  title?: string;
  language?: string;
  code?: string;
};

const getCodeText = (code?: string, children?: ReactNode) => {
  if (typeof code === 'string') {
    return code;
  }

  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children
      .map((child) => (typeof child === 'string' || typeof child === 'number' ? String(child) : ''))
      .join('');
  }

  return '';
};

export const CodeBlock = ({ children, title, language, code }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const codeText = useMemo(() => getCodeText(code, children), [code, children]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    if (!codeText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Ignore clipboard errors and keep the UI unchanged.
    }
  };

  const headerClassName = title
    ? styles.codeBlockHeader
    : `${styles.codeBlockHeader} ${styles.codeBlockHeaderNoTitle}`;

  return (
    <div className={styles.codeBlockWrapper}>
      <div className={headerClassName}>
        {title ? <span className={styles.codeBlockTitle}>{title}</span> : null}
        <button
          type="button"
          className={styles.copyButton}
          onClick={handleCopy}
          disabled={!codeText}
          data-copied={copied ? 'true' : 'false'}
          aria-label={copied ? 'Code copied' : 'Copy code'}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className={`mdx-code-block ${styles.codeBlock} language-${language || 'text'}`}>
        <code>{code || children}</code>
      </pre>
    </div>
  );
};
