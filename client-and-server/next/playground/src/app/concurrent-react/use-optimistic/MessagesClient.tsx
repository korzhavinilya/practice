'use client';

import { useOptimistic, useRef } from 'react';
import { sendMessageAction } from './actions';

type Message = {
  id: number;
  text: string;
  sending?: boolean; // Флаг для визуализации "оптимистичности"
};

export default function MessagesClient({
  initialMessages
}: {
  initialMessages: Message[];
}) {
  const formRef = useRef<HTMLFormElement>(null);

  // 1. useOptimistic принимает:
  // - актуальное состояние из пропсов (то, что реально в БД)
  // - функцию обновления (как мы хотим изменить стейт временно)
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    initialMessages,
    (state, newMessageText: string) => [
      ...state,
      {
        id: Date.now(),
        text: newMessageText,
        sending: true // Помечаем, что это еще не подтверждено
      }
    ]
  );

  async function handleAction(formData: FormData) {
    const messageText = formData.get('message') as string;
    if (!messageText) return;

    formRef.current?.reset();

    // 2. МГНОВЕННО обновляем UI
    addOptimisticMessage(messageText);

    // 3. Отправляем реальный запрос на сервер
    await sendMessageAction(formData);
  }

  return (
    <div className="p-10 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Optimistic Chat</h1>

      <div className="space-y-2 mb-4">
        {optimisticMessages.map((m) => (
          <div
            key={m.id}
            className={`p-2 rounded-lg ${
              m.sending
                ? 'bg-gray-200 text-gray-500 italic'
                : 'bg-blue-500 text-white'
            }`}
          >
            {m.text} {m.sending && ' (отправка...)'}
          </div>
        ))}
      </div>

      <form ref={formRef} action={handleAction} className="flex gap-2">
        <input
          name="message"
          className="border p-2 flex-1 text-black"
          placeholder="Напиши что-нибудь..."
        />
        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Отправить
        </button>
      </form>
    </div>
  );
}
