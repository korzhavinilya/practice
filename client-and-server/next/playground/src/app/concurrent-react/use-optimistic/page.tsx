// Это Server Component по умолчанию
import { getMessages } from './actions';
import MessagesClient from './MessagesClient'; // наш клиентский компонент

export default async function MessagesPage() {
  // 1. Прямой вызов функции получения данных на сервере.
  // Никаких fetch() к самому себе!
  const messages = await getMessages();

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      {/* 2. Передаем данные из БД в клиентский компонент как начальное состояние */}
      <MessagesClient initialMessages={messages} />
    </main>
  );
}
