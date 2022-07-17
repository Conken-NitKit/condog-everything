/**
 * @description ログアウトさせる
 */
 export const logout = async () => {
  // セッションCookieを削除するため、Firebase SDKでなくREST APIでログアウトさせる
  await fetch("/api/sessionLogout", { method: "POST" });
};
