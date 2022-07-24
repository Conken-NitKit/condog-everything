import { FirebaseOptions } from "firebase/app";
import { Context } from "../context";

export const getFirebaseOptions = (
  context: Readonly<Context>
): FirebaseOptions => {
  return {
    apiKey: context.config.firebase.apiKey,
    authDomain: context.config.firebase.authDomain,
    projectId: context.config.firebase.projectId,
    storageBucket: context.config.firebase.storageBucket,
    messagingSenderId: context.config.firebase.messagingSenderId,
    appId: context.config.firebase.appId,
    measurementId: context.config.firebase.measurementId,
  };
};
