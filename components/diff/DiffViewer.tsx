'use client';

import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';

interface DiffViewerProps {
  originalCode: string;
  modifiedCode: string;
  splitView?: boolean;
  useDarkTheme?: boolean;
}

export function DiffViewer({
  originalCode,
  modifiedCode,
  splitView = true,
  useDarkTheme = false
}: DiffViewerProps) {
  return (
    <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
      <ReactDiffViewer
        oldValue={originalCode}
        newValue={modifiedCode}
        splitView={splitView}
        useDarkTheme={useDarkTheme}
        compareMethod={DiffMethod.WORDS}
        leftTitle="Original"
        rightTitle="Refactored"
        showDiffOnly={false}
        hideLineNumbers={false}
      />
    </div>
  );
}
