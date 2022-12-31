import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import passport from 'passport';
import { CookieNames, set } from '../../../lib/coockie';
import { lineStrategy } from '../../../lib/passport';

passport.use('line', lineStrategy);

export default nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(501).json({
      error: `Sorry something Happened! ${error.message}`,
      req: JSON.stringify(req.body),
      res: JSON.stringify(res),
    });
  },
})
  .use(passport.initialize())
  .post(
    // (req, res) => {
    //   console.log('req.body', req.body);
    //   res.statusCode = 200;
    //   res.json({ done: true });
    // }
    async (req, res, next) => {
      console.log('req.body', req.body);

      const fn = await passport.authorize(
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

      console.log(fn);
      return fn(req, res, next);
    }
  );
