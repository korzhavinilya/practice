import { useState } from "react";

// Имитация API
const fetchData = (type: string): Promise<string> => {
  const delay = type === "slow" ? 3000 : 1000;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Данные для: ${type.toUpperCase()}`);
    }, delay);
  });
};

export default function RaceConditionDemo() {
  const [data, setData] = useState("Ничего не выбрано");
  const [loading, setLoading] = useState(false);

  const handleFetch = async (type: string) => {
    setLoading(true);
    // ВАЖНО: Здесь мы НЕ обрабатываем отмену
    const result = await fetchData(type);
    setData(result);
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Race Condition Demo</h3>
      <button onClick={() => handleFetch("slow")}>
        1. Медленный запрос (3с)
      </button>
      <button onClick={() => handleFetch("fast")}>
        2. Быстрый запрос (1с)
      </button>

      {loading && <p>Загрузка...</p>}
      <div
        style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}
      >
        <strong>Результат в таблице:</strong> {data}
      </div>
    </div>
  );
}
