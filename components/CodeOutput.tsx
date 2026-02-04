import { useState, useEffect, useRef } from 'react';
import {
  getLabelClass,
  getLinkClass,
  getOutputContainerClass,
} from '@/lib/styles/shared';
import { UI_TEXT } from '@/lib/config/ui-text';
import { COPY_FEEDBACK_DURATION_MS } from '@/lib/config/constants';
import { ChatStatus } from '@/lib/types/status';

interface CodeOutputProps {
  code: string;
  isLoading: boolean;
  status: string;
  errorMessage?: string;
}

export function CodeOutput({
  code,
  isLoading,
  status,
  errorMessage,
}: CodeOutputProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasError = status === ChatStatus.ERROR;

  const labelClass = getLabelClass();
  const linkClass = getLinkClass();
  const outputContainerClass = getOutputContainerClass();

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setCopyError(null);

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, COPY_FEEDBACK_DURATION_MS);
    } catch {
      setCopyError(UI_TEXT.MESSAGES.COPY_ERROR);
      console.error('Failed to copy to clipboard');
    }
  };

  const displayError = errorMessage || copyError;

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor="code-output" className={labelClass}>
          {UI_TEXT.LABELS.REFACTORED_CODE}
          {isLoading && (
            <span className="ml-2 text-xs text-blue-500">
              {UI_TEXT.STATUS.PROCESSING}
            </span>
          )}
          {hasError && (
            <span className="ml-2 text-xs text-red-500">
              {UI_TEXT.STATUS.ERROR}
            </span>
          )}
        </label>
        {code && !isLoading && (
          <button onClick={handleCopy} className={linkClass}>
            {copied ? UI_TEXT.BUTTONS.COPIED : UI_TEXT.BUTTONS.COPY}
          </button>
        )}
      </div>
      <div className={outputContainerClass}>
        {code ? (
          <pre className="whitespace-pre-wrap">{code}</pre>
        ) : (
          <p className="text-zinc-400 dark:text-zinc-600">
            {isLoading
              ? UI_TEXT.PLACEHOLDERS.PROCESSING
              : UI_TEXT.PLACEHOLDERS.REFACTORED_OUTPUT}
          </p>
        )}
      </div>
      {displayError && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {UI_TEXT.STATUS.ERROR_PREFIX} {displayError}
        </p>
      )}
    </div>
  );
}
