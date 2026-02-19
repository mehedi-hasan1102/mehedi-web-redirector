import styles from './mdx-components.module.css';
import React from 'react';
import { CodeBlock } from './CodeBlock';
export { CodeBlock } from './CodeBlock';

type CalloutType = 'info' | 'warning' | 'success' | 'error';

export const Callout = ({
  type = 'info',
  children,
}: {
  type?: CalloutType;
  children: React.ReactNode;
}) => (
  <div className={`${styles.callout} ${styles[`callout-${type}`]}`}>
    <div className={styles.calloutIcon}>
      {type === 'info' && '💡'}
      {type === 'warning' && '⚠️'}
      {type === 'success' && '✅'}
      {type === 'error' && '❌'}
    </div>
    <div className={styles.calloutContent}>{children}</div>
  </div>
);

export const Img = ({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) => (
  <figure className={styles.imageFigure}>
    <img src={src} alt={alt} className={styles.image} />
    {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
  </figure>
);

export const Prose = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.prose}>{children}</div>
);

const getTextFromNode = (node: React.ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextFromNode).join('');
  }

  return '';
};

export const Pre = (props: React.HTMLAttributes<HTMLPreElement>) => {
  const childArray = React.Children.toArray(props.children);
  const codeElement = childArray[0];

  if (React.isValidElement<React.HTMLAttributes<HTMLElement>>(codeElement)) {
    const className = typeof codeElement.props.className === 'string' ? codeElement.props.className : '';
    const languageMatch = className.match(/language-(?<lang>[^\s]+)/);
    const language = languageMatch?.groups?.lang;
    const code = getTextFromNode(codeElement.props?.children);

    return <CodeBlock language={language} code={code} />;
  }

  return <CodeBlock code={getTextFromNode(props.children)} />;
};
