import type { CodeSmell } from '@/app/api/refactor/route';
import { UI_TEXT } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface RefactoringExplanationProps {
  explanation: CodeSmell[];
  isVisible: boolean;
}

const CONTAINER_CLASS = cn(
  'rounded-lg border p-6',
  'border-zinc-200 bg-white',
  'dark:border-zinc-700 dark:bg-zinc-800'
);

const TITLE_CLASS = cn(
  'mb-4 text-lg font-semibold',
  'text-zinc-900 dark:text-zinc-50'
);

const LIST_CLASS = cn(
  'space-y-3'
);

const ITEM_CLASS = cn(
  'flex flex-col gap-2',
  'p-4 rounded-md',
  'border border-zinc-200 bg-zinc-50',
  'dark:border-zinc-700 dark:bg-zinc-900'
);

const SMELL_HEADING_CLASS = cn(
  'text-sm font-semibold',
  'text-zinc-900 dark:text-zinc-50'
);

const DESCRIPTION_CLASS = cn(
  'text-sm leading-relaxed',
  'text-zinc-600 dark:text-zinc-400'
);

export function RefactoringExplanation({ explanation, isVisible }: RefactoringExplanationProps) {
  if (!isVisible || !explanation || explanation.length === 0) {
    return null;
  }

  return (
    <div className={CONTAINER_CLASS}>
      <h4 className={TITLE_CLASS}>
        {UI_TEXT.LABELS.EXPLANATION}
      </h4>
      <ul className={LIST_CLASS}>
        {explanation.map((item) => (
          <li key={`${item.smell}-${item.description}`} className={ITEM_CLASS}>
            <h5 className={SMELL_HEADING_CLASS}>
              {item.smell}
            </h5>
            <p className={DESCRIPTION_CLASS}>
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
