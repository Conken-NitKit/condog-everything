import { ServiceAccount } from "firebase-admin";
import { Context } from "../context";

export const getServiceAccount = (
  context: Readonly<Context>
): ServiceAccount => {
  const { projectId, clientEmail, privateKey } =
    context.secretConfig.firebaseAdmin;

  return {
    projectId,
    clientEmail,
    privateKey,
  };
};
