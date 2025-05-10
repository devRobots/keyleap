import { getFirebaseAdmin } from '@/lib/firebase';
import { ChatDocument, ChatMessage } from '@/types/chat';

const db = getFirebaseAdmin().firestore();
const chatCollection = db.collection('chats');

/**
 * Obtiene el documento de chat completo para un usuario específico.
 * Si el documento no existe, retorna un documento nuevo.
 * 
 * @param userId - ID del usuario.
 * @returns Documento de chat completo para el usuario.
 */
export async function getChat(userId: string): Promise<ChatDocument> {
  const docSnapshot = await chatCollection.doc(userId).get();
  if (!docSnapshot.exists) return { goalAchieved: false, messages: [] };
  return docSnapshot.data() as ChatDocument;
}

/**
 * Agrega un mensaje a la conversación y retorna el documento de chat completo.
 * Si la conversación no existe, la crea.
 * 
 * @param userId - ID del usuario.
 * @param message - Mensaje a guardar.
 * @returns Documento de chat completo para el usuario.
 */
export async function pushMessage(
  userId: string,
  message: ChatMessage
): Promise<ChatDocument> {
  const chat = await getChat(userId);
  chat.messages.push(message);
  return await chatCollection.doc(userId).set(chat).then(() => chat); 
}
