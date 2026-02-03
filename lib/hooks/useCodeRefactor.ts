import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState, useCallback, useMemo } from 'react';
import { DEFAULT_MODEL_ID, REFACTOR_PROMPT_PREFIX, ChatStatus } from '@/lib/constants';
import type { ChatStatusType } from '@/lib/constants';

interface UseCodeRefactorReturn {
  code: string;
  setCode: (code: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  refactor: () => void;
  clear: () => void;
  isLoading: boolean;
  status: ChatStatusType;
  error: Error | undefined;
  refactoredCode: string;
}

export function useCodeRefactor(): UseCodeRefactorReturn {
  const [code, setCode] = useState('');
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL_ID);
  
  const { messages, sendMessage, status, error, clearError, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/refactor',
    }),
  });

  const refactor = useCallback(() => {
    if (!code.trim()) return;
    
    setMessages([]);
    try {
      sendMessage(
        { text: `${REFACTOR_PROMPT_PREFIX}${code}` },
        { body: { model: selectedModel } }
      );
    } catch (err) {
      console.error('Failed to send refactoring request:', err);
    }
  }, [code, selectedModel, setMessages, sendMessage]);

  const clear = useCallback(() => {
    setCode('');
    clearError();
  }, [clearError]);

  const isLoading = status === ChatStatus.STREAMING || status === ChatStatus.SUBMITTED;
  
  const refactoredCode = useMemo(() => {
    return messages
      .filter(m => m.role === 'assistant')
      .flatMap(m => m.parts.filter(p => p.type === 'text').map(p => p.text))
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
    status: status as ChatStatusType,
    error,
    refactoredCode,
  };
}
