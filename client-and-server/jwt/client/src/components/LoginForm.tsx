import { observer } from 'mobx-react-lite';
import { useContext, useRef } from 'react';
import { Context } from '..';

function LoginForm() {
  const { store } = useContext(Context);

  console.log({ store });

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleLogin() {
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    store.login(email, password);
  }

  function handleRegistration() {
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    store.registration(email, password);
  }

  return (
    <div>
      <input ref={emailRef} type="text" placeholder="Email" />
      <input ref={passwordRef} type="password" placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegistration}>Registration</button>
    </div>
  );
}

export default observer(LoginForm);
