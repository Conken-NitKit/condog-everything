import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import { redirectActions, RedirectAction } from "../redirects";
import { getFirebaseAdminAuth } from "./firebaseAdmin";

type Options = {
  whenAuthed?: RedirectAction;
  whenUnauthed?: RedirectAction;
  appPageURL?: string;
  signInPageURL?: string;
};

export const withAuthUserSSR: (
  options?: Options,
  callBack?: (
    ctx: Parameters<GetServerSideProps>[0],
    user?: DecodedIdToken
  ) => ReturnType<GetServerSideProps>
) => GetServerSideProps =
  (
    {
      whenAuthed = redirectActions.NO_REDIRECT,
      whenUnauthed = redirectActions.NO_REDIRECT,
      appPageURL = null,
      signInPageURL = null,
    } = {},
    callBack
  ) =>
  async (ctx) => {
    const cookies = nookies.get(ctx);
    const session = cookies.session || "";

    const user = await getFirebaseAdminAuth()
      .verifySessionCookie(session, true)
      .catch(() => null);

    if (!user) {
      switch (whenUnauthed) {
        case redirectActions.NO_REDIRECT:
          if (callBack) {
            return callBack(ctx);
          }
          return {
            props: {
              user,
            },
          };
        case redirectActions.REDIRECT_TO_SIGN_IN:
          if (!signInPageURL) {
            return {
              notFound: true,
            };
          }
          return {
            redirect: {
              destination: signInPageURL,
              permanent: false,
            },
          };
        case redirectActions.REDIRECT_TO_APP:
          if (!appPageURL) {
            return {
              notFound: true,
            };
          }
          return {
            redirect: {
              destination: appPageURL,
              permanent: false,
            },
          };
      }
    }

    switch (whenAuthed) {
      case redirectActions.NO_REDIRECT:
        if (callBack) {
          return callBack(ctx, user);
        }
        return {
          props: {
            user,
          },
        };
      case redirectActions.REDIRECT_TO_SIGN_IN:
        if (!signInPageURL) {
          return {
            notFound: true,
          };
        }
        return {
          redirect: {
            destination: signInPageURL,
            permanent: false,
          },
        };
      case redirectActions.REDIRECT_TO_APP:
        if (!appPageURL) {
          return {
            notFound: true,
          };
        }
        return {
          redirect: {
            destination: appPageURL,
            permanent: false,
          },
        };
    }
  };
