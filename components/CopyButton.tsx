'use client';

import { useState } from 'react';
import { COPY_FEEDBACK_DURATION_MS, UI_TEXT } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  text: string;
  className?: string;
}

const BUTTON_CLASS = cn(
  'text-xs',
  'text-zinc-500 hover:text-zinc-700',
  'dark:text-zinc-400 dark:hover:text-zinc-300'
);

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION_MS);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <button 
      onClick={handleCopy} 
      className={className || BUTTON_CLASS}
    >
      {copied ? UI_TEXT.BUTTONS.COPIED : UI_TEXT.BUTTONS.COPY}
    </button>
  );
}
