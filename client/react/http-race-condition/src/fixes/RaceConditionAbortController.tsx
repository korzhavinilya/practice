import { useEffect, useState } from "react";

export default function RaceConditionAbortController() {
  const [data, setData] = useState("Ничего не выбрано");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const startFetch = async () => {
      setLoading(true);
      try {
        // Передаем сигнал в fetch (или axios)
        const response = await fetch(`/api/data?type=${type}`, { signal });
        const result = await response.json();

        setData(result);
        setLoading(false);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Запрос был отменен, так как прилетел новый");
        } else {
          // Обработка реальных ошибок
        }
      }
    };

    startFetch();

    return () => {
      controller.abort(); // Отменяем запрос при смене зависимостей
    };
  }, [type]);

  return (
    <div style={{ padding: "20px" }}>
      <h3>Race Condition AbortController</h3>
      <button onClick={() => setType("slow")}>1. Медленный запрос (3с)</button>
      <button onClick={() => setType("fast")}>2. Быстрый запрос (1с)</button>

      {loading && <p>Загрузка...</p>}
      <div
        style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}
      >
        <strong>Результат в таблице:</strong> {data}
      </div>
    </div>
  );
}
