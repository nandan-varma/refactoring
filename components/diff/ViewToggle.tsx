import { cn } from '@/lib/utils';

type ViewMode = 'split' | 'output';

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const CONTAINER_CLASS = cn(
  'flex items-center gap-1 rounded-md',
  'border border-zinc-200 bg-zinc-100',
  'dark:border-zinc-700 dark:bg-zinc-800',
  'p-0.5'
);

const BUTTON_BASE = cn(
  'px-2 py-0.5 text-xs font-medium rounded transition-colors'
);

const BUTTON_ACTIVE = cn(
  'bg-white text-zinc-900 shadow-sm',
  'dark:bg-zinc-700 dark:text-zinc-50'
);

const BUTTON_INACTIVE = cn(
  'text-zinc-500 hover:text-zinc-700',
  'dark:text-zinc-400 dark:hover:text-zinc-300'
);

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className={CONTAINER_CLASS}>
      <button
        onClick={() => onViewModeChange('split')}
        className={cn(
          BUTTON_BASE,
          viewMode === 'split' ? BUTTON_ACTIVE : BUTTON_INACTIVE
        )}
      >
        Diff
      </button>
      <button
        onClick={() => onViewModeChange('output')}
        className={cn(
          BUTTON_BASE,
          viewMode === 'output' ? BUTTON_ACTIVE : BUTTON_INACTIVE
        )}
      >
        Output
      </button>
    </div>
  );
}
