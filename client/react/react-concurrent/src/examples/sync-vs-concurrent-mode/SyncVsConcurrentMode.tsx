import { useState, useTransition } from "react";
import type { ChangeEvent } from "react";
import "./SyncVsConcurrentMode.css";

// --- ОБЩИЙ ВСПОМОГАТЕЛЬНЫЙ КОМПОНЕНТ ---

// Специально замедленный компонент элемента списка.
// Он блокирует Main Thread на ~0.2 мс при каждом рендере.
const SlowItem = ({ index, value }: { index: number; value: string }) => {
  // eslint-disable-next-line react-hooks/purity
  const startTime = Date.now();

  // Искусственная блокировка потока (симуляция тяжелого рендеринга)
  // Не делайте так в реальных проектах!
  // eslint-disable-next-line react-hooks/purity
  while (Date.now() - startTime < 0.2) {
    // Ждем 0.2 мс
  }

  return (
    <div className="slow-item">
      Item #{index} для запроса "{value}"
    </div>
  );
};

// Создаем массив из 5000 элементов для рендеринга
const itemsArray = Array.from({ length: 500 }).map((_, i) => i);

// --- КОМПОНЕНТ 1: БЕЗ CONCURRENT MODE (SYNC) ---

const SyncRendering = () => {
  const [text, setText] = useState("");
  const [listText, setListText] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // В дефолтном режиме оба setState синхронны и выполняются в одной задаче.
    setText(val);
    setListText(val); // Это вызовет тяжелый рендеринг 5000 элементов СИНХРОННО.
  };

  return (
    <div className="scenario">
      <h2>Сценарий 1: Синхронный рендеринг (Legacy)</h2>
      <p>
        Инпут будет "тупить" при быстром вводе текста, так как рендеринг списка
        блокирует всё.
      </p>

      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Печатайте быстро..."
      />

      <div className="list-container">
        {/* Рендерим тяжелый список */}
        {listText &&
          itemsArray.map((i) => (
            <SlowItem key={i} index={i} value={listText} />
          ))}
      </div>
    </div>
  );
};

// --- КОМПОНЕНТ 2: С CONCURRENT MODE (useTransition) ---

const ConcurrentRendering = () => {
  const [text, setText] = useState("");
  const [listText, setListText] = useState("");
  // Подключаем Concurrent режим через хук useTransition
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // 1. Срочное обновление (UI инпута): выполняется мгновенно
    setText(val);

    // 2. Не срочное обновление (Тяжелый список): помечаем переходом
    // React сможет прерывать рендеринг этого списка.
    startTransition(() => {
      setListText(val);
    });
  };

  return (
    <div className="scenario">
      <h2>Сценарий 2: Конкурентный рендеринг (useTransition)</h2>
      <p>
        Инпут останется отзывчивым. Список будет обновляться в фоне с задержкой.
      </p>

      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Печатайте быстро..."
      />

      {isPending && <div className="loader">Рендеринг списка в фоне...</div>}

      <div className={`list-container ${isPending ? "pending" : ""}`}>
        {/* Рендерим тот же тяжелый список */}
        {listText &&
          itemsArray.map((i) => (
            <SlowItem key={i} index={i} value={listText} />
          ))}
      </div>
    </div>
  );
};

// --- ГЛАВНОЕ ПРИЛОЖЕНИЕ ---

export default function SyncVsConcurrentMode() {
  const [scenario, setScenario] = useState<"sync" | "concurrent">("sync");

  return (
    <div className="App">
      <header>
        <h1>React 18: Sync vs Concurrent Performance</h1>
        <div className="controls">
          <button
            onClick={() => setScenario("sync")}
            className={scenario === "sync" ? "active" : ""}
          >
            1. Sync Mode
          </button>
          <button
            onClick={() => setScenario("concurrent")}
            className={scenario === "concurrent" ? "active" : ""}
          >
            2. Concurrent Mode
          </button>
        </div>
      </header>

      <main>
        {scenario === "sync" ? <SyncRendering /> : <ConcurrentRendering />}
      </main>
    </div>
  );
}
