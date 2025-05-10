import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import type { AIResponse } from '@/types/ai';
import type { ChatMessage } from '@/types/chat';

/**
 * Obtiene una respuesta de texto del modelo de IA configurado.
 */
export async function getAIResponse(messages: ChatMessage[]): Promise<AIResponse> {
  const model = google('gemini-2.0-flash');
  const { text, finishReason, usage } = await generateText({ model, messages });
  return { content: text?.trim() || null, finishReason, usage };
}
