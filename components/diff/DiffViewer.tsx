import { useMemo } from 'react';
import { diffLines as computeDiffLines } from 'diff';
import { DiffLine } from './DiffLine';

interface DiffViewerProps {
  originalCode: string;
  modifiedCode: string;
}

interface DiffLineData {
  id: string;
  lineNumber: string | number;
  content: string;
  type: 'added' | 'removed' | 'unchanged';
}

export function DiffViewer({ originalCode, modifiedCode }: DiffViewerProps) {
  const diffResult = useMemo<DiffLineData[]>(() => {
    const changes = computeDiffLines(originalCode, modifiedCode);
    let lineNumber = 0;
    const lines: DiffLineData[] = [];
    let changeIndex = 0;

    for (const change of changes) {
      const changeLines = change.value.split('\n');
      // Remove trailing empty line from split
      if (changeLines[changeLines.length - 1] === '') {
        changeLines.pop();
      }

      for (let lineIndex = 0; lineIndex < changeLines.length; lineIndex++) {
        const line = changeLines[lineIndex];
        const currentLineNum = change.added 
          ? ++lineNumber 
          : !change.removed 
            ? ++lineNumber 
            : '-';
        const type: DiffLineData['type'] = change.added 
          ? 'added' 
          : change.removed 
            ? 'removed' 
            : 'unchanged';

        lines.push({
          id: `${changeIndex}-${lineIndex}`,
          lineNumber: currentLineNum,
          content: line,
          type,
        });
      }
      changeIndex++;
    }

    return lines;
  }, [originalCode, modifiedCode]);

  return (
    <div className="whitespace-pre-wrap">
      {diffResult.map((line) => (
        <DiffLine
          key={line.id}
          lineNumber={line.lineNumber}
          content={line.content}
          type={line.type}
        />
      ))}
    </div>
  );
}
