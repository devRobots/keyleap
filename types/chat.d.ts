/**
 * Define la estructura de un solo mensaje dentro del chat.
 */
export type ChatMessage = {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

/**
 * Define la estructura esperada del cuerpo de la solicitud POST para el endpoint de chat.
 */
export type ChatRequestBody = {
    message: string;
}

/**
 * Define la estructura de un documento de chat como se almacena en Firestore.
 */
export type ChatDocument = {
    goalAchieved: boolean;
    messages: ChatMessage[];
}

// Tipos para las respuestas del API
export type ApiResponse = {
    error?: string;
    response?: ChatMessage;
    success?: boolean = false;
}
