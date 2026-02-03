'use client';

import { useCodeRefactor } from '@/lib/hooks/useCodeRefactor';
import { CodeEditor } from '@/components/CodeEditor';
import { CodeOutput } from '@/components/CodeOutput';
import { ModelSelector } from '@/components/ModelSelector';
import { ChatStatus, UI_TEXT } from '@/lib/constants';

export default function Home() {
  const {
    code,
    setCode,
    selectedModel,
    setSelectedModel,
    refactor,
    clear,
    isLoading,
    status,
    error,
    refactoredCode,
  } = useCodeRefactor();

  const handleRefactor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refactor();
  };

  const canRefactor = status === ChatStatus.READY && code.trim();
  const buttonTitle = !code.trim() 
    ? UI_TEXT.TOOLTIPS.ENTER_CODE 
    : isLoading 
      ? UI_TEXT.TOOLTIPS.PROCESSING 
      : UI_TEXT.TOOLTIPS.REFACTOR_SHORTCUT;

  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans dark:bg-zinc-900">
      <main className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            AI Code Refactoring Tool
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Powered by Gemini AI - Refactor your code using best practices
          </p>
        </div>

        <ModelSelector
          selectedModel={selectedModel}
          onChange={setSelectedModel}
          disabled={isLoading}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <CodeEditor
            code={code}
            onChange={setCode}
            onClear={clear}
            onSubmit={refactor}
            disabled={isLoading}
          />

          <CodeOutput
            code={refactoredCode}
            isLoading={isLoading}
            status={status}
            errorMessage={error?.message}
          />
        </div>

        <form onSubmit={handleRefactor} className="mt-6 flex justify-center">
          <button
            type="submit"
            disabled={!canRefactor}
            className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            title={buttonTitle}
          >
            {isLoading ? UI_TEXT.BUTTONS.REFACTORING : UI_TEXT.BUTTONS.REFACTOR}
          </button>
        </form>
      </main>
    </div>
  );
}
