import {
  apps as adminApps,
  credential as adminCredential,
  initializeApp as initializeAdminApp,
} from "firebase-admin";
import { Context } from "../context";
import {
  Repository,
  RepositoryConstructor,
  Result,
} from "./../../../shared/types/services/repositories";
import { getServiceAccount } from "../utils/firebase";
import { setCookie } from "nookies";

const FIVE_DAYS_IN_MS = 5 * 60 * 60 * 24 * 1000;

const getTokenPrefix = () =>
  process.env.FIREBASE_AUTH_EMULATOR_HOST
    ? `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}/`
    : 'https://'

export interface AuthRepository extends Repository {
  verifyIdToken(token: string): Promise<Result<{ uid: string; token: string }>>;
  signIn(ctx: Parameters<typeof setCookie>[0], token: string): Promise<Result>;
}

export const auth: RepositoryConstructor<Context, AuthRepository> = (
  context
) => {
  const serviceAccount = getServiceAccount(context);
  const admin =
    adminApps[0] ||
    initializeAdminApp({
      credential: adminCredential.cert(serviceAccount),
    });

  const auth = admin.auth();

  // Tokenの有効期限
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5日

  return {
    async verifyIdToken(token) {
      const decodedToken = await auth.verifyIdToken(token);
      const { uid } = decodedToken;
      return {
        success: true,
        data: { uid, token },
      };
    },
    async signIn(ctx, token) {
      const decodedToken = await auth.verifyIdToken(token);
      const customToken = await auth.createCustomToken(decodedToken.uid);

      const refreshTokenEndpoint = `${getTokenPrefix()}identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY}`;

      const refreshTokenResponse = await fetch(refreshTokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: customToken,
          returnSecureToken: true,
        }),
      });

      const refreshTokenJSON = await refreshTokenResponse.json();
      const { idToken, refreshToken } = refreshTokenJSON;

      const options = {
        name: 'ExampleApp',
        keys: [
          process.env.COOKIE_SECRET_CURRENT,
          process.env.COOKIE_SECRET_PREVIOUS,
        ],
        httpOnly: true,
        maxAge: FIVE_DAYS_IN_MS,
        overwrite: true,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'true',
        signed: true,
      }

      setCookie(
        ctx,
        `${'ExampleApp'}.AuthUser`,
        JSON.stringify({
          idToken,
          refreshToken,
        }),
        options
      );

      return {
        success: true,
      };
    },
    // async signOut() {
      // const cookies = nookies.get(context);
      // const session = cookies.session || "";
      // await auth.revokeRefreshTokens(session);
      // destroyCookie({ res: context }, "session", { path: "/" });
      // return {
      //   success: true,
      // };
    // },
  };
};
