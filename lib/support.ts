import type { ChatDocument } from '@/types/chat';

export async function fetchChat(): Promise<ChatDocument | null> {
    try {
        const response = await fetch('/api/chat', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) return null;
        return await response.json();
    } catch (error: any) {
        return null;
    }
}

export async function pushMessage(message: string): Promise<ChatDocument | null> {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) throw new Error('Failed to push message');
        return await response.json();
    } catch (error: any) {
        return null;
    }
}
