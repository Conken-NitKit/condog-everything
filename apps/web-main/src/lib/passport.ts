import { LineStrategy } from '@condog-pkg/utils';

export const lineStrategy = new LineStrategy(
  {
    channelID: '1657782125',
    channelSecret: 'b903e5f55b32c0c871ace5117c010119',
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
