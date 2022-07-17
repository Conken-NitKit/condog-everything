import { signInWithEmailAndPassword as _signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from "./firebase";

/**
 * @description メールアドレスとパスワードでログイン
 */
export const signInWithEmailAndPassword = async (email: string, password: string) => {
  const auth = getFirebaseAuth();
  const result = await _signInWithEmailAndPassword(auth, email, password);

  // セッションIDを作成するためのIDを作成する
  const id = await result.user.getIdToken();

  // Cookieにセッションを付与するようにAPIを投げる
  await fetch("/api/session", { method: "POST", body: JSON.stringify({ id }) });
};
