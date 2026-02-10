'use client';

import { useState } from 'react';
import { UI_TEXT, ChatStatus } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { CopyButton } from '@/components/CopyButton';
import { DiffViewer } from '@/components/diff/DiffViewer';
import { ViewToggle } from '@/components/diff/ViewToggle';

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

const OUTPUT_CONTAINER_CLASS = cn(
  'h-125 overflow-auto rounded-lg border p-4 font-mono text-sm',
  'border-zinc-300 bg-white text-zinc-900',
  'dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50'
);

export function CodeOutput({ 
  code, 
  originalCode, 
  isLoading, 
  status, 
  errorMessage 
}: CodeOutputProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('diff');
  const hasError = status === ChatStatus.ERROR;
  const hasBothCodes = Boolean(code && originalCode);

  const renderContent = () => {
    if (!code) {
      return (
        <p className="text-zinc-400 dark:text-zinc-600">
          {isLoading 
            ? UI_TEXT.PLACEHOLDERS.PROCESSING 
            : UI_TEXT.PLACEHOLDERS.REFACTORED_OUTPUT}
        </p>
      );
    }

    if (viewMode === 'diff' && hasBothCodes && originalCode) {
      return (
        <DiffViewer 
          originalCode={originalCode} 
          modifiedCode={code} 
        />
      );
    }

    return <pre className="whitespace-pre-wrap">{code}</pre>;
  };

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor="code-output" className={LABEL_CLASS}>
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
          <div className="flex items-center gap-2">
            {hasBothCodes && (
              <ViewToggle 
                viewMode={viewMode} 
                onViewModeChange={setViewMode} 
              />
            )}
            <CopyButton text={code} />
          </div>
        )}
      </div>
      <div className={OUTPUT_CONTAINER_CLASS}>
        {renderContent()}
      </div>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {UI_TEXT.STATUS.ERROR_PREFIX} {errorMessage}
        </p>
      )}
    </div>
  );
}
