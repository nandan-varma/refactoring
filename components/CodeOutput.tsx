import { useState } from 'react';
import { COPY_FEEDBACK_DURATION_MS, UI_TEXT, ChatStatus } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface CodeOutputProps {
  code: string;
  isLoading: boolean;
  status: string;
  errorMessage?: string;
}

const LABEL_CLASS = cn(
  'text-sm font-medium',
  'text-zinc-900 dark:text-zinc-50'
);

const LINK_CLASS = cn(
  'text-xs',
  'text-zinc-500 hover:text-zinc-700',
  'dark:text-zinc-400 dark:hover:text-zinc-300'
);

const OUTPUT_CONTAINER_CLASS = cn(
  'h-125 overflow-auto rounded-lg border p-4 font-mono text-sm',
  'border-zinc-300 bg-white text-zinc-900',
  'dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50'
);

export function CodeOutput({ code, isLoading, status, errorMessage }: CodeOutputProps) {
  const [copied, setCopied] = useState(false);
  const hasError = status === ChatStatus.ERROR;

  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION_MS);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor="code-output" className={LABEL_CLASS}>
          {UI_TEXT.LABELS.REFACTORED_CODE}
          {isLoading && <span className="ml-2 text-xs text-blue-500">{UI_TEXT.STATUS.PROCESSING}</span>}
          {hasError && <span className="ml-2 text-xs text-red-500">{UI_TEXT.STATUS.ERROR}</span>}
        </label>
        {code && !isLoading && (
          <button onClick={handleCopy} className={LINK_CLASS}>
            {copied ? UI_TEXT.BUTTONS.COPIED : UI_TEXT.BUTTONS.COPY}
          </button>
        )}
      </div>
      <div className={OUTPUT_CONTAINER_CLASS}>
        {code ? (
          <pre className="whitespace-pre-wrap">{code}</pre>
        ) : (
          <p className="text-zinc-400 dark:text-zinc-600">
            {isLoading ? UI_TEXT.PLACEHOLDERS.PROCESSING : UI_TEXT.PLACEHOLDERS.REFACTORED_OUTPUT}
          </p>
        )}
      </div>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {UI_TEXT.STATUS.ERROR_PREFIX} {errorMessage}
        </p>
      )}
    </div>
  );
}
