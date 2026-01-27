import { useState } from 'react';
import { axiosInstance } from './api';
import { authService } from './AuthService';

function App() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setLogs((prev) => [...prev, msg]);

  const runTest = async () => {
    setLogs([]);
    addLog('🚀 Запуск теста...');

    // 1. Сначала "ломаем" токен на сервере
    await authService.resetServerToken();

    // 2. Делаем 3 параллельных запроса
    // ID нужны для отслеживания в логах
    const req1 = axiosInstance.get('/data', { params: { id: 1 } });
    const req2 = axiosInstance.get('/data', { params: { id: 2 } });
    const req3 = axiosInstance.get('/data', { params: { id: 3 } });

    // Обрабатываем результаты
    Promise.allSettled([req1, req2, req3]).then((results) => {
      results.forEach((res, index) => {
        if (res.status === 'fulfilled') {
          addLog(
            `✅ Запрос #${index + 1} выполнен успешно: ${JSON.stringify(
              res.value.data
            )}`
          );
        } else {
          addLog(`❌ Запрос #${index + 1} провалился`);
        }
      });
      addLog('🏁 Тест завершен');
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Axios 401 Queue Demo</h1>
      <button
        onClick={runTest}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Запустить симуляцию (3 запроса)
      </button>

      <div
        style={{
          marginTop: '20px',
          background: '#f0f0f0',
          padding: '10px',
          borderRadius: '5px'
        }}
      >
        <h3>Логи UI:</h3>
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>

      <p>
        💡 <b>Открой консоль браузера (F12)</b>, чтобы увидеть подробные логи
        очереди и интерцепторов.
      </p>
    </div>
  );
}

export default App;
