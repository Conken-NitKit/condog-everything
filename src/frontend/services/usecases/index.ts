import { Context } from "../context";
import { signOut } from "./_signOut";

export const builder = (context: Readonly<Context>) => {
  return {
    signOut: signOut(context),
  } as const;
}
