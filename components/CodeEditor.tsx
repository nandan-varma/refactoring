import { cn } from '@/lib/utils';
import { SUPPORTED_EXTENSIONS, UI_TEXT } from '@/lib/constants';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onClear: () => void;
  onSubmit: () => void;
  disabled: boolean;
}

const LABEL_CLASS = cn(
  'text-sm font-medium',
  'text-zinc-900 dark:text-zinc-50'
);

const LINK_CLASS = cn(
  'cursor-pointer text-xs',
  'text-zinc-500 hover:text-zinc-700',
  'dark:text-zinc-400 dark:hover:text-zinc-300'
);

const TEXTAREA_CLASS = cn(
  'h-125 rounded-lg border p-4 font-mono text-sm',
  'border-zinc-300 bg-white text-zinc-900',
  'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500',
  'disabled:opacity-50',
  'dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50'
);

export function CodeEditor({ code, onChange, onClear, onSubmit, disabled }: CodeEditorProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && code.trim() && !disabled) {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      onChange(text);
    } catch (err) {
      console.error('Failed to read file:', err);
    } finally {
      e.target.value = '';
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor="code-input" className={LABEL_CLASS}>
          {UI_TEXT.LABELS.ORIGINAL_CODE}
        </label>
        <div className="flex gap-2">
          <label htmlFor="file-upload" className={LINK_CLASS}>
            {UI_TEXT.BUTTONS.UPLOAD}
          </label>
          <input
            id="file-upload"
            type="file"
            accept={SUPPORTED_EXTENSIONS.join(',')}
            onChange={handleFileUpload}
            disabled={disabled}
            className="hidden"
          />
          {code && (
            <button onClick={onClear} className={LINK_CLASS}>
              {UI_TEXT.BUTTONS.CLEAR}
            </button>
          )}
        </div>
      </div>
      <textarea
        id="code-input"
        value={code}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={UI_TEXT.PLACEHOLDERS.CODE_INPUT}
        disabled={disabled}
        className={TEXTAREA_CLASS}
      />
    </div>
  );
}
