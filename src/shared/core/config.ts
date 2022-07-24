// NOTE: クライアントサイドで参照可能な環境変数のみ記載: process.env.NEXT_PUBLIC_XXXXX
// NOTE: サーバーサイドでからしか参照できない 環境変数(process.env.XXXXX) は src/backend/core/secretConfig.ts で定義
export const config = {
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  },
} as const;

export type Config = typeof config;
