export class LineAuthSdk {
  basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  signin = async () => {
    try {
      const res = await fetch(`${this.basePath}/signin`, {
        method: 'POST',
        body: JSON.stringify({}),
      });
      console.log(JSON.stringify(res), 'XXX');
      console.log(res);
      console.log(await res.json(), 'YYY');
      return res;
    } catch (e) {
      console.error(e);
      console.log(e);
      console.log(JSON.stringify(e), 'ZZZ');
    }
  };
  signout = async () => {
    const res = await fetch(`${this.basePath}/signout`);
    console.log(res);
    return res;
  };
}

export const lineAuthSdk = new LineAuthSdk('/api/line-auth');
