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
  },
  PLACEHOLDERS: {
    CODE_INPUT:
      'Paste your code here...\n\nTip: Press Cmd+Enter to refactor',
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
    FILE_TOO_LARGE: 'File is too large. Maximum size is 1MB.',
    UNSUPPORTED_FILE_TYPE: 'Unsupported file type.',
    FILE_READ_ERROR: 'Failed to read file. Please try again.',
    COPY_ERROR: 'Failed to copy to clipboard.',
    REFACTOR_ERROR: 'Failed to send refactoring request.',
    CODE_TOO_LONG: 'Code is too long. Maximum length is 50KB.',
  },
} as const;
