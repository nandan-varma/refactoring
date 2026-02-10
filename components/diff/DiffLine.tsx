import { cn } from '@/lib/utils';

interface DiffLineProps {
  lineNumber: string | number;
  content: string;
  type: 'added' | 'removed' | 'unchanged';
}

const LINE_CLASS = {
  added: cn('bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-100'),
  removed: cn('bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-100'),
  unchanged: cn(''),
};

const PREFIX_CLASS = cn(
  'flex-shrink-0 w-4 text-zinc-400 dark:text-zinc-600 select-none'
);

const LINE_NUMBER_CLASS = cn(
  'select-none text-zinc-400 dark:text-zinc-600',
  'w-8 flex-shrink-0 text-right pr-3'
);

export function DiffLine({ lineNumber, content, type }: DiffLineProps) {
  const prefix = type === 'added' ? '+' : type === 'removed' ? '-' : ' ';

  return (
    <div className={`flex ${LINE_CLASS[type]}`}>
      <span className={LINE_NUMBER_CLASS}>{lineNumber}</span>
      <span className={PREFIX_CLASS}>{prefix}</span>
      <span className="flex-1">{content}</span>
    </div>
  );
}
