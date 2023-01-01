import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import passport from 'passport';
import { lineStrategy } from '../../../lib/passport';

passport.use('line', lineStrategy);

const cors = Cors({
  methods: ['GET', 'HEAD'],
});

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
  .get((req, res) => {
    const fn = passport.authenticate('line');
    const result = fn(req, res);
    console.log('result', result);
    return result;
  });
