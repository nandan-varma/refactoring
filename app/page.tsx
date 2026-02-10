'use client';

import { useCodeRefactor } from '@/lib/hooks/useCodeRefactor';
import { CodeEditor } from '@/components/CodeEditor';
import { CodeOutput } from '@/components/CodeOutput';
import { ModelSelector } from '@/components/ModelSelector';
import { RefactoringExplanation } from '@/components/RefactoringExplanation';
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
    explanation,
  } = useCodeRefactor();

  const handleRefactor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await refactor();
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

        <div className="mb-6 flex flex-col items-stretch gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <ModelSelector
              selectedModel={selectedModel}
              onChange={setSelectedModel}
              disabled={isLoading}
            />
          </div>
          <form onSubmit={handleRefactor} className="flex-shrink-0">
            <button
              type="submit"
              disabled={!canRefactor}
              className="w-full rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              title={buttonTitle}
            >
              {isLoading ? UI_TEXT.BUTTONS.REFACTORING : UI_TEXT.BUTTONS.REFACTOR}
            </button>
          </form>
        </div>

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

        <div className="mt-6">
          <RefactoringExplanation
            explanation={explanation}
            isVisible={!isLoading && !!explanation}
          />
        </div>
      </main>
    </div>
  );
}
