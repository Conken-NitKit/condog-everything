import { LineStrategy } from '@condog-pkg/utils';

export const lineStrategy = new LineStrategy(
  {
    channelID: 'XXX',
    channelSecret: 'XXX',
    callbackURL: 'localhost:3000/api/line-auth/callback',
    scope: ['profile', 'openid', 'email'],
    botPrompt: 'normal',
    prompt: 'consent',
    customHeaders: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'accept-encoding': 'gzip, deflate, br',
      'accecpt-language': 'ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7',
    },
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);
    done(null, profile);
  }
);
