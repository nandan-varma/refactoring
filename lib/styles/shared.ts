import { cn } from '@/lib/utils';

// Base label styling
export const getLabelClass = () =>
  cn('text-sm font-medium', 'text-zinc-900 dark:text-zinc-50');

// Link/button styling for secondary actions
export const getLinkClass = () =>
  cn(
    'cursor-pointer text-xs',
    'text-zinc-500 hover:text-zinc-700',
    'dark:text-zinc-400 dark:hover:text-zinc-300'
  );

// Container styling for textareas and output areas
export const getEditorContainerClass = () =>
  cn(
    'h-125 overflow-auto rounded-lg border p-4 font-mono text-sm',
    'border-zinc-300 bg-white text-zinc-900',
    'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500',
    'disabled:opacity-50',
    'dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50'
  );

// Output area specific styling (no focus states)
export const getOutputContainerClass = () =>
  cn(
    'h-125 overflow-auto rounded-lg border p-4 font-mono text-sm',
    'border-zinc-300 bg-white text-zinc-900',
    'dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50'
  );

// Form select/input styling
export const getFormInputClass = () =>
  cn(
    'w-full rounded-lg border px-4 py-2 text-sm',
    'border-zinc-300 bg-white text-zinc-900',
    'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500',
    'disabled:opacity-50',
    'dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50'
  );
