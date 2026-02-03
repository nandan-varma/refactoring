import { streamText, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { GoogleGenerativeAIModelId } from '@ai-sdk/google/internal';
import { z } from 'zod';
import { models, isValidModelId } from '@/lib/models';
import { DEFAULT_MODEL_ID } from '@/lib/constants';
import { system_prompt } from '@/lib/prompt';

const modelIds = models.map(m => m.id);

const requestSchema = z.object({
  messages: z.array(z.any()),
  model: z.enum(modelIds).optional().default(DEFAULT_MODEL_ID),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, model } = requestSchema.parse(body);

    if (!isValidModelId(model)) {
      return Response.json(
        { error: 'Invalid model ID' },
        { status: 400 }
      );
    }

    const result = streamText({
      model: google(model as GoogleGenerativeAIModelId),
      system: system_prompt,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Refactoring error:', error);
    return Response.json(
      { error: 'Failed to process refactoring request' },
      { status: 500 }
    );
  }
}