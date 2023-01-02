import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import passport from 'passport';
import { CookieNames, set } from '../../../lib/coockie';
import qs from 'querystring';
import { lineStrategy } from '../../../lib/passport';

passport.use('line', lineStrategy);

// export default nextConnect<NextApiRequest, NextApiResponse>({
//   onError(error, req, res) {
//     res.status(501).json({
//       error: `Sorry something Happened! ${error.message}`,
//       req: JSON.stringify(req.body),
//       res: JSON.stringify(res),
//     });
//   },
// })
//   .use(passport.initialize())
//   .get((req, res, ...args) => {
//     const fn = passport.authenticate('line');
//     return fn(req, res, ...args);
//   });

export default nextConnect<NextApiRequest, NextApiResponse>().get((_, res) => {
  const query = qs.stringify({
    response_type: 'code',
    client_id: 'XXX',
    redirect_uri: 'http://localhost:3000/api/line-auth/callback',
    state: 'hoge', // TODO: must generate random string
    scope: 'profile',
    botPrompt: 'aggressive',
  });
  const returnUri = `https://access.line.me/oauth2/v2.1/authorize?${query}`;
  const loginChannelId = 'XXX';
  const loginState = 'hoge'; // TODO: must generate random string

  const loginUrl = `https://access.line.me/oauth2/v2.1/login?returnUri=${encodeURIComponent(
    returnUri
  )}&loginChannelId=${loginChannelId}&loginState=${loginState}`;
  res.redirect(loginUrl);
});
