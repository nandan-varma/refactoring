'use client';

import { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

interface AutoHighlightProps {
  code: string;
  className?: string;
}

export function AutoHighlight({ code, className = '' }: AutoHighlightProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      // Remove existing highlighting
      codeRef.current.removeAttribute('data-highlighted');
      // Auto-detect and highlight
      hljs.highlightElement(codeRef.current);
    }
  }, [code]);

  return (
    <pre className={`overflow-auto ${className}`}>
      <code ref={codeRef}>{code}</code>
    </pre>
  );
}
