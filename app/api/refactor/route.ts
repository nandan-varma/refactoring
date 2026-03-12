import { generateText, Output } from 'ai';
import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { GoogleGenerativeAIModelId } from '@ai-sdk/google/internal';
import { z } from 'zod';
import { models, isValidModelId, getModelById } from '@/lib/models';
import { DEFAULT_MODEL_ID } from '@/lib/constants';
import { system_prompt } from '@/lib/prompt';

const modelIds = models.map(m => m.id);

const requestSchema = z.object({
  code: z.string(),
  model: z.enum(modelIds).optional().default(DEFAULT_MODEL_ID),
});

const codeSmellSchema = z.object({
  smell: z.string().describe('The type of code smell identified (e.g., "Long Function", "Magic Numbers", "Poor Naming")'),
  description: z.string().describe('A brief description of how this smell was addressed in the refactored code'),
});

const refactoringOutputSchema = z.object({
  refactoredCode: z.string().describe('The refactored code'),
  explanation: z.array(codeSmellSchema).describe('List of code smells identified and how they were addressed'),
});

export type CodeSmell = z.infer<typeof codeSmellSchema>;
export type RefactoringOutput = z.infer<typeof refactoringOutputSchema>;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, model: modelId } = requestSchema.parse(body);

    if (!isValidModelId(modelId)) {
      return Response.json(
        { error: 'Invalid model ID' },
        { status: 400 }
      );
    }

    const modelConfig = getModelById(modelId);

    if (!modelConfig) {
      return Response.json(
        { error: 'Model not found' },
        { status: 400 }
      );
    }

    // Select the appropriate provider and model
    let modelInstance;
    if (modelConfig.provider === 'google') {
      modelInstance = google(modelConfig.ModelId as GoogleGenerativeAIModelId);
    } else if (modelConfig.provider === 'openai') {
      modelInstance = openai(modelConfig.ModelId);
    } else {
      return Response.json(
        { error: 'Unsupported model provider' },
        { status: 400 }
      );
    }

    const { output } = await generateText({
      model: modelInstance,
      system: system_prompt,
      output: Output.object({
        schema: refactoringOutputSchema,
      }),
      prompt: `Refactor this code and explain the changes:

${code}`,
    });

    return Response.json(output);
  } catch (error) {
    console.error('Refactoring error:', error);
    return Response.json(
      { error: 'Failed to process refactoring request' },
      { status: 500 }
    );
  }
}