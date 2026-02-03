import type { GoogleGenerativeAIModelId } from '@ai-sdk/google/internal';

export interface Model {
  id: GoogleGenerativeAIModelId;
  name: string;
}

export const models: readonly Model[] = [
  { id: "gemini-3-flash-preview", name: "Gemini 3 Flash Preview" },
  { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash" },
  { id: "gemini-2.5-flash-preview-09-2025", name: "Gemini 2.5 Flash Preview (09-2025)" },
  { id: "gemini-2.5-flash-lite", name: "Gemini 2.5 Flash Lite" },
  { id: "gemini-2.5-flash-lite-preview-09-2025", name: "Gemini 2.5 Flash Lite Preview (09-2025)" },
  { id: "gemini-2.0-flash-lite", name: "Gemini 2.0 Flash Lite" },
] as const;

export type ModelId = typeof models[number]['id'];

export function isValidModelId(id: string): id is ModelId {
  return models.some(model => model.id === id);
}

export function getModelById(id: ModelId): Model | undefined {
  return models.find(model => model.id === id);
}