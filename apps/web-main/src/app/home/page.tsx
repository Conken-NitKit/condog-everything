import { use, useCallback } from 'react';
import { lineAuthSdk } from '../../lib/LineAuthSdk';

type User = {
  id: number;
  login: string;
};

const fetchUsers: () => Promise<User[]> = async () => {
  const res = await fetch('https://api.github.com/users');
  return res.json();
};

export default function Page() {
  const users = use(fetchUsers());
  console.log(users);

  const handleButtonClick = useCallback(() => {
    lineAuthSdk.signout();
  }, []);

  return (
    <div>
      <h1>GitHub Users!</h1>
      <div>
        {users.map((user) => {
          return (
            <div key={user.id}>
              {user.id}: {user.login}
            </div>
          );
        })}
      </div>
      <button onClick={handleButtonClick}>signout</button>
    </div>
  );
}
