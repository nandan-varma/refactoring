import { useState, useCallback } from 'react';
import { DEFAULT_MODEL_ID, ChatStatus } from '@/lib/constants';
import type { ChatStatusType } from '@/lib/constants';
import type { RefactoringOutput, CodeSmell } from '@/app/api/refactor/route';

interface UseCodeRefactorReturn {
  code: string;
  setCode: (code: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  refactor: () => Promise<void>;
  clear: () => void;
  isLoading: boolean;
  status: ChatStatusType;
  error: Error | undefined;
  refactoredCode: string;
  explanation: CodeSmell[];
}

export function useCodeRefactor(): UseCodeRefactorReturn {
  const [code, setCode] = useState('');
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL_ID);
  const [status, setStatus] = useState<ChatStatusType>(ChatStatus.READY);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [result, setResult] = useState<RefactoringOutput | null>(null);

  const refactor = useCallback(async () => {
    if (!code.trim()) return;

    setStatus(ChatStatus.SUBMITTED);
    setError(undefined);
    setResult(null);

    try {
      const response = await fetch('/api/refactor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code.trim(),
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to refactor code');
      }

      const data: RefactoringOutput = await response.json();
      setResult(data);
      setStatus(ChatStatus.READY);
    } catch (err) {
      console.error('Failed to refactor code:', err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      setStatus(ChatStatus.ERROR);
    }
  }, [code, selectedModel]);

  const clear = useCallback(() => {
    setCode('');
    setError(undefined);
    setResult(null);
    setStatus(ChatStatus.READY);
  }, []);

  const isLoading = status === ChatStatus.SUBMITTED;

  return {
    code,
    setCode,
    selectedModel,
    setSelectedModel,
    refactor,
    clear,
    isLoading,
    status,
    error,
    refactoredCode: result?.refactoredCode || '',
    explanation: result?.explanation || [],
  };
}
