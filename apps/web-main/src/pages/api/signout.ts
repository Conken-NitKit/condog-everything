import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { cookieName, remove } from '../../lib/coockie';

export default nextConnect<NextApiRequest, NextApiResponse>().post(
  async (_, res) => {
    remove(res, cookieName.authToken);
    res.writeHead(302, { Location: '/' });
    res.end();
  }
);
