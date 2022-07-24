import { Usecase } from "../../../shared/types/services/usecase";
import { Context } from "../context";

export const verifyIdToken = (
  context: Readonly<Context>
): Usecase<{ uid: string; token: string }, string> => {
  const { auth: AuthRepository } = context.repositories;
  return {
    async invoke(token) {
      return await AuthRepository.verifyIdToken(token);
    },
  };
};
