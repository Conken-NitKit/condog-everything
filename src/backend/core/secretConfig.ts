// NOTE: サーバーサイドからしか参照できない環境変数のみ記載: process.env.XXXXX
// NOTE: クライアントサイドからも参照可能な 環境変数(process.env.NEXT_PUBLIC_XXXXX) は src/shared/core/config.ts で定義
export const secretConfig = {
  firebaseAdmin: {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: (process.env.FIREBASE_ADMIN_PRIVATE_KEY || "").replace(
      /\\n/g,
      "\n"
    ),
  },
} as const;

export type SecretConfig = typeof secretConfig;
