import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { CookieNames, remove } from '../../../lib/coockie';

export default nextConnect<NextApiRequest, NextApiResponse>().post(
  async (_, res) => {
    remove(res, CookieNames.AUTH_TOKEN);
    res.writeHead(302, { Location: '/' });
    res.end();
  }
);
