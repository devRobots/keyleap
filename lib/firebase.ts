import admin from 'firebase-admin';

const ensureFirebaseAdminInitialized = () => {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

  if (!privateKey || !projectId || !clientEmail) {
    throw new Error('Missing required Firebase credentials in environment variables');
  }
  
  if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\n/g, '\n'),
        }),
      });
    } catch {
      throw new Error('Firebase Admin SDK initialization failed');
    }
  }
  return admin;
};

export const getFirebaseAdmin = () => ensureFirebaseAdminInitialized();
