import { getApps, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Context } from "../context";
import { Repository, RepositoryConstructor, Result } from "./index";
import { getFirebaseOptions } from "../_utils/firebase";

export interface AuthRepository extends Repository {
  signInWithEmailAndPassword(email: string, password: string): Promise<void>;
  signOut(): Promise<Result<boolean>>;
}

export const auth: RepositoryConstructor<AuthRepository> = (
  context: Readonly<Context>
) => {
  const options = getFirebaseOptions(context);
  const app = getApps()[0] || initializeApp(options);
  const auth = getAuth(app);

  return {
    async signInWithEmailAndPassword(email: string, password: string) {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // NOTE: セッションIDを作成するためのIDを作成する
      const id = await credential.user.getIdToken();

      // NOTE: Cookieにセッションを付与するようにAPIを投げる
      await fetch("/api/session", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
    },
    async signOut() {
      // NOTE: セッションCookieを削除するため、Firebase SDKでなくREST APIでログアウトさせる
      await fetch("/api/sessionLogout", { method: "POST" });
      return { success: true, data: true };
    },
  };
};
