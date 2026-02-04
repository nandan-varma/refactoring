import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { DEFAULT_MODEL_ID } from '@/lib/config/app';
import { REFACTOR_PROMPT_PREFIX } from '@/lib/config/prompts';
import { ChatStatus } from '@/lib/types/status';
import { REQUEST_LIMITS } from '@/lib/config/constants';
import { UI_TEXT } from '@/lib/config/ui-text';

interface UseCodeRefactorReturn {
  code: string;
  setCode: (code: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  refactor: () => void;
  clear: () => void;
  isLoading: boolean;
  status: string;
  error: Error | undefined;
  refactoredCode: string;
  validationError: string | null;
}

export function useCodeRefactor(): UseCodeRefactorReturn {
  const [code, setCode] = useState('');
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL_ID);
  const [validationError, setValidationError] = useState<string | null>(null);

  const {
    messages,
    sendMessage,
    status,
    error,
    clearError,
    setMessages,
  } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/refactor',
    }),
  });

  // Clear validation error when code changes
  useEffect(() => {
    if (validationError) {
      setValidationError(null);
    }
  }, [code, validationError]);

  const refactor = useCallback(() => {
    if (!code.trim()) {
      setValidationError(UI_TEXT.MESSAGES.NO_CODE);
      return;
    }

    if (code.length > REQUEST_LIMITS.MAX_CODE_LENGTH) {
      setValidationError(UI_TEXT.MESSAGES.CODE_TOO_LONG);
      return;
    }

    setValidationError(null);
    setMessages([]);

    try {
      sendMessage(
        { text: `${REFACTOR_PROMPT_PREFIX}${code}` },
        { body: { model: selectedModel } }
      );
    } catch (err) {
      console.error('Failed to send refactoring request:', err);
      setValidationError(UI_TEXT.MESSAGES.REFACTOR_ERROR);
    }
  }, [code, selectedModel, setMessages, sendMessage]);

  const clear = useCallback(() => {
    setCode('');
    setMessages([]);
    clearError();
    setValidationError(null);
  }, [setMessages, clearError]);

  const isLoading =
    status === ChatStatus.STREAMING || status === ChatStatus.SUBMITTED;

  const refactoredCode = useMemo(() => {
    return messages
      .filter((m) => m.role === 'assistant')
      .flatMap((m) =>
        m.parts.filter((p) => p.type === 'text').map((p) => p.text)
      )
      .join('');
  }, [messages]);

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
    refactoredCode,
    validationError,
  };
}
