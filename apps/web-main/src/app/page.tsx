'use client';

import Link from 'next/link';
// import Link from 'next/link';
import qs from 'qs';
import { useMemo } from 'react';

export default function Page() {
  const navigateLoginUrl = useMemo(() => {
    const query = qs.stringify({
      response_type: 'code',
      client_id: '1657782125',
      redirect_uri: 'http://localhost:3000/api/line-auth/callback',
      state: 'hoge', // TODO: must generate random string
      scope: 'profile',
      botPrompt: 'aggressive',
    });
    const returnUri = `https://access.line.me/oauth2/v2.1/authorize?${query}`;
    const loginChannelId = '1657782125';
    const loginState = 'hoge'; // TODO: must generate random string

    return `https://access.line.me/oauth2/v2.1/login?returnUri=${encodeURIComponent(
      returnUri
    )}&loginChannelId=${loginChannelId}&loginState=${loginState}`;
  }, []);

  return (
    <div>
      <h1>GitHub Users!</h1>
      {/* <div onClick={navigateLogin}>XXX</div> */}
      <Link href={navigateLoginUrl}>Sign in</Link>
    </div>
  );
}

// /oauth2/v2.1/authorize/consent?response_type=code&client_id=1655087825&redirect_uri=https%3A%2F%2Fmarouge.jp%2Fc%2Fregister%2Fline%3FredirectUrl%3Dhttps%3A%2F%2Fmarouge.jp%2F&state=238568bde56a4567a730927b5d2e2e0f&scope=profile+openid+email&bot_prompt=aggressive
// /oauth2/v2.1/authorize?response_type=code&client_id=1655087825&redirect_uri=https://marouge.jp/c/register/line?redirectUrl=https://marouge.jp/&state=238568bde56a4567a730927b5d2e2e0f&scope=profile openid email&bot_prompt=aggressive
// /oauth2/v2.1/login?returnUri=/oauth2/v2.1/authorize/consent?response_type=code&client_id=1655087825&redirect_uri=https://marouge.jp/c/register/line?redirectUrl=https://marouge.jp/&state=238568bde56a4567a730927b5d2e2e0f&scope=profile openid email&bot_prompt=aggressive&loginChannelId=1655087825&loginState=Jd6gxNI7aquydGBIfc7LSe
// /oauth2/v2.1/login?returnUri=%2Foauth2%2Fv2.1%2Fauthorize%2Fconsent%3Fresponse_type%3Dcode%26client_id%3D1655087825%26redirect_uri%3Dhttps%253A%252F%252Fmarouge.jp%252Fc%252Fregister%252Fline%253FredirectUrl%253Dhttps%253A%252F%252Fmarouge.jp%252F%26state%3D238568bde56a4567a730927b5d2e2e0f%26scope%3Dprofile%2Bopenid%2Bemail%26bot_prompt%3Daggressive&loginChannelId=1655087825&loginState=Jd6gxNI7aquydGBIfc7LSe
