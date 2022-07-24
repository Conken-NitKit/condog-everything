import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { context } from "../services/context";

export const verifyHandler = (callback: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (!(req.headers && req.headers.authorization)) {
      return res
        .status(400)
        .json({ error: "Missing Authorization header value" });
    }
    const token = req.headers.authorization;

    try {
      await context.usecases.verifyIdToken.invoke(token);
      return callback(req, res);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return res.status(401).json({ error: "Invalid token" });
    }
  };
};
