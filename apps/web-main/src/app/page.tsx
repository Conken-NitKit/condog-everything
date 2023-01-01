'use client';

import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <h1>GitHub Users!</h1>
      <Link href="api/line-auth/signin">Sign in</Link>
    </div>
  );
}
