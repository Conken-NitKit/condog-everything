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

export interface AuthRepository extends Repository {
  verifyIdToken(token: string): Promise<Result<{ uid: string; token: string }>>;
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

  return {
    async verifyIdToken(token) {
      const decodedToken = await auth.verifyIdToken(token);
      const { uid } = decodedToken;
      return {
        success: true,
        data: { uid, token },
      };
    },
  };
};
