// Supported file extensions for upload
export const SUPPORTED_EXTENSIONS = [
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.py',
  '.java',
  '.cpp',
  '.c',
  '.cs',
  '.rb',
  '.go',
  '.rs',
  '.php',
  '.swift',
  '.kt',
  '.scala',
  '.sh',
  '.html',
  '.css',
  '.json',
  '.xml',
  '.yaml',
  '.yml',
  '.md',
] as const;

export type SupportedExtension = (typeof SUPPORTED_EXTENSIONS)[number];
