'use client';

import { cn } from '@/lib/utils';
import { SUPPORTED_EXTENSIONS, UI_TEXT } from '@/lib/constants';
import Editor from 'react-simple-code-editor';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onClear: () => void;
  onSubmit: () => void | Promise<void>;
  disabled: boolean;
}

const LABEL_CLASS = cn(
  'text-sm font-medium',
  'text-zinc-900 dark:text-zinc-50'
);

const LINK_CLASS = cn(
  'cursor-pointer text-xs transition-colors',
  'text-zinc-400 hover:text-zinc-600',
  'dark:text-zinc-500 dark:hover:text-zinc-400'
);

const TEXTAREA_CLASS = cn(
  'h-125 rounded-lg border p-4 font-mono text-sm overflow-auto',
  'border-zinc-200 bg-white text-zinc-900',
  'focus-within:border-zinc-300',
  'disabled:opacity-50',
  'dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50',
  'dark:focus-within:border-zinc-700',
  '[&_textarea]:outline-none [&_textarea]:focus:outline-none'
);

const EDITOR_STYLES = {
  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
  fontSize: '0.875rem',
  lineHeight: '1.5',
  minHeight: '500px',
  overflow: 'auto',
};

const highlightCode = (code: string) => {
  if (!code) return code;
  try {
    const result = hljs.highlightAuto(code);
    return result.value;
  } catch (err) {
    console.error('Highlighting error:', err);
    return code;
  }
};

export function CodeEditor({ code, onChange, onClear, onSubmit, disabled }: CodeEditorProps) {
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && code.trim() && !disabled) {
      e.preventDefault();
      await onSubmit();
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
      <div onKeyDown={handleKeyDown} className={TEXTAREA_CLASS}>
        <Editor
          value={code}
          onValueChange={onChange}
          highlight={highlightCode}
          padding={0}
          style={EDITOR_STYLES}
          placeholder={UI_TEXT.PLACEHOLDERS.CODE_INPUT}
          disabled={disabled}
          textareaId="code-input"
        />
      </div>
    </div>
  );
}
