// components/SubmitInput.tsx
'use client';
import { useFormStatus } from 'react-dom';

export function SubmitInput() {
  const { pending } = useFormStatus();

  return (
    <input
      name="title"
      className="border border-gray-300 rounded-md p-2"
      placeholder="Название поста..."
      disabled={pending}
      required
    />
  );
}
