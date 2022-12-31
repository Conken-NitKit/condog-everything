'use client';

import { useCallback } from 'react';
import { lineAuthSdk } from '../lib/LineAuthSdk';

export default function Page() {
  const handleButtonClick = useCallback(() => {
    console.log('signin');
    lineAuthSdk.signin();
  }, []);

  return (
    <div>
      <h1>GitHub Users!</h1>
      <button onClick={handleButtonClick}>signin</button>
    </div>
  );
}
