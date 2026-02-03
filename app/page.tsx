'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';

export default function Home() {
  const [code, setCode] = useState('');
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/refactor',
    }),
  });

  const handleRefactor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    
    sendMessage({ text: `Refactor this code:\n\n${code}` });
  };

  const isLoading = status === 'streaming';
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
            <label
              htmlFor="code-input"
              className="mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-50"
            >
              Original Code
            </label>
            <textarea
              id="code-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              disabled={status === 'streaming'}
              className="h-[500px] rounded-lg border border-zinc-300 bg-white p-4 font-mono text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
            />
          </div>

          {/* Output Section */}
          <div className="flex flex-col">
            <label
              htmlFor="code-output"
              className="mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-50"
            >
              Refactored Code {isLoading && <span className="text-blue-500">(streaming...)</span>}
            </label>
            <div className="h-[500px] overflow-auto rounded-lg border border-zinc-300 bg-white p-4 font-mono text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50">
              {refactoredCode ? (
                <pre className="whitespace-pre-wrap">{refactoredCode}</pre>
              ) : (
                <p className="text-zinc-400 dark:text-zinc-600">
                  {isLoading ? 'Refactoring your code...' : 'Refactored code will appear here...'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <form onSubmit={handleRefactor} className="mt-6 flex justify-center">
          <button
            type="submit"
            disabled={status !== 'ready' || !code.trim()}
            className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? 'Refactoring...' : 'Refactor Code'}
          </button>
        </form>
      </main>
    </div>
  );
}
