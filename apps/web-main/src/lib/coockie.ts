import { type NextApiResponse } from 'next';

export const cookieName = {
  authToken: 'auth_token',
  clientId: 'client_id',
  sessionId: 'session_id',
} as const;

export type CookieName = typeof cookieName[keyof typeof cookieName];

export type CookieNames = { [key in CookieName]: string };

export type CookieSetting = {
  name: CookieName;
  expires: number;
  maxAge?: number;
  path: string;
  secure: boolean;
  httpOnly: boolean;
  sameSite: 'strict' | 'lax' | 'none';
};

const getCookieSetting = (name: CookieName) => {
  const cookieSettings: Record<CookieName, CookieSetting> = {
    [cookieName.authToken]: {
      name: cookieName.authToken,
      expires: 60 * 60 * 24 * 30 * 1000,
      path: '/',
      secure: true,
      httpOnly: false,
      sameSite: 'lax',
    },
    [cookieName.clientId]: {
      name: cookieName.clientId,
      expires: 60 * 60 * 24 * 30 * 1000,
      path: '/',
      secure: true,
      httpOnly: false,
      sameSite: 'lax',
    },
    [cookieName.sessionId]: {
      name: cookieName.sessionId,
      expires: 60 * 60 * 1000,
      maxAge: 60 * 60,
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
    },
  };

  return cookieSettings[name];
};

export const set = (
  res: NextApiResponse,
  name: CookieName,
  {
    value = '',
    now = Date.now(),
    domain,
    remove,
  }: { value?: string; now?: number; domain?: string; remove?: true } = {}
) => {
  const setting = getCookieSetting(name);

  const expires = new Date(now + setting.expires);
  const values = [
    `${setting.name}=${value}`,
    `path=${setting.path}`,
    `expires=${expires.toUTCString()}`,
    `samesite=${setting.sameSite}`,
  ];

  domain && values.push(`domain=${domain}`);
  setting.httpOnly && values.push('httponly');
  setting.secure && values.push('secure');
  if (!remove) {
    setting.maxAge && values.push(`max-age=${setting.maxAge}`);
  }
  remove && values.push('max-age=0');
  res.setHeader('set-cookie', values.join(';'));
};

export const remove = (
  res: NextApiResponse,
  name: CookieName,
  { domain }: { domain?: string } = {}
) => {
  set(res, name, { domain, remove: true });
};
