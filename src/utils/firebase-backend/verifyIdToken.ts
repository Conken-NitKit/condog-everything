import { getFirebaseAdminAuth } from "./firebaseAdmin"

/**
 * @description 認証トークンを検証する 
 */
 export const verifyIdToken = async (token: string) => {
  const auth = getFirebaseAdminAuth();
  const decodedToken = await auth.verifyIdToken(token);
  const { uid } = decodedToken;
  return { uid, token };
}
