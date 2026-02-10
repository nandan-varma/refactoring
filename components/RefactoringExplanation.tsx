import { UI_TEXT } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface RefactoringExplanationProps {
  explanation: string;
  isVisible: boolean;
}

const CONTAINER_CLASS = cn(
  'rounded-lg border p-4',
  'border-blue-200 bg-blue-50',
  'dark:border-blue-800 dark:bg-blue-900/20'
);

const TITLE_CLASS = cn(
  'mb-2 text-sm font-semibold',
  'text-blue-900 dark:text-blue-100'
);

const TEXT_CLASS = cn(
  'text-sm leading-relaxed',
  'text-blue-800 dark:text-blue-200'
);

export function RefactoringExplanation({ explanation, isVisible }: RefactoringExplanationProps) {
  if (!isVisible || !explanation) {
    return null;
  }

  return (
    <div className={CONTAINER_CLASS}>
      <h4 className={TITLE_CLASS}>
        {UI_TEXT.LABELS.EXPLANATION}
      </h4>
      <p className={TEXT_CLASS}>
        {explanation}
      </p>
    </div>
  );
}
