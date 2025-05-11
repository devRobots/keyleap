import { getFirebaseAdmin } from '@/lib/firebase';
import { UserDB } from '@/types/user';

const db = getFirebaseAdmin().firestore();
const usersCollection = db.collection('users');

/**
 * Obtiene el documento de usuario completo para un usuario específico.
 * Si el documento no existe, retorna un documento nuevo.
 * 
 * @param userId - ID del usuario.
 * @returns Documento de usuario.
 */
export async function getUser(
    userId: string
): Promise<UserDB> {
    const user = await usersCollection.doc(userId).get();
    return user.data() as UserDB;
}

/**
 * Crea un nuevo documento de usuario.
 * 
 * @param userId - ID del usuario.
 * @param username - Nombre de usuario.
 * @param imageUrl - URL de la imagen del usuario.
 */
export async function createUser(
    userId: string,
    username: string,
    imageUrl: string
) {
    await usersCollection.doc(userId).set({
        username,
        imageUrl
    });
}

/**
 * Obtiene el número total de usuarios en la colección.
 * 
 * @returns Número total de usuarios.
 */
export async function getUserCount(): Promise<number> {
    const count = await usersCollection.count().get();
    return count.data().count;
}