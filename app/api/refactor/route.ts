import { generateText, Output } from 'ai';
import { google } from '@ai-sdk/google';
import { GoogleGenerativeAIModelId } from '@ai-sdk/google/internal';
import { z } from 'zod';
import { models, isValidModelId } from '@/lib/models';
import { DEFAULT_MODEL_ID } from '@/lib/constants';
import { system_prompt } from '@/lib/prompt';

const modelIds = models.map(m => m.id);

const requestSchema = z.object({
  code: z.string(),
  model: z.enum(modelIds).optional().default(DEFAULT_MODEL_ID),
});

const refactoringOutputSchema = z.object({
  refactoredCode: z.string().describe('The refactored code'),
  explanation: z.string().describe('A brief explanation of the refactoring changes made and why they improve the code'),
});

export type RefactoringOutput = z.infer<typeof refactoringOutputSchema>;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, model } = requestSchema.parse(body);

    if (!isValidModelId(model)) {
      return Response.json(
        { error: 'Invalid model ID' },
        { status: 400 }
      );
    }

    const { output } = await generateText({
      model: google(model as GoogleGenerativeAIModelId),
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