// Chat/Refactoring status states
export const ChatStatus = {
  READY: 'ready',
  SUBMITTED: 'submitted',
  STREAMING: 'streaming',
  ERROR: 'error',
} as const;

export type ChatStatusType = (typeof ChatStatus)[keyof typeof ChatStatus];
