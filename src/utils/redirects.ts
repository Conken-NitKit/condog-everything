export type RedirectAction = 'NO_REDIRECT' | 'REDIRECT_TO_SIGN_IN' | 'REDIRECT_TO_APP';

export const redirectActions: Record<RedirectAction, string> = {
  NO_REDIRECT: 'noRedirect',
  REDIRECT_TO_SIGN_IN: 'redirectToSignIn',
  REDIRECT_TO_APP: 'redirectToTop',
}
