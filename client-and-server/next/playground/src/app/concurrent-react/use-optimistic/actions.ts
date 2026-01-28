'use server';

import { revalidatePath } from 'next/cache';

// Имитация БД в памяти
const messages = [{ id: 1, text: 'Привет! Это реальное сообщение из БД.' }];

export async function getMessages() {
  return messages;
}

export async function sendMessageAction(formData: FormData) {
  const text = formData.get('message') as string;

  // Имитируем жесткую задержку сервера в 2 секунды
  await new Promise((res) => setTimeout(res, 2000));

  const newMessage = {
    id: Date.now(),
    text: `${text} (подтверждено сервером)`
  };
  messages.push(newMessage);

  // Инвалидируем кэш, чтобы клиент получил реальные данные
  revalidatePath('/concurrent-react/use-optimistic', 'page');
}
