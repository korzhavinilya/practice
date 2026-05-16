import { useEffect, useState } from "react";

// Имитация API
const fetchData = (type: string): Promise<string> => {
  const delay = type === "slow" ? 3000 : 1000;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Данные для: ${type.toUpperCase()}`);
    }, delay);
  });
};

export default function RaceConditionFlag() {
  const [data, setData] = useState("Ничего не выбрано");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");

  useEffect(() => {
    let isCurrent = true; // Флаг актуальности текущего эффекта

    const startFetch = async () => {
      setLoading(true);
      const result = await fetchData(type);

      // Если за это время случился ререндер с новым type,
      // старый эффект проставит isCurrent = false и этот блок не сработает
      if (isCurrent) {
        setData(result);
        setLoading(false);
      }
    };

    startFetch();

    return () => {
      isCurrent = false; // "Выключаем" старый запрос при смене type или размонтировании
    };
  }, [type]);

  return (
    <div style={{ padding: "20px" }}>
      <h3>Race Condition Flag</h3>
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
