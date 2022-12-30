import LineStrategy from '@condog-pkg/utils/passport/line/strategy';

export const lineStrategy = new LineStrategy(
  {
    authorizationURL: '',
    tokenURL: '',
    clientID: '',
    clientSecret: '',
    callbackURL: '',
    scope: ['profile', 'openid'],
    botPrompt: 'normal',
    prompt: 'consent',
    uiLocales: 'en',
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);
    done(null, profile);
  }
);
