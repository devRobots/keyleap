import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const ALGORITHM = 'aes-256-gcm';
const ENCRYPTED_FILE_NAME = 'prompt.enc.json';
const encryptedFilePath = path.join(process.cwd(), ENCRYPTED_FILE_NAME);

let decryptedContentCache: string | null = null;

interface EncryptedPayload {
  iv: string;
  authTag: string;
  encryptedContent: string;
}

async function getDecryptionKey(): Promise<Buffer> {
    const encryptionKeyBase64 = process.env.PROMPT_ENCRYPTION_KEY!;
    return Buffer.from(encryptionKeyBase64, 'base64');
}

export async function getPrompt(): Promise<string | null> {
    if (decryptedContentCache) {
        return decryptedContentCache;
    }

    try {
        const key = await getDecryptionKey();
        
        const fileBuffer = await fs.readFile(encryptedFilePath);
        const encryptedData = JSON.parse(fileBuffer.toString('utf-8')) as EncryptedPayload;

        const iv = Buffer.from(encryptedData.iv, 'hex');
        const authTag = Buffer.from(encryptedData.authTag, 'hex');
        const encryptedContentBuffer = Buffer.from(encryptedData.encryptedContent, 'hex');

        const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
        decipher.setAuthTag(authTag);

        const decryptedBuffer = Buffer.concat([decipher.update(encryptedContentBuffer), decipher.final()]);
        
        decryptedContentCache = decryptedBuffer.toString('utf-8');
        return decryptedContentCache;
    } catch {
        return null; 
    }
}