'use client';
import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus(); // Магический хук React 19

  return (
    <button
      disabled={pending}
      className="bg-blue-500 disabled:bg-gray-400 p-2 text-white"
    >
      {pending ? 'Сохранение...' : 'Создать'}
    </button>
  );
}
