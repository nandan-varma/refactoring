import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { models } from '@/lib/models';
import { DEFAULT_MODEL_ID } from '@/lib/config/app';
import {
  HTTP_STATUS,
  REQUEST_LIMITS,
} from '@/lib/config/constants';
import { getSystemPrompt } from '@/lib/prompt';

const modelIds = models.map((m) => m.id);

const messageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
});

const requestSchema = z.object({
  messages: z.array(messageSchema).min(1, 'At least one message is required'),
  model: z.enum(modelIds as [string, ...string[]]).optional().default(DEFAULT_MODEL_ID),
});

export async function POST(req: Request) {
  try {
    // Check content length header for early rejection
    const contentLength = parseInt(req.headers.get('content-length') || '0', 10);
    if (contentLength > REQUEST_LIMITS.MAX_CODE_LENGTH * 2) {
      return Response.json(
        { error: 'Request body too large' },
        { status: HTTP_STATUS.PAYLOAD_TOO_LARGE }
      );
    }

    const body = await req.json();
    const { messages, model } = requestSchema.parse(body);

    // Validate code length in messages
    const totalCodeLength = messages.reduce((acc, msg) => acc + msg.content.length, 0);
    if (totalCodeLength > REQUEST_LIMITS.MAX_CODE_LENGTH) {
      return Response.json(
        { error: `Code is too long. Maximum length is ${REQUEST_LIMITS.MAX_CODE_LENGTH} characters.` },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    // Convert to UIMessage format expected by AI SDK
    const uiMessages: UIMessage[] = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
      id: crypto.randomUUID(),
      parts: [{ type: 'text', text: msg.content }],
    }));

    console.log('Refactor request received with model:', model);

    const result = streamText({
      model: google(model),
      system: getSystemPrompt(),
      messages: await convertToModelMessages(uiMessages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Refactoring error:', error);

    if (error instanceof z.ZodError) {
      return Response.json(
        { error: 'Invalid request format', details: error.issues },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    return Response.json(
      { error: 'Failed to process refactoring request' },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
