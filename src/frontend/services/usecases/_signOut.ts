import { Usecase } from "../../../shared/types/services/usecase";
import { Context } from "../context";

export const signOut = (
  context: Readonly<Context>
): Usecase<boolean, void> => {
  const { auth: AuthRepository } = context.repositories;
  return {
    async invoke() {
      return await AuthRepository.signOut();
    },
  };
};
