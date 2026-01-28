'use client';

import { useState, useDeferredValue, memo } from 'react';

// Изолируем тяжелый компонент
const HeavyList = memo(({ query }: { query: string }) => {
  console.log('HeavyList', query);
  // Мы оставляем цикл для имитации нагрузки на CPU.
  // Компилятор пропустит это, так как здесь нет вызова "запрещенных" impure функций.
  const items = [];
  for (let i = 0; i < 5000; i++) {
    // Искусственная задержка
    let j = 0;
    while (j < 10000) {
      j++;
    }

    if (i.toString().includes(query) || !query) {
      items.push(
        <li key={i} className="p-1 border-b">
          Элемент #{i} для поиска: {query}
        </li>
      );
    }
  }

  return (
    <ul className="mt-4 border rounded max-h-60 overflow-auto bg-white text-black">
      {items}
    </ul>
  );
});

HeavyList.displayName = 'HeavyList';

export default function DeferredPage() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);
  const isStale = text !== deferredText;

  return (
    <div className="p-10 max-w-xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-black">
        useDeferredValue Demo
      </h1>

      <div className="flex flex-col gap-2">
        <label className="text-gray-700">
          Печатай быстро цифры (например, {'"12"'}):
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border-2 p-2 rounded text-black focus:border-blue-500 outline-none shadow-sm"
          placeholder="Нагрузи процессор..."
        />

        <div className="h-6">
          {isStale && (
            <span className="text-orange-500 animate-pulse">
              ⏳ React рендерит список в фоне...
            </span>
          )}
        </div>
      </div>

      <div
        className="transition-opacity duration-300"
        style={{
          opacity: isStale ? 0.3 : 1,
          filter: isStale ? 'blur(1px)' : 'none'
        }}
      >
        <HeavyList query={deferredText} />
      </div>
    </div>
  );
}
