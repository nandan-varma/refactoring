// UI timing constants (in milliseconds)
export const COPY_FEEDBACK_DURATION_MS = 2000;

// HTTP Status Codes
export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  PAYLOAD_TOO_LARGE: 413,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Request limits
export const REQUEST_LIMITS = {
  MAX_CODE_LENGTH: 50000, // 50KB of code
  MAX_FILE_SIZE_BYTES: 1048576, // 1MB
} as const;

// Keyboard shortcuts
export const KEYBOARD_SHORTCUTS = {
  SUBMIT: 'Enter',
  MODIFIER_KEY: 'metaKey', // Cmd on Mac, can use 'ctrlKey' for Windows
} as const;
