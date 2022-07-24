import { Context } from "../context";
import { verifyIdToken } from "./_verifyIdToken";

export const builder = (context: Readonly<Context>) => {
  return {
    verifyIdToken: verifyIdToken(context),
  } as const;
}
