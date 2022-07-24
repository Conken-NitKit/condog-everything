import { Context } from "../context";
import { auth } from "./_auth";

export const builder = (context: Readonly<Context>) => {
  return {
    auth: auth(context),
  } as const;
};
