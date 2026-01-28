'use client'; // Обязательно! Без этого не будет работать useEffect и useState
    
import { useState, useEffect } from 'react';

/**
 * Client Side Rendering (CSR)
 * Данные запрашиваются при каждом визите.
 */
export default function CSRPage() {
  const [data, setData] = useState<{ title: string } | null>(null);
  const [loading, setLoading] = useState(true);

  console.log('1. Тело функции (Render)'); // Увидишь и в Терминале (сервер), и в Консоли (браузер)

  useEffect(() => {
    console.log('2. Эффект (Mount)'); // Увидишь ТОЛЬКО в Консоли браузера
    
    // Фетчинг происходит ПОСЛЕ того, как компонент появился в браузере
    fetch('https://jsonplaceholder.typicode.com/posts/4')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка на клиенте (традиционный CSR)...</p>;

  return (
    <div>
      <h1>CSR Page</h1>
      <p>Этот заголовок пришел в HTML, а данные ниже — нет.</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}