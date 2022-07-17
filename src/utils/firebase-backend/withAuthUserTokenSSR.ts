import { GetServerSidePropsResult, GetServerSideProps } from "next";
import nookies, { parseCookies } from "nookies";
import { redirectActions, RedirectAction } from "../redirects";
import { getFirebaseAdminAuth } from "./firebaseAdmin";
import { verifyIdToken } from "./verifyIdToken";

type Options = {
  whenAuthed?: RedirectAction;
  whenUnauthed?: RedirectAction;
  appPageURL?: string;
  signInPageURL?: string;
  useToken?: boolean;
};

export const withAuthUserTokenSSR: (options: Options) => GetServerSideProps =
  ({
    whenAuthed = redirectActions.NO_REDIRECT,
    whenUnauthed = redirectActions.NO_REDIRECT,
    appPageURL = null,
    signInPageURL = null,
  } = {}) =>
  async (ctx) => {
    const cookies = nookies.get(ctx);
    const session = cookies.session || "";

    const user = await getFirebaseAdminAuth()
      .verifySessionCookie(session, true)
      .catch(() => null);

    if (!user) {
      switch (whenUnauthed) {
        case redirectActions.NO_REDIRECT:
          return {
            props: {
              user: null,
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
      default:
        return {
          props: {
            user,
          },
        };
    }
  };
