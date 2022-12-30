import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import passport from 'passport';
import { cookieName, set } from '../../lib/coockie';
import { lineStrategy } from '../../lib/passport';

passport.use(lineStrategy);

export default nextConnect<NextApiRequest, NextApiResponse>()
  .use(passport.initialize())
  .post(async (req, res) => {
    console.log('req.body', req.body);
    set(res, cookieName.authToken, { value: 'authToken' });
    res.statusCode = 200;
    res.json({ done: true });
  });
