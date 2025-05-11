import fs from 'fs';
import path from 'path';

import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

import { getAIResponse } from '@/services/ai';
import { getChat, pushMessage } from '@/services/support';
import { ApiResponse, ChatDocument, ChatMessage, ChatRequestBody } from '@/types/chat';

export async function GET(): Promise<NextResponse<ChatDocument | ApiResponse>> {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const chat = await getChat(userId);
        return NextResponse.json(chat, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function POST(request: NextRequest): Promise<NextResponse<ChatDocument | ApiResponse>> {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const body = (await request.json()) as Partial<ChatRequestBody>;
        const { message } = body;

        if (!message || typeof message !== 'string' || message.trim() === '') {
            return NextResponse.json({ error: 'Valid message is required' }, { status: 400 });
        }

        const chat = await pushMessage(userId, { role: 'user', content: message });

        const prompt = fs.readFileSync(path.resolve(process.env.PROMPT_FILE_PATH!), 'utf-8');
        const systemPromptMessage: ChatMessage = { role: 'system', content: prompt };
        const messages = [systemPromptMessage, ...chat.messages];
        const result = await getAIResponse(messages);
        const chatUpdated = await pushMessage(userId, { role: 'assistant', content: result.content! });

        return NextResponse.json(chatUpdated, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
