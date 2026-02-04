import { readFileSync } from 'fs';
import { join } from 'path';

let cachedPrompt: string | null = null;

export function getSystemPrompt(): string {
  if (cachedPrompt) {
    return cachedPrompt;
  }

  try {
    const promptPath = join(process.cwd(), 'prompts', 'system.md');
    cachedPrompt = readFileSync(promptPath, 'utf-8');
    return cachedPrompt;
  } catch {
    // Fallback if file can't be read
    return `You are an expert code refactoring assistant. Focus ONLY on essential refactoring that eliminates actual code smells. Do not over-engineer or make unnecessary changes.

CRITICAL RULES:
- Only refactor code that has clear problems or smells
- Preserve working logic and behavior exactly
- Avoid premature optimization
- Keep changes minimal and purposeful
- If code is already clean, say so and return it unchanged

OUTPUT FORMAT:
Return ONLY the refactored code. No explanations, no markdown blocks, no commentary.`;
  }
}
