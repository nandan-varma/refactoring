import type { GoogleGenerativeAIModelId } from '@ai-sdk/google/internal';

// Model configuration
export const DEFAULT_MODEL_ID: GoogleGenerativeAIModelId = 'gemini-3-flash-preview';

// UI timing constants (in milliseconds)
export const COPY_FEEDBACK_DURATION_MS = 2000;

// Refactoring prompt
export const REFACTOR_PROMPT_PREFIX = 'Refactor this code:\n\n';

// Supported file extensions for upload
export const SUPPORTED_EXTENSIONS = [
  '.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.cpp', '.c', '.cs', '.rb',
  '.go', '.rs', '.php', '.swift', '.kt', '.scala', '.sh', '.html', '.css',
  '.json', '.xml', '.yaml', '.yml', '.md'
] as const;

// Chat/Refactoring status states
export const ChatStatus = {
  READY: 'ready',
  SUBMITTED: 'submitted',
  STREAMING: 'streaming',
  ERROR: 'error',
} as const;

export type ChatStatusType = typeof ChatStatus[keyof typeof ChatStatus];

// UI text constants
export const UI_TEXT = {
  BUTTONS: {
    REFACTOR: 'Refactor Code',
    REFACTORING: 'Processing...',
    UPLOAD: 'Upload',
    CLEAR: 'Clear',
    COPY: 'Copy',
    COPIED: 'Copied!',
  },
  LABELS: {
    ORIGINAL_CODE: 'Original Code',
    REFACTORED_CODE: 'Refactored Code',
    SELECT_MODEL: 'Select Model',
    EXPLANATION: 'Refactoring Explanation',
  },
  PLACEHOLDERS: {
    CODE_INPUT: 'Paste your code here...\n\nTip: Press Cmd+Enter to refactor',
    REFACTORED_OUTPUT: 'Refactored code will appear here',
    PROCESSING: 'Analyzing and refactoring your code...',
  },
  TOOLTIPS: {
    ENTER_CODE: 'Enter code to refactor',
    PROCESSING: 'Processing...',
    REFACTOR_SHORTCUT: 'Refactor code (Cmd+Enter)',
  },
  STATUS: {
    PROCESSING: '(processing...)',
    ERROR: '(error)',
    ERROR_PREFIX: 'Error:',
  },
  MESSAGES: {
    NO_CODE: 'Enter code to refactor',
  },
} as const;

// App metadata
export const APP_METADATA = {
  TITLE: 'AI Code Refactoring Tool',
  DESCRIPTION: 'Refactor your code using best practices with Gemini AI. Improve code quality, readability, and maintainability instantly.',
  SHORT_DESCRIPTION: 'Refactor your code using best practices with Gemini AI',
  KEYWORDS: ['AI', 'code refactoring', 'Gemini AI', 'code quality', 'developer tools'] as string[],
};
