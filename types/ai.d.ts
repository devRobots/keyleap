export type AIResponse = {
    content: string | null;
    finishReason?: string;
    usage?: { promptTokens: number; completionTokens: number; totalTokens: number };
}