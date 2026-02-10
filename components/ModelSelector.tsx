import { models } from '@/lib/models';
import { UI_TEXT } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ModelSelectorProps {
  selectedModel: string;
  onChange: (model: string) => void;
  disabled: boolean;
}

const LABEL_CLASS = cn(
  'mb-2 block text-sm font-medium',
  'text-zinc-900 dark:text-zinc-50'
);

const SELECT_CLASS = cn(
  'w-full rounded-lg border px-4 py-2 text-sm',
  'border-zinc-300 bg-white text-zinc-900',
  'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500',
  'disabled:opacity-50',
  'dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50'
);

export function ModelSelector({ selectedModel, onChange, disabled }: ModelSelectorProps) {
  return (
    <div>
      <label htmlFor="model-select" className={LABEL_CLASS}>
        {UI_TEXT.LABELS.SELECT_MODEL}
      </label>
      <select
        id="model-select"
        value={selectedModel}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={SELECT_CLASS}
      >
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
}
