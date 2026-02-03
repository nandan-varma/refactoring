'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';

export default function Home() {
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);
  const { messages, sendMessage, status, error, clearError, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/refactor',
    }),
  });

  const handleRefactor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!code.trim()) return;
    
    setMessages([]);
    sendMessage({ text: `Refactor this code:\n\n${code}` });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && code.trim() && status === 'ready') {
      e.preventDefault();
      setMessages([]);
      sendMessage({ text: `Refactor this code:\n\n${code}` });
    }
  };

  const handleCopy = async () => {
    if (!refactoredCode) return;
    await navigator.clipboard.writeText(refactoredCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setCode('');
    if (error) clearError();
  };

  const isLoading = status === 'streaming' || status === 'submitted';
  const refactoredCode = messages
    .filter(m => m.role === 'assistant')
    .flatMap(m => m.parts.filter(p => p.type === 'text').map(p => p.text))
    .join('');

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

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Section */}
          <div className="flex flex-col">
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="code-input"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
              >
                Original Code
              </label>
              {code && (
                <button
                  onClick={handleClear}
                  className="text-xs text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                >
                  Clear
                </button>
              )}
            </div>
            <textarea
              id="code-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Paste your code here...&#10;&#10;Tip: Press Cmd+Enter to refactor"
              disabled={isLoading}
              className="h-125 rounded-lg border border-zinc-300 bg-white p-4 font-mono text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
            />
          </div>

          {/* Output Section */}
          <div className="flex flex-col">
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="code-output"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
              >
                Refactored Code
                {isLoading && <span className="ml-2 text-xs text-blue-500">(processing...)</span>}
                {status === 'error' && <span className="ml-2 text-xs text-red-500">(error)</span>}
              </label>
              {refactoredCode && !isLoading && (
                <button
                  onClick={handleCopy}
                  className="text-xs text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
            <div className="h-125 overflow-auto rounded-lg border border-zinc-300 bg-white p-4 font-mono text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50">
              {refactoredCode ? (
                <pre className="whitespace-pre-wrap">{refactoredCode}</pre>
              ) : (
                <p className="text-zinc-400 dark:text-zinc-600">
                  {isLoading ? 'Analyzing and refactoring your code...' : 'Refactored code will appear here'}
                </p>
              )}
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                Error: {error.message}
              </p>
            )}
          </div>
        </div>

        {/* Action Button */}
        <form onSubmit={handleRefactor} className="mt-6 flex justify-center">
          <button
            type="submit"
            disabled={status !== 'ready' || !code.trim()}
            className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            title={!code.trim() ? 'Enter code to refactor' : status !== 'ready' ? 'Processing...' : 'Refactor code (Cmd+Enter)'}
          >
            {isLoading ? 'Processing...' : 'Refactor Code'}
          </button>
        </form>
      </main>
    </div>
  );
}
