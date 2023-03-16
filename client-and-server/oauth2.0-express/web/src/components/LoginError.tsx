import { useEffect } from 'react';

export default function LoginError() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.close();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <div>Error signing in</div>;
}
