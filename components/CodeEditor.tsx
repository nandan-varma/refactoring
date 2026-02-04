import { useState } from 'react';
import {
  getLabelClass,
  getLinkClass,
  getEditorContainerClass,
} from '@/lib/styles/shared';
import { SUPPORTED_EXTENSIONS } from '@/lib/config/files';
import { UI_TEXT } from '@/lib/config/ui-text';
import { REQUEST_LIMITS } from '@/lib/config/constants';
import { KEYBOARD_SHORTCUTS } from '@/lib/config/constants';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onClear: () => void;
  onSubmit: () => void;
  disabled: boolean;
  errorMessage?: string | null;
}

export function CodeEditor({
  code,
  onChange,
  onClear,
  onSubmit,
  disabled,
  errorMessage,
}: CodeEditorProps) {
  const [uploadError, setUploadError] = useState<string | null>(null);

  const labelClass = getLabelClass();
  const linkClass = getLinkClass();
  const textareaClass = getEditorContainerClass();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isModifierPressed = e.metaKey || e.ctrlKey;
    const isSubmitKey = e.key === KEYBOARD_SHORTCUTS.SUBMIT;

    if (isModifierPressed && isSubmitKey && code.trim() && !disabled) {
      e.preventDefault();
      onSubmit();
    }
  };

  const validateFile = (file: File): string | null => {
    if (file.size > REQUEST_LIMITS.MAX_FILE_SIZE_BYTES) {
      return UI_TEXT.MESSAGES.FILE_TOO_LARGE;
    }

    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    const isSupported = SUPPORTED_EXTENSIONS.some(
      (ext) => ext.toLowerCase() === extension
    );

    if (!isSupported) {
      return UI_TEXT.MESSAGES.UNSUPPORTED_FILE_TYPE;
    }

    return null;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setUploadError(validationError);
      e.target.value = '';
      return;
    }

    try {
      const text = await file.text();

      if (text.length > REQUEST_LIMITS.MAX_CODE_LENGTH) {
        setUploadError(UI_TEXT.MESSAGES.CODE_TOO_LONG);
        e.target.value = '';
        return;
      }

      setUploadError(null);
      onChange(text);
    } catch {
      setUploadError(UI_TEXT.MESSAGES.FILE_READ_ERROR);
    } finally {
      e.target.value = '';
    }
  };

  const handleClear = () => {
    setUploadError(null);
    onClear();
  };

  const displayError = errorMessage || uploadError;

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor="code-input" className={labelClass}>
          {UI_TEXT.LABELS.ORIGINAL_CODE}
        </label>
        <div className="flex items-center gap-2">
          <label htmlFor="file-upload" className={linkClass}>
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
            <button onClick={handleClear} className={linkClass}>
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
        className={textareaClass}
      />
      {displayError && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {UI_TEXT.STATUS.ERROR_PREFIX} {displayError}
        </p>
      )}
    </div>
  );
}
