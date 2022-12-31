import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import passport from 'passport';
import { CookieNames, set } from '../../../lib/coockie';
import { lineStrategy } from '../../../lib/passport';

passport.use('line', lineStrategy);

export default nextConnect<NextApiRequest, NextApiResponse>()
  .use(passport.initialize())
  .get(async (req, res) => {
    const authorizeFn = passport.authorize(
      'line',
      {
        failureRedirect: '/',
      },
      (req, res) => {
        console.log('req.body', req.body);
        set(res, CookieNames.AUTH_TOKEN, { value: JSON.stringify(req.body) });
        res.statusCode = 200;
        res.json({ done: true });
      }
    );

    console.log(authorizeFn);
    authorizeFn(req, res);
  });
