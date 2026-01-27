import { useEffect } from 'react';

export default function LoginSuccess() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.close();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <div>You've logged in</div>;
}
