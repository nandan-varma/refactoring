import { useState, useMemo } from 'react';
import { diffLines, type Change } from 'diff';
import { COPY_FEEDBACK_DURATION_MS, UI_TEXT, ChatStatus } from '@/lib/constants';
import { cn } from '@/lib/utils';

type ViewMode = 'diff' | 'output';

interface CodeOutputProps {
  code: string;
  originalCode?: string;
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

const TOGGLE_CONTAINER_CLASS = cn(
  'flex items-center gap-1 rounded-md',
  'border border-zinc-200 bg-zinc-100',
  'dark:border-zinc-700 dark:bg-zinc-800',
  'p-0.5'
);

const TOGGLE_BUTTON_BASE = cn(
  'px-2 py-0.5 text-xs font-medium rounded transition-colors'
);

const TOGGLE_BUTTON_ACTIVE = cn(
  'bg-white text-zinc-900 shadow-sm',
  'dark:bg-zinc-700 dark:text-zinc-50'
);

const TOGGLE_BUTTON_INACTIVE = cn(
  'text-zinc-500 hover:text-zinc-700',
  'dark:text-zinc-400 dark:hover:text-zinc-300'
);

const OUTPUT_CONTAINER_CLASS = cn(
  'h-125 overflow-auto rounded-lg border p-4 font-mono text-sm',
  'border-zinc-300 bg-white text-zinc-900',
  'dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50'
);

const DIFF_LINE_ADDED = cn(
  'bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-100'
);

const DIFF_LINE_REMOVED = cn(
  'bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-100'
);

const DIFF_LINE_UNCHANGED = cn(
  ''
);

const LINE_NUMBER_CLASS = cn(
  'select-none text-zinc-400 dark:text-zinc-600',
  'w-8 flex-shrink-0 text-right pr-3'
);

export function CodeOutput({ code, originalCode, isLoading, status, errorMessage }: CodeOutputProps) {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('diff');
  const hasError = status === ChatStatus.ERROR;
  const hasBothCodes = code && originalCode;

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

  const diffResult = useMemo<Change[]>(() => {
    if (!originalCode || !code) return [];
    return diffLines(originalCode, code);
  }, [originalCode, code]);

  const renderDiff = () => {
    if (!hasBothCodes || diffResult.length === 0) {
      return (
        <pre className="whitespace-pre-wrap">
          {code || (
            <span className="text-zinc-400 dark:text-zinc-600">
              {isLoading ? UI_TEXT.PLACEHOLDERS.PROCESSING : UI_TEXT.PLACEHOLDERS.REFACTORED_OUTPUT}
            </span>
          )}
        </pre>
      );
    }

    let lineNumber = 0;

    return (
      <div className="whitespace-pre-wrap">
        {diffResult.map((part, index) => {
          const lines = part.value.split('\n');
          // Remove trailing empty line from split
          if (lines[lines.length - 1] === '') {
            lines.pop();
          }

          return lines.map((line, lineIndex) => {
            const currentLineNum = part.added ? ++lineNumber : !part.removed ? ++lineNumber : '-';
            const lineClass = part.added 
              ? DIFF_LINE_ADDED 
              : part.removed 
                ? DIFF_LINE_REMOVED 
                : DIFF_LINE_UNCHANGED;
            const prefix = part.added ? '+' : part.removed ? '-' : ' ';

            return (
              <div key={`${index}-${lineIndex}`} className={`flex ${lineClass}`}>
                <span className={LINE_NUMBER_CLASS}>{currentLineNum}</span>
                <span className="flex-shrink-0 w-4 text-zinc-400 dark:text-zinc-600 select-none">
                  {prefix}
                </span>
                <span className="flex-1">{line}</span>
              </div>
            );
          });
        })}
      </div>
    );
  };

  const renderOutput = () => {
    if (!code) {
      return (
        <p className="text-zinc-400 dark:text-zinc-600">
          {isLoading ? UI_TEXT.PLACEHOLDERS.PROCESSING : UI_TEXT.PLACEHOLDERS.REFACTORED_OUTPUT}
        </p>
      );
    }
    return <pre className="whitespace-pre-wrap">{code}</pre>;
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
          <div className="flex items-center gap-2">
            {hasBothCodes && (
              <div className={TOGGLE_CONTAINER_CLASS}>
                <button
                  onClick={() => setViewMode('diff')}
                  className={cn(
                    TOGGLE_BUTTON_BASE,
                    viewMode === 'diff' ? TOGGLE_BUTTON_ACTIVE : TOGGLE_BUTTON_INACTIVE
                  )}
                >
                  {UI_TEXT.BUTTONS.VIEW_DIFF}
                </button>
                <button
                  onClick={() => setViewMode('output')}
                  className={cn(
                    TOGGLE_BUTTON_BASE,
                    viewMode === 'output' ? TOGGLE_BUTTON_ACTIVE : TOGGLE_BUTTON_INACTIVE
                  )}
                >
                  {UI_TEXT.BUTTONS.VIEW_OUTPUT}
                </button>
              </div>
            )}
            <button onClick={handleCopy} className={LINK_CLASS}>
              {copied ? UI_TEXT.BUTTONS.COPIED : UI_TEXT.BUTTONS.COPY}
            </button>
          </div>
        )}
      </div>
      <div className={OUTPUT_CONTAINER_CLASS}>
        {viewMode === 'diff' && hasBothCodes ? renderDiff() : renderOutput()}
      </div>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {UI_TEXT.STATUS.ERROR_PREFIX} {errorMessage}
        </p>
      )}
    </div>
  );
}
