import { LineStrategy } from '@condog-pkg/utils';

export const lineStrategy = new LineStrategy(
  {
    callbackURL: 'localhost:3000/api/line-auth/callback',
    scope: ['profile', 'openid', 'email'],
    botPrompt: 'normal',
    prompt: 'consent',
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);
    done(null, profile);
  }
);
