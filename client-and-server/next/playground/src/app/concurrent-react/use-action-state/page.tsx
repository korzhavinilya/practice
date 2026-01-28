'use client';
import { useActionState } from 'react';
import { createUser } from './actions';

export default function SignupForm() {
  // state — результат работы экшена
  // action — обертка, которую мы вешаем на форму
  // isPending — состояние транзакции (идет ли запрос)
  const [state, action, isPending] = useActionState(createUser, {
    message: ''
  });

  return (
    <form action={action}>
      <input name="email" type="email" />

      <button disabled={isPending}>
        {isPending ? 'Loading...' : 'Create User'}
      </button>

      {state?.message ? <p>{state.message}</p> : <p>User not created</p>}
    </form>
  );
}
