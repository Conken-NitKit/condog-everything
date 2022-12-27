import LineStrategy from '@condog-pkg/utils/passport/line/strategy';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import passport from 'passport';

const lineStrategy = new LineStrategy(
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

passport.use(lineStrategy);

export default nextConnect<NextApiRequest, NextApiResponse>()
  .use(passport.initialize())
  .post(async (req, res) => {
    console.log('req.body', req.body);
    res.statusCode = 200;
    res.json({ done: true });
  });
