'use client';
import { useState, useTransition } from 'react';

export default function SearchList() {
  const items = Array.from({ length: 10000 }, (_, index) => `Item ${index}`);

  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('handleChange', value);

    // 1. Срочное обновление: инпут должен обновиться мгновенно
    setFilter(value);

    // 2. Несрочное обновление: фильтрация списка может подождать
    startTransition(() => {
      console.log('startTransition', value);
      const filtered = items.filter((item) => item.includes(value));
      setFilteredItems(filtered);
    });
  };

  return (
    <div>
      <input
        type="text"
        className="border border-gray-300 rounded-md p-2 w-full"
        onChange={handleChange}
        value={filter}
      />

      {/* isPending позволяет показать лоадер, пока фоновый рендер не готов */}
      {isPending && <p>Обновляем список...</p>}

      <ul style={{ opacity: isPending ? 0.5 : 1 }}>
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
