'use client';

import { useState, useEffect } from 'react';
import { ChatStatus } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { CopyButton } from '@/components/CopyButton';
import { DiffViewer } from '@/components/diff/DiffViewer';
import { ViewToggle } from '@/components/diff/ViewToggle';
import { AutoHighlight } from '@/components/AutoHighlight';

type ViewMode = 'split' | 'output';

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
  'h-125 overflow-auto rounded-lg border',
  'border-zinc-200 bg-white text-zinc-900',
  'dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50'
);

export function CodeOutput({ 
  code, 
  originalCode, 
  isLoading, 
  status, 
  errorMessage 
}: CodeOutputProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const hasError = status === ChatStatus.ERROR;
  const hasBothCodes = Boolean(code && originalCode);

  const renderContent = () => {
    if (!code) {
      return (
        <p className="text-zinc-400 dark:text-zinc-600 p-4">
          {isLoading 
            ? 'Analyzing and refactoring your code...' 
            : 'Refactored code will appear here'}
        </p>
      );
    }

    if (viewMode !== 'output' && hasBothCodes && originalCode) {
      return (
        <DiffViewer 
          originalCode={originalCode} 
          modifiedCode={code}
          splitView={viewMode === 'split'}
          useDarkTheme={true}
        />
      );
    }

    return <AutoHighlight code={code} className="whitespace-pre-wrap p-4 font-mono text-sm" />;
  };

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor="code-output" className={LABEL_CLASS}>
          Refactored Code
          {isLoading && (
            <span className="ml-2 text-xs text-blue-500">
              (processing...)
            </span>
          )}
          {hasError && (
            <span className="ml-2 text-xs text-red-500">
              (error)
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
          Error: {errorMessage}
        </p>
      )}
    </div>
  );
}
